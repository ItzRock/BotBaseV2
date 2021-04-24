const filename = require('path').basename(__filename).split(".")[0]
const category = __dirname.split("\\")[__dirname.split("\\").length - 1].split("/")[__dirname.split("/").length - 1]
const invoke = async (client, message, arguments, userPermissions, userLevel, Discord) =>{
    const msg = await message.channel.send(`Pending`);
    const ms = msg.createdTimestamp - message.createdTimestamp
    msg.edit(`​🏓 Pong! My latency is \`${ms}\`ms. \nAPI Latency is \`${Math.round(client.ws.ping)}\`ms`)
}

module.exports = (client) => {
    const details = {
        name: filename,
        category: category,
        aliases: [],
        desciption: undefined,
        usage: `${filename} <required> [optional]`
    }
    const config = {
        permissionLevel: 0,
        requiredPermissions: [],
        guildOnly: false,
        requiredArguments: 0,
        premium: false,
        disableable: true
    }
    const command  = new client.command(invoke, details, config)
    return command
}