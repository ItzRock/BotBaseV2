const chalk = require("chalk");
const moment = require("moment");

function invoke(client) {
    function log(content, type = "LOG", colour = chalk.bgMagenta){
        const timestamp = `[${moment().format("YYYY-MM-DD HH:mm")}]:`;
        const message = `${timestamp} ${colour(type.toUpperCase())} ${content} `
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