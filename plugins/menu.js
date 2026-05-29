const config = require('../config')
const { cmd } = require('../command');
const os = require("os")
const { runtime } = require('../lib/functions')

const MENU_IMAGE_URL = 'https://files.catbox.moe/hhk8i3.jpg';

cmd({
    pattern: "menu",
    alias: ["allmenu","fullmenu"],
    use: '.menu',
    desc: "Show all bot commands",
    category: "menu",
    react: "🇵🇰",
    filename: __filename
}, 
async (conn, mek, m, { from, reply }) => {
    try {
        const verifiedContext = {
            key: {
                participant: `0@s.whatsapp.net`,
                fromMe: false,
                remoteJid: "status@broadcast"
            },
            message: {
                extendedTextMessage: {
                    text: "ᴀɴᴀʏᴀᴛ ʜᴀᴄᴋᴇʀ",
                    contextInfo: {
                        mentionedJid: [],
                        verifiedBizName: "ᴀɴᴀʏᴀᴛ ʜᴀᴄᴋᴇʀ"
                    }
                }
            }
        };

        let dec = `
╔═══❖・【 ᴀɴᴀʏᴀᴛ-𝙰𝙸 𝙼𝙴𝙽𝚄 】・❖═══╗
║
║  ✦ *Bot Name:* ${config.BOT_NAME}
║  ✦ *Version:* 5..
║  ✦ *Uptime:* ${runtime(process.uptime())}
║  ✦ *Owner:* ᴀɴᴀʏᴀᴛ ʜᴀᴄᴋᴇʀ 🫶🏻
║  ✦ *Platform:* ${os.platform()}
║  ✦ *Mode:* ${config.MODE}
║  ✦ *Prefix:* [ ${config.PREFIX} ]
║
╠══❖・【 📋 ALL COMMANDS 】・❖══╣
║
║  • .fancy
║  • .define
║  • .news
║  • .githubstalk
║  • .wikipedia
║  • .save
║  • .coinflip
║  • .roll
║  • .rcolor
║  • .pair
║  • .movie
║  • .logo
║  • .google
║  • .ytsearch
║  • .img
║  • .pinterest
║  • .weather
║  • .time
║  • .fact
║  • .quote
║  • .joke
║  • .meme
║
╠══❖・【 🔄 CONVERTER 】・❖══╣
║
║  • .sticker
║  • .take
║  • .emojimix
║  • .tts
║  • .tomp3
║  • .trt
║  • .base64
║  • .unbase64
║  • .dbinary
║  • .tinyurl
║  • .url
║  • .urlencode
║  • .urldecode
║  • .readmore
║  • .repeat
║  • .ask
║  • .qr
║  • .qrread
║  • .barcode
║  • .color
║
╠══❖・【 🎌 ANIME ZONE 】・❖══╣
║
║  • .foxgirl
║  • .animenews
║  • .naruto
║  • .dare
║  • .truth
║  • .awoo
║  • .dog
║  • .neko
║  • .waifu
║  • .loli
║  • .maid
║  • .megnumin
║  • .animegirl
║  • .animegirl1
║  • .anime2
║  • .anime3
║  • .rem
║  • .ram
║  • .emilia
║  • .aot
║  • .eren
║  • .levi
║  • .mikasa
║  • .onepiece
║  • .luffy
║  • .zoro
║  • .sanji
║  • .dragonball
║  • .goku
║  • .vegeta
║  • .jjk
║  • .gojo
║  • .sukuna
║  • .demon
║  • .tanjiro
║  • .nezuko
║  • .zenitsu
║  • .hug
║  • .kiss
║  • .slap
║  • .pat
║  • .cuddle
║  • .poke
║  • .wave
║  • .wink
║
╠══❖・【 🤖 AI & CHAT 】・❖══╣
║
║  • .ai
║  • .gpt
║  • .gpt2
║  • .gpt3
║  • .gpt4
║  • .copilot
║  • .blackbox
║  • .luma
║  • .imagine
║  • .imagine2
║  • .gemini
║  • .bard
║  • .bing
║  • .claude
║
╠══❖・【 🎵 DOWNLOADER 】・❖══╣
║
║  • .yt
║  • .play
║  • .song
║  • .video
║  • .ytmp3
║  • .ytmp4
║  • .tiktok
║  • .instagram
║  • .facebook
║  • .twitter
║  • .spotify
║  • .soundcloud
║
╠══❖・【 🖼️ IMAGE EDITING 】・❖══╣
║
║  • .logo
║  • .logomaker
║  • .blur
║  • .circle
║  • .flip
║  • .grayscale
║  • .invert
║  • .pixelate
║  • .removebg
║  • .wanted
║  • .trash
║  • .rip
║  • .jail
║  • .affect
║
╠══❖・【 🔐 ADMIN TOOLS 】・❖══╣
║
║  • .group
║  • .grouplink
║  • .revoke
║  • .add
║  • .kick
║  • .promote
║  • .demote
║  • .mute
║  • .unmute
║  • .lock
║  • .unlock
║  • .hidetag
║  • .tagall
║  • .everyone
║  • .antilink
║  • .warn
║  • .warnings
║
╠══❖・【 💎 OWNER ONLY 】・❖══╣
║
║  • .update
║  • .restart
║  • .shutdown
║  • .eval
║  • .exec
║  • .setprefix
║  • .setmode
║  • .broadcast
║  • .join
║  • .leave
║  • .plugin
║  • .install
║
╠══❖・【 🌐 EXTRA FEATURES 】・❖══╣
║
║  • .calc
║  • .math
║  • .solve
║  • .ip
║  • .whois
║  • .password
║  • .passgen
║  • .uid
║  • .note
║  • .afk
║  • .currency
║  • .exchange
║
╚══❖・© ᴾᴼᵂᴱᴿᴱᴰ ᴮʸ ᴀɴᴀʏᴀᴛ-𝙰𝙸・❖
        `;

        await conn.sendMessage(
            from,
            {
                image: { url: MENU_IMAGE_URL }, 
                caption: dec,
                contextInfo: {
                    mentionedJid: [m.sender],
                    forwardingScore: 999,
                    isForwarded: true,
                    forwardedNewsletterMessageInfo: {
                        newsletterJid: '120363420933039839@newsletter',
                        newsletterName: 'ᴀɴᴀʏᴀᴛ-𝙰𝙸',
                        serverMessageId: 143
                    },
                    externalAdReply: {
                        title: "ᴀɴᴀʏᴀᴛ-𝙰𝙸 𝚅𝙴𝚁𝙸𝙵𝙸𝙴𝙳",
                        body: "WhatsApp Verified Business",
                        mediaType: 1,
                        thumbnailUrl: MENU_IMAGE_URL,
                        sourceUrl: "https://whatsapp.com/channel/0029VbAm8LqL2ATpxklIct2g",
                        showAdAttribution: true
                    }
                }
            },
            { quoted: verifiedContext }
        );

    } catch (e) {
        console.log(e);
        
        reply(
`┌─⭓ *❌ 𝙴𝚁𝚁𝙾𝚁 ❌* ⭓
│
│⭔ *𝚂𝚃𝙰𝚃𝚄𝚂:* Menu Failed
│⭔ *𝚁𝙴𝙰𝚂𝙾𝙽:* ${e.message}
│⭔ *𝚂𝙾𝙻𝚄𝚃𝙸𝙾𝙽:* Try again later
│
└⭓ ©𝙿𝙾𝚆𝙴𝚁𝙴𝙳 ᴮʸ ᴀɴᴀʏᴀᴛ-𝙰𝙸`);
    }
});
