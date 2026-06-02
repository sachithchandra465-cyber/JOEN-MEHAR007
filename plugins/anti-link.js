const { cmd } = require('../command');

let antiLinkStatus = {};
global.warnings = global.warnings || {};


// 🔥 ON / OFF COMMAND
cmd({
  pattern: "antilink",
  category: "group"
}, async (conn, m, store, { from, isGroup, isAdmins, args, reply }) => {

  if (!isGroup) return reply("❌ Group only command");
  if (!isAdmins) return reply("❌ Only group admins can enable it");

  if (args[0] === "on") {
    antiLinkStatus[from] = true;
    return reply("✅ AntiLink Enabled (DEBUG MODE)");
  }

  if (args[0] === "off") {
    antiLinkStatus[from] = false;
    return reply("❌ AntiLink Disabled");
  }

  reply("Use:\n.antilink on\n.antilink off");
});



// 🔥 MESSAGE LISTENER (DEBUG POWER)
cmd({
  on: "body"
}, async (conn, m, store, { from, body, sender, isGroup }) => {

  if (!isGroup) return;
  if (!antiLinkStatus[from]) return;

  console.log("🚀 AntiLink Triggered");
  console.log("Message:", body);
  console.log("Sender:", sender);

  const linkRegex = /(https?:\/\/[^\s]+)/gi;
  if (!linkRegex.test(body)) return;

  try {

    // ✅ CHECK BOT ADMIN
    const meta = await conn.groupMetadata(from);
    const botId = conn.user.id.split(":")[0] + "@s.whatsapp.net";
    const bot = meta.participants.find(p => p.id === botId);

    console.log("🤖 Bot Data:", bot);

    if (!bot || bot.admin !== "admin") {
      console.log("❌ Bot is NOT admin");
      return;
    }

    console.log("✅ Bot is Admin");

    // 🔥 DELETE MESSAGE
    await conn.sendMessage(from, { delete: m.key });
    console.log("🗑 Message Deleted");

    // 🔥 REMOVE USER
    await conn.groupParticipantsUpdate(from, [sender], "remove");
    console.log("🚫 User Removed");

    await conn.sendMessage(from, {
      text: `🚫 @${sender.split('@')[0]} Removed (Link Detected)`,
      mentions: [sender]
    });

  } catch (err) {
    console.log("🔥 AntiLink ERROR:", err);
  }

});
