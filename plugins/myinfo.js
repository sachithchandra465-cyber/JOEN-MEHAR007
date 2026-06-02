const { cmd } = require("../command");
const os = require("os");

cmd({
    pattern: "myinfo",
    alias: ["ana"],
    desc: "JOEN-MEHAR007 Ultra Pro Max Intro",
    category: "info",
    react: "🇵🇰",
    filename: __filename
}, async (conn, mek, m, { from }) => {
    try {

        // ✅ Channel JID
        const channelJid = "120363404616984159@newsletter";

        // ✅ Greeting
        const now = new Date();
        let greet = "🌙 Good Night";
        const hour = now.getHours();
        if (hour < 12) greet = "🌅 Good Morning";
        else if (hour < 17) greet = "☀️ Good Afternoon";
        else if (hour < 20) greet = "🌆 Good Evening";

        const text = `
╔═══〔 🇵🇰 JOEN-MEHAR007 𝚄𝙻𝚃𝚁𝙰 𝙿𝚁𝙾 𝙼𝙰𝚇 🇵🇰 〕═══╗

${greet} @${m.sender.split("@")[0]}

╭───〔 👤 OWNER PROFILE 〕───╮
│ 🧑 Name      : MEHAR ZAI
│ 🏷 Nick      : 𝙰𝙽𝙰
│ 🎂 Age       : 18+
│ 🧬 Tribe     : KPK
│ 🌍 Country   : 𝙿𝙰𝙺𝙸𝚂𝚃𝙰𝙽
│ 🏙 City      : BANNU
╰────────────────────────╯

╭───〔 🤖 BOT INFORMATION 〕───╮
│ 🧠 Bot Name  : JOEN-MEHAR007
│ 👑 Owner     : MEHAR ZAI
│ 📞 Owner No  : +923303030400
│ 🔣 Prefix    : .
│ ⚙️ Mode      : 𝙿𝚄𝙱𝙻𝙸𝙲
│ 🔌 Version   : 𝙼𝚄𝙻𝚃𝙸 𝙳𝙴𝚅𝙸𝙲𝙴 
╰────────────────────────╯

╚════════════════════════════╝

> *© ᴘᴏᴡᴇʀᴇᴅ ʙʏ JOEN-MEHAR007*
`;

        await conn.sendMessage(from, {
            text,
            contextInfo: {
                mentionedJid: [m.sender, channelJid], // ✅ User + Channel mention
                forwardingScore: 999,
                isForwarded: true
            }
        }, { quoted: mek });

    } catch (e) {
        console.log(e);
    }
});
