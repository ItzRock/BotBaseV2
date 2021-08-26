const filename = require('path').basename(__filename).split(".")[0]
const category = __dirname.split(String.fromCharCode(92))[__dirname.split(String.fromCharCode(92)).length - 1].split("/")[__dirname.split("/").length - 1]
/**
 * @param {import("discord.js").Client} client 
 * @param {import("discord.js").Message} message 
 * @param {import("discord.js")} Discord 
 */
const invoke = async (client, message, arguments, userPermissions, userLevel, Discord) =>{
    const id = `${message.id}`
    const Button = new Discord.MessageButton()
        .setCustomId(id).setStyle("PRIMARY").setLabel("abc")
    const ActionRow = new Discord.MessageActionRow()
        .addComponents(Button); 
    message.channel.send({
        content: "Button",
        components: [
            ActionRow
        ]
    })
    client.on(id, interaction => {
        interaction.reply(`Button #${id} has been pressed by ${interaction.user}`)
    })
}

module.exports = (client) => {
    const details = {
        name: filename,
        category: category,
        aliases: ["button"],
        desciption: undefined,
        usage: filename + ` <required> [optional]`
    }
    const config = {
        permissionLevel: 0,
        requiredPermissions: [],
        guildOnly: false,
        requiredArguments: 0,
        premium: false,
        disableable: true,
        enabled: true
    }
    return new client.Command(invoke, details, config)
}