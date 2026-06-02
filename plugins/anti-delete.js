const { cmd } = require('../command');
const { getAnti, setAnti } = require('../data/antidel');

cmd({
    pattern: "antidelete",
    alias: ['antidel', 'del'],
    desc: "Toggle anti-delete feature",
    category: "misc",
    filename: __filename
},
async (conn, mek, m, { from, reply, text, isCreator }) => {

    // ✅ Owner check
    if (!isCreator) return reply('❌ This command is only for the bot owner');

    try {
        // 🔹 Get current anti-delete status
        const currentStatus = await getAnti(from);

        // 🔹 If no argument or 'status', show current status
        if (!text || text.toLowerCase() === 'status') {
            return reply(`⚡ *AntiDelete Status:* ${currentStatus ? '✅ ON' : '❌ OFF'}\n\nUsage:\n• .antidelete on - Enable\n• .antidelete off - Disable`);
        }

        const action = text.toLowerCase().trim();

        // 🔹 Enable Anti-delete
        if (action === 'on') {
            await setAnti(from, true);
            return reply('✅ Anti-delete has been enabled for this chat');
        } 
        // 🔹 Disable Anti-delete
        else if (action === 'off') {
            await setAnti(from, false);
            return reply('❌ Anti-delete has been disabled for this chat');
        } 
        // 🔹 Invalid input
        else {
            return reply('❌ Invalid command.\nUsage:\n• .antidelete on\n• .antidelete off\n• .antidelete status');
        }

    } catch (e) {
        console.error("Error in antidelete command:", e);
        return reply("⚠️ An error occurred while processing your request.");
    }

});
