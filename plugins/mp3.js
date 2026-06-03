const { cmd } = require("../command");
const config = require('../config');
const axios = require('axios');
const yts = require('yt-search');

// ============ FAIZAN-MD STYLE ============
function faizanStyle(title, value, status, quality = "", duration = "") {
    return `
*╭ׂ┄─̇─̣┄─̇─̣┄─̇─̣┄─̇─̣┄─̇─̣─̇─̣─᛭*
*│ ╌─̇─̣⊰ ${config.BOT_NAME || '𝐅𝐀𝐈𝐙𝐀𝐍-𝐌𝐃'} ⊱┈─̇─̣╌*
*│─̇─̣┄┄┄┄┄┄┄┄┄┄┄┄┄─̇─̣*
*│❀ 🎵 ${title}:* ${value}
*│❀ 🎚️ 𝐐𝐮𝐚𝐥𝐢𝐭𝐲:* ${quality}
*│❀ ⏱️ 𝐃𝐮𝐫𝐚𝐭𝐢𝐨𝐧:* ${duration}
*│❀ ⚙️ 𝐒𝐭𝐚𝐭𝐮𝐬:* ${status}
*╰┄─̣┄─̇─̣┄─̇─̣┄─̇─̣┄─̇─̣─̇─̣─᛭*

> *𝐃σωɴℓσα∂є∂ 𝐒ᴜᴄᴄєѕѕfυℓℓу⎯꯭̽* ✅
`;
}

// ============ FAIZAN API ============
const FAIZAN_API = "https://faizan-api.vercel.app/api/ytdl";

async function downloadWithFaizan(url, type = 'audio') {
    try {
        const response = await axios.get(FAIZAN_API, {
            params: { url: url },
            timeout: 60000,
            headers: { 'User-Agent': 'Mozilla/5.0' }
        });

        if (response.data?.status === true && response.data?.result) {
            const result = response.data.result;
            // API gives dl_link for audio, video link might be separate
            const audioUrl = result.dl_link || result.audio?.url || result.url;
            const videoUrl = result.video?.url || result.url;
            
            return {
                success: true,
                audioUrl: audioUrl,
                videoUrl: videoUrl,
                title: result.title || 'Media',
                quality: '320kbps',
                duration: result.duration || 'Unknown',
                thumbnail: result.thumbnail
            };
        }
        return { success: false, error: 'Invalid API response' };
    } catch (err) {
        console.error('Faizan API Error:', err.message);
        return { success: false, error: err.message };
    }
}

// ============ SEARCH VIDEO ============
async function searchVideo(query) {
    const search = await yts(query);
    if (!search.videos || search.videos.length === 0) throw new Error("No results found");
    return search.videos[0];
}

// ============ MAIN COMMAND (AUDIO) ============
cmd({
    pattern: "song",
    alias: ["play", "music", "audio", "yta", "mp3"],
    desc: "Download audio from YouTube by name or link (Faizan API)",
    category: "download",
    react: "🎵",
    filename: __filename
}, async (conn, mek, m, { from, args, reply }) => {
    try {
        if (!args.length) {
            return reply(`*╭ׂ┄─̇─̣┄─̇─̣┄─̇─̣┄─̇─̣┄─̇─̣─̇─̣─᛭*
*│ ╌─̇─̣⊰ 🎵 𝐅𝐀𝐈𝐙𝐀𝐍 𝐒𝐎𝐍𝐆 𝐃𝐎𝐖𝐍𝐋𝐎𝐀𝐃𝐄𝐑 🎵 ⊱┈─̇─̣╌*
*│─̇─̣┄┄┄┄┄┄┄┄┄┄┄┄┄─̇─̣*
*│❀ 📝 *Usage:* .song <name or link>
*│❀ 🎤 *Example:* .song Imagine Dragons Believer
*│❀ 🔗 *Example:* .song https://youtu.be/xxxxx
*╰┄─̣┄─̇─̣┄─̇─̣┄─̇─̣┄─̇─̣─̇─̣─᛭*

> *𝐏𝐫𝐨𝐯𝐢𝐝𝐞 𝐬𝐨𝐧𝐠 𝐧𝐚𝐦𝐞 𝐨𝐫 𝐥𝐢𝐧𝐤⎯꯭̽* 🎵`);
        }

        const query = args.join(" ");
        await conn.sendMessage(from, { react: { text: "⏳", key: mek.key } });

        // Get video URL and info
        let videoUrl, videoTitle, videoThumb, videoDuration;
        
        if (query.includes('youtube.com') || query.includes('youtu.be')) {
            videoUrl = query;
            const videoId = videoUrl.match(/(?:youtu\.be\/|v=)([a-zA-Z0-9_-]{11})/)?.[1];
            if (videoId) {
                const search = await yts({ videoId });
                if (search) {
                    videoTitle = search.title;
                    videoThumb = search.thumbnail;
                    videoDuration = search.timestamp;
                }
            }
        } else {
            const searchResult = await searchVideo(query);
            videoUrl = searchResult.url;
            videoTitle = searchResult.title;
            videoThumb = searchResult.thumbnail;
            videoDuration = searchResult.timestamp;
        }

        if (!videoTitle) videoTitle = "Audio";

        // Send thumbnail
        if (videoThumb) {
            await conn.sendMessage(from, {
                image: { url: videoThumb },
                caption: faizanStyle('PROCESSING', videoTitle.substring(0, 60), '⏳ Fetching audio...', '320kbps', videoDuration || 'Unknown')
            }, { quoted: mek });
        }

        // Download audio
        const result = await downloadWithFaizan(videoUrl, 'audio');
        
        if (!result.success || !result.audioUrl) {
            throw new Error(result.error || "Download failed");
        }

        const finalTitle = result.title || videoTitle;

        await conn.sendMessage(from, {
            audio: { url: result.audioUrl },
            mimetype: 'audio/mpeg',
            fileName: `${finalTitle.replace(/[^\w\s-]/g, '').substring(0, 50)}.mp3`,
            caption: faizanStyle('SONG', finalTitle.substring(0, 100), '✅', result.quality, videoDuration || 'Unknown')
        }, { quoted: mek });

        await conn.sendMessage(from, { react: { text: "✅", key: mek.key } });

    } catch (err) {
        console.error('Song Error:', err.message);
        reply(faizanStyle('ERROR', err.message || 'Download failed. Try again later.', '❌', '—', '—'));
        await conn.sendMessage(from, { react: { text: "❌", key: mek.key } });
    }
});

