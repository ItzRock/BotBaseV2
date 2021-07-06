/*
    ItzRock Bot Base v2.0
    Support Server : https://discord.gg/QwgnZ83XD3
    
    Developers:
    Anthony (@ItzRock) https://github.com/ItzRock
    Harry (@HarryXChen3) https://github.com/HarryXChen3
*/


const { Client, Intents } = require("discord.js");
const client = new Client({ 
    intents: Intents.ALL, // All Intents will be allowed
    partials: ["MESSAGE", "CHANNEL"],
    allowedMentions: { 
        parse: ["everyone", "roles"] // Incase the bot has vulnerability which allows it to send unparsed user data, this will result in the bot not pinging a mass number of users. Remove any if needed.
    } 
});
client.cmds = new Map();
client.cmdsAliases = new Map();
client.modules = new Map();

client.functions = require("./handlers/functions.js")(client);
client.modulesLoader = require('./handlers/module-handler')(client);

client.configuration = require("./handlers/configuration")(client);
client.config = client.configuration;

const { promisify } = require("util");
const fs = require("fs");
const readdir = promisify(fs.readdir);

const boot = async () =>{
    const categories = await readdir("./commands/");
    categories.forEach(async category => {
        client.log(`Reading category: ${category}`)
        const commands = await readdir(`./commands/${category}`);
        commands.forEach(cmd => {
            if(!cmd.endsWith(".js") && !cmd.endsWith(".ts")) return;
            try {
                client.load("cmd", `${category}/${cmd}`)
                client.log(`Loaded command ${cmd}`)
            } catch (error) {
                client.log(error.message)
            }
        })
    });

    const events = await readdir("./events/")
    events.forEach(file => {
        client.log(`Loading Event: ${file}`)
        const event = require(`./events/${file}`)
        client.on(file.split(".")[0], event.bind(null, client))
    })

    client.login(client.config.keys.token)
}
boot()
