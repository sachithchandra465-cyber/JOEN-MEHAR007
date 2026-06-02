const { cmd } = require('../command')
const axios = require('axios')
const yts = require('yt-search')
const fs = require('fs')
const path = require('path')
const ffmpeg = require('fluent-ffmpeg')
const ffmpegPath = require('@ffmpeg-installer/ffmpeg').path

ffmpeg.setFfmpegPath(ffmpegPath)

cmd({
    pattern: "song2",
    alias: ["play2"],
    desc: "JOEN-MEHAR007 Ultra Song Downloader",
    category: "download",
    react: "🎧",
    filename: __filename
}, async (conn, mek, m, { from, reply, text }) => {

    try {

        if (!text) {
            return reply("❌ Song name likho\nExample: .song2 believer")
        }

        // 🔍 Search YouTube
        const search = await yts(text)
        if (!search.videos.length) return reply("❌ Song nahi mila")

        const vid = search.videos[0]

        // 👑 INFO BOX
        const caption = `
╔═══〔 🎧 JOEN-MEHAR007 MUSIC ENGINE 〕═══╗

🎵 Title : ${vid.title}
👤 Channel : ${vid.author.name}
⏱ Duration : ${vid.timestamp}
👀 Views : ${vid.views.toLocaleString()}

⚙ Status : Preparing Download...

╚════════════════════════════╝

> *ᴘᴏᴡᴇʀᴇᴅ ʙʏ JOEN-MEHAR007 🤍*
`

        await conn.sendMessage(from, {
            image: { url: vid.thumbnail },
            caption
        }, { quoted: mek })

        // 🚀 Progress Message
        let progress = await conn.sendMessage(from, {
            text: "⬇ Downloading Video..."
        }, { quoted: mek })

        // 📡 API CALL
        const api = `https://arslan-apis.vercel.app/download/ytmp4?url=${encodeURIComponent(vid.url)}`
        const res = await axios.get(api, { timeout: 60000 })

        if (!res.data?.status) return reply("❌ Download API error")

        const videoUrl = res.data.result.download.url

        // 📂 Temp Folder
        const tempDir = path.join(__dirname, '../temp')
        if (!fs.existsSync(tempDir)) fs.mkdirSync(tempDir)

        const videoPath = path.join(tempDir, `song_${Date.now()}.mp4`)
        const audioPath = path.join(tempDir, `song_${Date.now()}.mp3`)

        // ⬇ Download Video Stream
        const stream = await axios({
            url: videoUrl,
            method: "GET",
            responseType: "stream"
        })

        await new Promise((resolve, reject) => {
            const writer = fs.createWriteStream(videoPath)
            stream.data.pipe(writer)
            writer.on('finish', resolve)
            writer.on('error', reject)
        })

        // 🔄 Update Progress
        await conn.sendMessage(from, {
            text: "🎧 Converting To MP3..."
        }, { quoted: progress })

        // 🎧 Convert To MP3
        await new Promise((resolve, reject) => {
            ffmpeg(videoPath)
                .noVideo()
                .audioCodec('libmp3lame')
                .audioBitrate('128k')
                .format('mp3')
                .on('end', resolve)
                .on('error', reject)
                .save(audioPath)
        })

        // 📤 Send Audio
        await conn.sendMessage(from, {
            audio: fs.readFileSync(audioPath),
            mimetype: "audio/mpeg",
            fileName: `${vid.title}.mp3`
        }, { quoted: mek })

        // 🧹 Cleanup
        fs.unlinkSync(videoPath)
        fs.unlinkSync(audioPath)

    } catch (err) {

        console.log("SONG2 ULTRA ERROR:", err)
        reply("❌ Song download error, later try karo")

    }

})
