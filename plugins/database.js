const axios = require("axios");
const { cmd } = require("../command");

cmd({
  pattern: "database",
  desc: "Check database info by number",
  category: "data",
  use: ".dbcheck <number>",
  react: "🔍",
  filename: __filename
}, async (conn, mek, m, { args, reply }) => {
  try {
    if (!args[0]) {
      return reply("❌ Number likho\nExample: .dbcheck 3338570120");
    }

    const number = args[0];
    const url = `https://arslan-apis.vercel.app/more/database?number=${number}`;
    const { data } = await axios.get(url);

    if (!data?.status || !data?.result || data.result.length === 0) {
      return reply("❌ Koi record nahi mila");
    }

    const user = data.result[0];

    // CNIC masked for safety
    const maskedCnic = user.cnic
      ? user.cnic.replace(/^(\d{5})\d+(\d{2})$/, "$1******$2")
      : "N/A";

    const text = `
🔎 *DATABASE RESULT*

👤 *Name:* ${user.full_name || "N/A"}
📞 *Phone:* ${user.phone || "N/A"}
🆔 *CNIC:* ${maskedCnic}
📍 *Address:* ${user.address || "N/A"}

> *© ᴘᴏᴡᴇʀᴇᴅ ʙʏ JOEN-MEHAR007*
`;

    reply(text.trim());

  } catch (e) {
    reply("❌ Error a gaya, baad mein try karo");
  }
});
