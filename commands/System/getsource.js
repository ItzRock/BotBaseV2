const filename = require('path').basename(__filename).split(".")[0]
const category = __dirname.split(String.fromCharCode(92))[__dirname.split(String.fromCharCode(92)).length - 1].split("/")[__dirname.split("/").length - 1]
const { promisify } = require("util");
const fs = require("fs")
const readFile = promisify(require("fs").readFile); 
/**
 * @param {import("discord.js").Client} client 
 * @param {import("discord.js").Message} message 
 * @param {import("discord.js")} Discord 
 */
const invoke = async (client, message, arguments, userPermissions, userLevel, Discord) =>{
    const cmd = client.fetchCommand(arguments[0]);
    if(!cmd) return message.reply({ 
        content: `${message.x} \`${arguments[0]}\` is an invalid command.`,
        allowedMentions: {
            parse: ["everyone", "roles", "users"]
        }
    });
    const directory = `​${cmd.category}/${cmd.name}.js`;
    const data = fs.readFileSync(`./commands/${directory}`, "utf8");
    const clean = await client.clean(client, data);
    message.channel.send({
        files: [
            {
                name: `${cmd.name}.js`,
                attachment: new Buffer.from(clean)
            }
        ]
    });
}

module.exports = (client) => {
    const details = {
        name: filename,
        category: category,
        aliases: [],
        desciption: undefined,
        usage: filename + ` <command>`
    }
    const config = {
        permissionLevel: 0,
        requiredPermissions: [],
        guildOnly: false,
        requiredArguments: 1,
        premium: false,
        disableable: true,
        enabled: true
    }
    return new client.Command(invoke, details, config)
}