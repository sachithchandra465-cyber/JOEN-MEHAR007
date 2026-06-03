const axios = require("axios");
const config = require("../config");
const { cmd } = require("../command");

cmd({
  pattern: "animesearch",
  alias: ["animexsearch", "animetex"],
  react: "🔍",
  desc: "Search Anime / Movies by text",
  category: "search",
  use: ".animesearch <search text>",
  filename: __filename
}, async (conn, m, msg, { from, q, reply }) => {
  try {
    if (!q) return reply("❌ Search text do bhai!");

    const apiUrl = `https://arslan-apis.vercel.app/movie/animexinSearch?text=${encodeURIComponent(q)}`;
    const { data } = await axios.get(apiUrl);

    if (!data?.status || !data?.result || data.result.length === 0) {
      return reply("❌ Koi result nahi mila!");
    }

    for (let item of data.result) {
      const caption = `
*JOEN-MEHAR007 WHATSAPP BOT* 🤖

🎬 *Title:* ${item.title}
📺 *Status:* ${item.status || "N/A"}
📝 *Subtitle:* ${item.subtitle || "N/A"}
🎞️ *Type:* ${item.type || "N/A"}
🔗 *Link:* ${item.url}

> *© ᴘᴏᴡᴇʀᴇᴅ ʙʏ JOEN-MEHAR007*
`;

      await conn.sendMessage(from, {
        image: { url: item.image },
        caption
      }, { quoted: m });
    }

    await reply(`✅ Total ${data.result.length} results found!`);

  } catch (err) {
    console.error("ANIMEX SEARCH ERROR:", err);
    reply("❌ Error a gaya bhai, baad mein try karo!");
  }
});
