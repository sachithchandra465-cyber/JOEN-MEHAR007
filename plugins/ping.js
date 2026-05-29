// ================================
// SIMPLE PING
// © 𝙰𝙽𝙰𝚈𝙰𝚃-𝙰𝙸
// ================================

const { cmd } = require('../command');

cmd({
pattern: "ping",
alias: ["pong"],
desc: "Simple Ping",
category: "main"
},
async (conn, mek, m, { from }) => {
    try {
        const start = Date.now();
        await conn.sendMessage(from, { text: "Ping!" }, { quoted: m });
        const end = Date.now();
        
        await conn.sendMessage(from, { 
            text: `> ☞ Pong ${end - start}ms

> © ᴘᴏᴡᴇʀᴇᴅ ʙʏ 𝙰𝙽𝙰𝚈𝙰𝚃-𝙰𝙸`
        }, { quoted: m });
        
    } catch (e) {
        console.log(e);
    }
});
