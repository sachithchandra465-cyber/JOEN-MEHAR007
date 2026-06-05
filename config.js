const fs = require('fs');
if (fs.existsSync('config.env')) require('dotenv').config({ path: './config.env' });

function convertToBool(text, fault = 'true') {
    return text === fault ? true : false;
}
module.exports = {
SESSION_ID: process.env.SESSION_ID || "FAIZAN-MD~eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiSUpkdTJ4R2ZlVnhkMFI3L0t2ZCtKRWcwNWJRM3F4OEN0R1hZNVBWcStWVT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiRTdFSmNFTUNRT05weHJHZFk0WTZzQVZBYlBEOWVzb0U1MzF1L2xYcGVqYz0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJPRGc0NnFCS3E4UEsvb0gvcWhSVVYwUWJoR0tIQnJjNEI1a3VqakVEbFZZPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiI1bXZFeXVtUDJLWUpMdUpOY01XNjhsTTBlSGw4eDJVelROYllUTGw5bmlvPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IndIZG5iakNhbktIbUptUDROb3F0S1FFVklEMkdQZEtRZ2RDalFZZ2hxMVk9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IlNleGZTWitudWlnQ0xjWFZxcFpiMG5jc0hTZXhabVE0TktLOGhmY3Zqd0k9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiY0ZnS3hpejdTMVhFOW84RTVYekdLKzhtOHZUalZjNW1pRkJnVGYzb21YMD0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiczJ1aFlPbncxUnVpemdtOVo2MklUL1BnSDE5Tmw3SDNXTEtMektMMVpHST0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Im1PV0V0cUhjRmpsM0IyOTJMU2ZzRys1akZLTVNtZTlnc3hxMmZ5d1c2OUFveGRsRjRKSDkwSmJaQ0tlMk1PcFR4aTdxbDIyWmxRdXJQeDB2aFhwQ0JnPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MTcsImFkdlNlY3JldEtleSI6IjVSUTNmRjdjeVRtWXBRc2ZWeEU5U2FrekdaY2lsTVZkK3QvaW9ncE4veDA9IiwicHJvY2Vzc2VkSGlzdG9yeU1lc3NhZ2VzIjpbXSwibmV4dFByZUtleUlkIjo4MTMsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjo4MTMsImFjY291bnRTeW5jQ291bnRlciI6MCwiYWNjb3VudFNldHRpbmdzIjp7InVuYXJjaGl2ZUNoYXRzIjpmYWxzZX0sInJlZ2lzdGVyZWQiOnRydWUsInBhaXJpbmdDb2RlIjoiU1cyWUs5M0wiLCJtZSI6eyJpZCI6Ijk0NzYwMjIwMDUyOjU0QHMud2hhdHNhcHAubmV0IiwibGlkIjoiNDEyODgyMDg0OTg4OTg6NTRAbGlkIiwibmFtZSI6InNhY2hpdGgifSwiYWNjb3VudCI6eyJkZXRhaWxzIjoiQ0tIcm1iVUdFS1AwaTlFR0dBMGdBQ2dBIiwiYWNjb3VudFNpZ25hdHVyZUtleSI6IjhFQ2gzN095NWFFTytZdGRzN0x1N1JQYUlBOFRNMjBHQWFLZGJyOHZpejg9IiwiYWNjb3VudFNpZ25hdHVyZSI6Ik5qUjVSWTRlYXg3WmZtcGFVbWx2Wmo2V1g1SXNreEUwT2NMTyt3Wm9nTExuN00ySm1LR2VjVmxoeWRsQzVzaUh0azVFYlBrYnlpQWxrUlBFRm5LdEJnPT0iLCJkZXZpY2VTaWduYXR1cmUiOiJ3cVdHeTltU29aSFdJdnVWOHcySGR4aXpVVWNQb0ZnK1AwcjBJUkE3U0R0OEpqaWdZMFNwMUNVMHFsOW4xNHFxUm5rVFQwaTRIelV1RmlzVkc5YThBdz09In0sInNpZ25hbElkZW50aXRpZXMiOlt7ImlkZW50aWZpZXIiOnsibmFtZSI6IjQxMjg4MjA4NDk4ODk4OjU0QGxpZCIsImRldmljZUlkIjowfSwiaWRlbnRpZmllcktleSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkJmQkFvZCt6c3VXaER2bUxYYk95N3UwVDJpQVBFek50QmdHaW5XNi9MNHMvIn19XSwicGxhdGZvcm0iOiJhbmRyb2lkIiwicm91dGluZ0luZm8iOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJDQUlJQlFnUyJ9LCJsYXN0QWNjb3VudFN5bmNUaW1lc3RhbXAiOjE3ODA2NzcxNjIsImxhc3RQcm9wSGFzaCI6IjNJUURnNSIsIm15QXBwU3RhdGVLZXlJZCI6IkFBQUFBR0hyIn0=",
// add your Session Id 
AUTO_STATUS_SEEN: process.env.AUTO_STATUS_SEEN || "false",
// make true or false status auto seen
AUTO_STATUS_REPLY: process.env.AUTO_STATUS_REPLY || "false",
// make true if you want auto reply on status 
AUTO_STATUS_REACT: process.env.AUTO_STATUS_REACT || "false",
// make true if you want auto reply on status 
AUTO_STATUS_MSG: process.env.AUTO_STATUS_MSG || "*𝚂𝙴𝙴𝙽 𝚈𝙾𝚄𝚁 𝚂𝚃𝙰𝚃𝚄𝚂 𝙱𝚈 JOEN-MEHAR007 🤍*",
// set the auto reply massage on status reply  
ANTI_DELETE: process.env.ANTI_DELETE || "false",
// set true false for anti delete     
ANTI_DEL_PATH: process.env.ANTI_DEL_PATH || "inbox", 
// change it to 'same' if you want to resend deleted message in same chat     
WELCOME: process.env.WELCOME || "false",
// true if want welcome and goodbye msg in groups    
ADMIN_EVENTS: process.env.ADMIN_EVENTS || "false",
// make true to know who dismiss or promoted a member in group
ANTI_LINK: process.env.ANTI_LINK || "false",
// make anti link true,false for groups 
MENTION_REPLY: process.env.MENTION_REPLY || "false",
// make true if want auto voice reply if someone menetion you 
MENU_IMAGE_URL: process.env.MENU_IMAGE_URL || "https://eliteprotech-url.zone.id/1780041359081m6jlml.jpg",
// add custom menu and mention reply image url
PREFIX: process.env.PREFIX || ".",
// add your prifix for bot   
BOT_NAME: process.env.BOT_NAME || "JOEN-MEHAR007",
// add bot namw here for menu
STICKER_NAME: process.env.STICKER_NAME || "JOEN-MEHAR007",
// type sticker pack name 
CUSTOM_REACT: process.env.CUSTOM_REACT || "false",
// make this true for custum emoji react    
CUSTOM_REACT_EMOJIS: process.env.CUSTOM_REACT_EMOJIS || "💝,💖,💗,❤️‍🩹,❤️,🧡,💛,💚,💙,💜,🤎,🖤,🤍",
// chose custom react emojis by yourself 
DELETE_LINKS: process.env.DELETE_LINKS || "false",
// automatic delete links witho remove member 
OWNER_NUMBER: process.env.OWNER_NUMBER || "923303030400",
// add your bot owner number
OWNER_NAME: process.env.OWNER_NAME || "JOEN-MEHAR007",
// add bot owner name
DESCRIPTION: process.env.DESCRIPTION || "*© ᴘᴏᴡᴇʀᴇᴅ ʙʏ JOEN-MEHAR007 ❣️*",
// add bot owner name    
ALIVE_VID: process.env.ALIVE_VID || "https://files.catbox.moe/2myos8.mp4",
// add img for alive msg
LIVE_MSG: process.env.LIVE_MSG || "𝚉𝙸𝙽𝙳𝙰 𝙷𝚄𝙽 𝚈𝙰𝚁 🤖",
// add alive msg here 
READ_MESSAGE: process.env.READ_MESSAGE || "false",
// Turn true or false for automatic read msgs
AUTO_REACT: process.env.AUTO_REACT || "false",
// make this true or false for auto react on all msgs
ANTI_BAD: process.env.ANTI_BAD || "false",
// false or true for anti bad words  
MODE: process.env.MODE || "public",
// make bot public-private-inbox-group 
ANTI_LINK_KICK: process.env.ANTI_LINK_KICK || "false",
// make anti link true,false for groups 
AUTO_STICKER: process.env.AUTO_STICKER || "false",
// make true for automatic stickers 
AUTO_REPLY: process.env.AUTO_REPLY || "false",
// make true or false automatic text reply 
ALWAYS_ONLINE: process.env.ALWAYS_ONLINE || "false",
// maks true for always online 
PUBLIC_MODE: process.env.PUBLIC_MODE || "true",
// make false if want private mod
AUTO_TYPING: process.env.AUTO_TYPING || "false",
// true for automatic show typing   
READ_CMD: process.env.READ_CMD || "false",
// true if want mark commands as read 
DEV: process.env.DEV || "923303030400",
//replace with your whatsapp number        
ANTI_VV: process.env.ANTI_VV || "false",
// true for anti once view 
AUTO_RECORDING: process.env.AUTO_RECORDING || "false"
// make it true for auto recoding 
};
