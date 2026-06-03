const axios = require("axios");
const { cmd } = require("../command");

// FAIZAN-MD styled titles
const fbTitles = [
  "┌─⭓ *JOEN-MEHAR007* ⭓\n│\n│ 📥 *Facebook Video Download*\n│ ✅ *Download Successful*\n└─────────────\n\n> *© ᴘᴏᴡᴇʀᴇᴅ ʙʏ JOEN-MEHAR007*",
  "┌─⭓ *JOEN-MEHAR007* ⭓\n│\n│ 📥 *Facebook Video Download*\n│ 🎬 *HD Video Ready*\n└─────────────\n\n> *© ᴘᴏᴡᴇʀᴇᴅ ʙʏ JOEN-MEHAR007*",
  "┌─⭓ *JOEN-MEHAR007* ⭓\n│\n│ 📥 *Facebook Video Download*\n│ ⚡ *Fast Download*\n└─────────────\n\n> *© ᴘᴏᴡᴇʀᴇᴅ ʙʏ JOEN-MEHAR007*",
  "┌─⭓ *JOEN-MEHAR007* ⭓\n│\n│ 📥 *Facebook Video Download*\n│ 🚀 *Completed*\n└─────────────\n\n> *© ᴘᴏᴡᴇʀᴇᴅ ʙʏ JOEN-MEHAR007*"
];

let fbTitleIndex = 0;

cmd({
  pattern: "fb",
  alias: ["facebook", "fbvideo"],
  react: "📥",
  desc: "Download Facebook videos",
  category: "download",
  use: ".fb <facebook url>",
  filename: __filename
}, async (conn, mek, m, { from, reply, args }) => {
  try {
    const fbUrl = args[0];

    if (!fbUrl || !fbUrl.includes("facebook.com")) {
      return reply(
        "┌─⭓ *JOEN-MEHAR007* ⭓\n│\n│ ❌ *Invalid Facebook URL*\n│ Example:\n│ .fb https://facebook.com/...\n└─────────────"
      );
    }

    await conn.sendMessage(from, { react: { text: "⏳", key: m.key } });

    await conn.sendMessage(from, {
      text:
        "┌─⭓ *JOEN-MEHAR007* ⭓\n│\n│ 🔍 *Processing Link...*\n│ 📥 *Fetching Video*\n└─────────────"
    }, { quoted: mek });

    const apiUrl = `https://edith-apis.vercel.app/download/facebook?url=${encodeURIComponent(fbUrl)}`;
    const { data } = await axios.get(apiUrl, { timeout: 20000 });

    if (!data || data.status !== true) {
      return reply(
        "┌─⭓ *JOEN-MEHAR007* ⭓\n│\n│ ❌ *Download Failed*\n│ Facebook may be blocking this video\n└─────────────"
      );
    }

    const media = data?.result?.media || {};
    const videoUrl =
      media.video_hd ||
      media.video_sd ||
      media.video ||
      null;

    if (!videoUrl) {
      return reply(
        "┌─⭓ *JOEN-MEHAR007* ⭓\n│\n│ ⚠️ *Video URL not found*\n│ Reel may be private or restricted\n└─────────────"
      );
    }

    const caption = fbTitles[fbTitleIndex];
    fbTitleIndex = (fbTitleIndex + 1) % fbTitles.length;

    await conn.sendMessage(from, {
      video: { url: videoUrl },
      caption
    }, { quoted: mek });

    await conn.sendMessage(from, { react: { text: "✅", key: m.key } });

  } catch (err) {
    console.error("JOEN-MEHAR007 FB ERROR:", err);
    reply(
      "┌─⭓ *JOEN-MEHAR007* ⭓\n│\n│ ❌ *Facebook Download Failed*\n│ Try another video\n└─────────────"
    );
  }
});
