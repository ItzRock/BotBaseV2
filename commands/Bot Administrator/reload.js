const filename = require('path').basename(__filename).split(".")[0]
const category = __dirname.split("\\")[__dirname.split("\\").length - 1].split("/")[__dirname.split("/").length - 1]
/**
 * @param {import("discord.js").Client} client 
 * @param {import("discord.js").Message} message 
 * @param {import("discord.js")} Discord 
 */
const invoke = async (client, message, arguments, userPermissions, userLevel, Discord) =>{
    const command = client.fetchCommand(arguments[0]);
    if(command !== undefined) {
        let response = await client.unload("cmd", command.name);
        if(response) return message.reply(`Error Unloading: ${response}`);
        response = client.load("cmd", command.category + "/" + command.name)
        if(response) return message.reply(`Error loading: ${response}`);
        return message.reply(`The command \`${command.name}\` has been reloaded!`)
    } else message.channel.send(`${message.x} Invalid command: \`${arguments[0]}\``);
}

module.exports = (client) => {
    const details = {
        name: filename,
        category: category,
        aliases: [],
        desciption: "Reload the specified command",
        usage: `${filename} <command>`
    }
    const config = {
        permissionLevel: 10,
        requiredPermissions: [],
        guildOnly: false,
        requiredArguments: 1,
        premium: false,
        disableable: true,
        enabled: true
    }
    return new client.Command(invoke, details, config)
    return command
}