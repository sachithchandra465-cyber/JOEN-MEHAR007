const { cmd } = require('../command');
const axios = require('axios');

cmd({
    pattern: "pair",
    alias: ["getpair", "clonebot"],
    react: "✅",
    desc: "Get pairing code for JOEN-MEHAR007 bot",
    category: "download",
    use: ".pair 923452401XXX",
    filename: __filename
}, async (conn, mek, m, { q, senderNumber, reply }) => {
    try {

        const phoneNumber = q 
            ? q.replace(/[^0-9]/g, '') 
            : senderNumber.replace(/[^0-9]/g, '');

        if (!phoneNumber || phoneNumber.length < 11 || phoneNumber.length > 15) {
            return reply("❌ Provide valid number without +\nExample: .pair 923452401234");
        }

        await reply("⏳ Generating pairing code...");

        const response = await axios.get(
            `https://paire-17084b96a55d.herokuapp.com/pair?number=${phoneNumber}`,
            { timeout: 20000 }
        );

        if (!response.data || !response.data.code) {
            return reply("PAIRING NUMBER 💗.");
        }

        const pairingCode = response.data.code;

        await reply(
`╭━━〔 *JOEN-MEHAR007 PAIRING* 〕━━⬣
┃
┃ 🔢 *Number:* ${phoneNumber}
┃ 🔐 *Code:* ${pairingCode}
┃
╰━━━━━━━━━━━━━━━━━━⬣
©𝙿𝙾𝚆𝙴𝚁𝙴𝙳 ᴮʸ JOEN-MEHAR007 `
        );

    } catch (error) {
        console.log(error?.response?.data || error.message);
        reply("❌ Server error or API down. Try again later.");
    }
});
