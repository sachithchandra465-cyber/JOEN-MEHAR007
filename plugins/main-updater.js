const { cmd } = require("../command");
const { sleep } = require("../lib/functions");

cmd({
    pattern: "update",
    alias: ["upgrade", "sync"],
    desc: "Update and restart the bot system",
    category: "owner",
    react: "馃殌",
    filename: __filename
},
async (conn, mek, m, { from, reply, isCreator }) => {
    try {
        if (!isCreator) {
            return reply("> *馃摏 饾櫨饾櫧饾櫥饾殘 饾殐饾櫡饾櫞 饾櫛饾櫨饾殐 饾櫨饾殕饾櫧饾櫞饾殎 饾櫜饾櫚饾櫧 饾殑饾殏饾櫞 饾殐饾櫡饾櫢饾殏 饾櫜饾櫨饾櫦饾櫦饾櫚饾櫧饾櫝?*");
        }

        // Initial message
        const updateMsg = await conn.sendMessage(from, {
            text: '喂畏喂褌喂伪褌喂畏g s爷s褌蔚屑 蠀蟻鈭偽毖傦拷?...馃殌'
        }, { quoted: mek });

        // Update steps with emojis
        const updateSteps = [
            "*馃攳 c薪褦c泻喂畏g s爷s褌褦屑 s褌伪褌蠀s...*",
            "*馃洜锟�? 蟻褟褦蟻伪蕗喂畏g 蠀蟻鈭偽毖傦拷? c蟽屑蟻蟽畏褦畏褌s...*",
            "*馃摝 覔喂畏伪鈩撐箊喂畏g 蟻伪c泻伪g褦s...*",
            "*锟�? 蟽蟻褌喂屑喂z喂畏g 蟻褦蕗覔蟽蕗屑伪畏c蔚...*",
            "*馃攦 饾櫚饾櫧饾櫚饾殘饾櫚饾殐-饾櫚饾櫢 蕗褦褧蟿伪蟿...*",
            "*鈾伙笍 蕗褦褧蟿伪蟿喂畏g s蔚蕗v喂c蔚s...*"
        ];

        // Show each step with delay
        for (const step of updateSteps) {
            await sleep(1500);
            await conn.relayMessage(
                from,
                {
                    protocolMessage: {
                        key: updateMsg.key,
                        type: 14,
                        editedMessage: {
                            conversation: step,
                        },
                    },
                },
                {}
            );
        }

        // Final message before restart
        await conn.sendMessage(from, {
            text: '- *鉁� JOEN-MEHAR007 蠀蟻鈭偽毖傦拷? c蟽屑蟻鈩撗斞傃斺垈 蕗褦褧蟿伪蟿喂畏g*'
        }, { quoted: mek });

        // Execute restart after a short delay
        await sleep(1000);
        require('child_process').exec("pm2 restart all");

    } catch (e) {
        console.error(e);
        await conn.sendMessage(from, {
            text: `*锟�? Update Failed!*\n_Error:_ ${e.message}\n\n*Try manually:*\n\`\`\`pm2 restart all\`\`\``
        }, { quoted: mek });
    }
});
