/*
    ItzRock (299682971374452739)
    @ItzRock_ (twitter)
    Support Server : https://discord.gg/QwgnZ83XD3

    Contributors:
    HarryXChen3 https://github.com/HarryXChen3
*/

const { Client, Intents } = require("discord.js");
const client = new Client({ 
    intents: Intents.ALL, // All Intents will be allowed
    allowedMentions: { 
        parse: ["everyone", "roles"] // Incase the bot has vulnerability which allows it to send unparsed user data, this will result in the bot not pinging a mass number of users. Remove any if needed.
    } 
});

client.cmds = new Map();
client.cmdsAliases = new Map();
client.modules = new Map();

client.functions = require("./src/functions.js")(client);
client.modulesLoader = require('./src/module-handler')(client);

client.configuration = require("./src/configuration")(client);
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
