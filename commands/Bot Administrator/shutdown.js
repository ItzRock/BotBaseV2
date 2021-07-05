const filename = require('path').basename(__filename).split(".")[0]
const category = __dirname.split("\\")[__dirname.split("\\").length - 1].split("/")[__dirname.split("/").length - 1]
/**
 * @param {import("discord.js").Client} client 
 * @param {import("discord.js").Message} message 
 * @param {import("discord.js")} Discord 
 */
const invoke = async (client, message, arguments, userPermissions, userLevel, Discord) =>{
    await message.reply(`${client.user.username} is shutting down!`);
    client.status.msg = "Shutting Down, await Updates on Status.";
    await client.updateActivity();
    process.exit(0);
}

module.exports = (client) => {
    const details = {
        name: filename,
        category: category,
        aliases: ["reboot"],
        desciption: "shutdowns the bot.",
        usage: `${filename}`
    }
    const config = {
        permissionLevel: 10,
        requiredPermissions: [],
        guildOnly: false,
        requiredArguments: 0,
        premium: false,
        disableable: false,
        enabled: true
    }
    const command = new client.command(invoke, details, config)
    return command
}