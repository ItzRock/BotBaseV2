const filename = require('path').basename(__filename).split(".")[0]
const category = __dirname.split(String.fromCharCode(92))[__dirname.split(String.fromCharCode(92)).length - 1].split("/")[__dirname.split("/").length - 1]
/**
 * @param {import("discord.js").Client} client 
 * @param {import("discord.js").Message} message 
 * @param {import("discord.js")} Discord 
 */
const invoke = async (client, message, arguments, userPermissions, userLevel, Discord) =>{
    const newPrefix = arguments.join(" ").substring(0,10);
    const data = client.settings.update(message.guild.id, "prefix", newPrefix)
    data.catch(error => message.reply(`Error while updating server prefix: ${error.name} - ${error.message}. Report this to a ${client.user.username} Administrator`));
    data.then(data => message.reply(`Successfully set prefix to \`${newPrefix}\``));
}

module.exports = (client) => {
    const details = {
        name: filename,
        category: category,
        aliases: [],
        desciption: "Changes the prefix of the bot.",
        usage: `${filename} <prefix (max length 10)>`
    }
    const config = {
        permissionLevel: 6,
        requiredPermissions: [],
        guildOnly: true,
        requiredArguments: 1,
        premium: false,
        disableable: true,
        enabled: true
    }
    return new client.Command(invoke, details, config)
    return command
}