const chalk = require("chalk");
const moment = require("moment");

function invoke(client) {
    function log(content, type = "LOG", colour = chalk.bgMagenta){
        const timestamp = `[${moment().format("YYYY-MM-DD HH:mm")}]:`;
        const message = `${timestamp} ${colour(type.toUpperCase())} ${content} `
        const discordMessage = `${timestamp} ${(type.toUpperCase())} ${content} `
        if(type !== "ERROR" && client.readyAt !== null) client.channels.cache.get(client.config.debug.console).send(`\`\`\`js\n${discordMessage}\n\`\`\``)
        if(type == "ERROR" && client.readyAt !== null) client.channels.cache.get(client.config.debug.error).send({
            files: [
                {
                    name: `error.js`,
                    attachment: new Buffer.from(discordMessage)
                }
            ]
        })
        
        return console.log(message)
    }
    client.log = log;
    client.ready = (content) => log(content, "READY", chalk.bgBlue);
    client.error = (content) => log(content, "ERROR", chalk.bgRed);
    client.warn = (content) => log(content, "WARN", chalk.bgBlue);
    client.cmd = (content) => log(content, "CMD", chalk.bgHex('#eb5a00'));
    log(`Logger has sucessfully loaded.`)
}
module.exports = invoke