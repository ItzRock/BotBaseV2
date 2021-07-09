const filename = require('path').basename(__filename).split(".")[0]
const category = __dirname.split("\\")[__dirname.split("\\").length - 1].split("/")[__dirname.split("/").length - 1]
/**
 * @param {import("discord.js").Client} client 
 * @param {import("discord.js").Message} message 
 * @param {import("discord.js")} Discord 
 */
const invoke = async (client, message, arguments, userPermissions, userLevel, Discord) =>{
    const code = arguments.join(" ");
    try {
        const evaled = eval(code);
        const clean = await client.clean(client, evaled);

        message.channel.send(
            {
                content: `​${message.check}\`​Success!\`​`, 
                files: [
                    {
                        name: `eval.js`,
                        attachment: new Buffer.from(clean)
                    }
                ]
            }
        )
    } catch (error) {
        const cleaned = await client.clean(client, `${error.name}:${error.message}`)
        message.channel.send(
            {
                content: `${message.x}\`ERROR\``,
                files: [
                    {
                        name: `error.js`,
                        attachment: new Buffer.from(cleaned)
                    }
                ]
            }
        )
    }
}

module.exports = (client) => {
    const details = {
        name: filename,
        category: category,
        aliases: [],
        desciption: "Raw Javascript",
        usage: `${filename} [Javascript]`
    }
    const config = {
        permissionLevel: 10,
        requiredPermissions: [],
        guildOnly: false,
        requiredArguments: 0,
        premium: false,
        disableable: true,
        enabled: true
    }
    return new client.Command(invoke, details, config)
    return command
}