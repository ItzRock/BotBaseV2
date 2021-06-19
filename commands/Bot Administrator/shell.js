const filename = require('path').basename(__filename).split(".")[0]
const category = __dirname.split("\\")[__dirname.split("\\").length - 1].split("/")[__dirname.split("/").length - 1]
const { exec } = require("child_process");
const invoke = async (client, message, arguments, userPermissions, userLevel, Discord) =>{
    const code = arguments.join(" ");
    if(arguments[0].toLowerCase() == "rm") return message.channel.send("fuck off")
    exec(code, (error, stdout, stderr) => {
        if(error !== null){
            return message.channel.send({
                content: `​${message.x}\`Error!\`​`, 
                files: [
                    {
                        name: `error.sh`,
                        attachment: new Buffer.from(error.toString())
                    }
                ]
            })
        }
        if(stderr){
            return message.channel.send({
                content: `​${message.check}\`​Success!\`​`, 
                files: [
                    {
                        name: `shell.sh`,
                        attachment: new Buffer.from(stderr)
                    }
                ]
            })
        }
        if(stdout){
            return message.channel.send({
                content: `​${message.check}\`​Success!\`​`, 
                files: [
                    {
                        name: `shell.sh`,
                        attachment: new Buffer.from(stdout)
                    }
                ]
            })
        }
    });
}

module.exports = (client) => {
    const details = {
        name: filename,
        category: category,
        aliases: [],
        desciption: "This command is EXTREMELY dangerous and should only be used for debugging.",
        usage: `${filename} [shell]`
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
    const command  = new client.command(invoke, details, config)
    return command
}