// ============ VIDEO COMMAND ============
cmd({
    pattern: "ytvideo",
    alias: ["yt", "ytmp4", "video"],
    desc: "Download YouTube video by name or link (Faizan API)",
    category: "download",
    react: "🎬",
    filename: __filename
}, async (conn, mek, m, { from, args, reply }) => {
    try {
        if (!args.length) {
            return reply(`*╭ׂ┄─̇─̣┄─̇─̣┄─̇─̣┄─̇─̣┄─̇─̣─̇─̣─᛭*
*│ ╌─̇─̣⊰ 🎬 𝐅𝐀𝐈𝐙𝐀𝐍 𝐕𝐈𝐃𝐄𝐎 𝐃𝐎𝐖𝐍𝐋𝐎𝐀𝐃𝐄𝐑 🎬 ⊱┈─̇─̣╌*
*│─̇─̣┄┄┄┄┄┄┄┄┄┄┄┄┄─̇─̣*
*│❀ 📝 *Usage:* .ytvideo <name or link>
*│❀ 🎤 *Example:* .ytvideo Imagine Dragons Believer
*│❀ 🔗 *Example:* .ytvideo https://youtu.be/xxxxx
*╰┄─̣┄─̇─̣┄─̇─̣┄─̇─̣┄─̇─̣─̇─̣─᛭*

> *𝐏𝐫𝐨𝐯𝐢𝐝𝐞 𝐯𝐢𝐝𝐞𝐨 𝐧𝐚𝐦𝐞 𝐨𝐫 𝐥𝐢𝐧𝐤⎯꯭̽* 🎬`);
        }

        const query = args.join(" ");
        await conn.sendMessage(from, { react: { text: "⏳", key: mek.key } });

        let videoUrl, videoTitle, videoThumb, videoDuration;
        
        if (query.includes('youtube.com') || query.includes('youtu.be')) {
            videoUrl = query;
            const videoId = videoUrl.match(/(?:youtu\.be\/|v=)([a-zA-Z0-9_-]{11})/)?.[1];
            if (videoId) {
                const search = await yts({ videoId });
                if (search) {
                    videoTitle = search.title;
                    videoThumb = search.thumbnail;
                    videoDuration = search.timestamp;
                }
            }
        } else {
            const searchResult = await searchVideo(query);
            videoUrl = searchResult.url;
            videoTitle = searchResult.title;
            videoThumb = searchResult.thumbnail;
            videoDuration = searchResult.timestamp;
        }

        if (!videoTitle) videoTitle = "Video";

        if (videoThumb) {
            await conn.sendMessage(from, {
                image: { url: videoThumb },
                caption: faizanStyle('PROCESSING', videoTitle.substring(0, 60), '⏳ Fetching video...', '720p', videoDuration || 'Unknown')
            }, { quoted: mek });
        }

        const result = await downloadWithFaizan(videoUrl, 'video');
        
        if (!result.success || !result.videoUrl) {
            throw new Error(result.error || "Download failed");
        }

        const finalTitle = result.title || videoTitle;

        await conn.sendMessage(from, {
            video: { url: result.videoUrl },
            mimetype: 'video/mp4',
            caption: faizanStyle('VIDEO', finalTitle.substring(0, 100), '✅', '720p', videoDuration || 'Unknown')
        }, { quoted: mek });

        await conn.sendMessage(from, { react: { text: "✅", key: mek.key } });

    } catch (err) {
        console.error('Video Error:', err.message);
        reply(faizanStyle('ERROR', err.message || 'Download failed', '❌', '—', '—'));
        await conn.sendMessage(from, { react: { text: "❌", key: mek.key } });
    }
});
