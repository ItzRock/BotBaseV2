module.exports = (client) => {
    client.file = (str) => { return new Buffer.from(str); }
    client.invalidArguments = (cmdName) => {
        const cmd = client.fetchCommand(cmdName)
        return `${client.config.emojis["x"]} Invalid Arguments: \`${cmd.usage}\``
    }
    client.fetchCommand = (query) =>{
        return client.cmds.get(query) || client.cmds.get(client.cmdsAliases.get(query));        
    }
    client.reloadSlashCommands = async (cmdName) =>{
        async function run(cmd){
            if(cmd == undefined) return
            const cmdElement = client.application.commands.cache.find(command => command.name === cmd.name);
            if(cmdElement) {
                await client.application.commands.delete(cmdElement.id)
                client.guilds.cache.forEach(async guild => {
                    guild.commands.cache.forEach(async slashCommand => {
                        await slashCommand.remove()
                    })
                })
            }
            let args = cmd.usage.replace(`${cmd.name}`, "").split(" ")
            const arguments = []
            args.forEach(argument => {
                const types = [
                    "STRING",
                    "INTEGER",
                    "BOOLEAN",
                    "USER",
                    "CHANNEL",
                    "ROLE",
                    "MENTIONABLE"
                ]
                const data = {
                    type: "STRING",

                }
                argument = argument.split("")
                if(argument[0] == "<"){ data.required = true }else data.required = false
                argument.pop(); argument.shift();
                argument = argument.join("")
                data.name = argument.toLowerCase()
                data.description = argument.toLowerCase()
                /*if(types.includes(argument.toUpperCase()))
                data.type = argument.toUpperCase()*/
                arguments.push(data)
            })
            arguments.shift()
            const cmdData = {
                name: cmd.name.toLowerCase(),
                description: cmd.description,
                options: arguments,
            };
            client.application.commands.create(cmdData);
        }
        if(cmdName){
            const cmd = clinet.fetchCommand(cmdName)
            run(cmd)
        }else{
            client.cmds.forEach(cmd => {
                run(cmd)
            })
        }
    }
    client.clean = async (client, text) => {
        if (text && text.constructor.name == "Promise") text = await text;
        if (typeof text !== "string")
          text = require("util").inspect(text, { depth: 1 });
    
        text = text
          .replace(/`/g, "`" + String.fromCharCode(8203))
          .replace(/@/g, "@" + String.fromCharCode(8203))
          .replace(client.token, "null");
    
        return text;
    };

    client.getLevel = (message) => {
        let level = 0;
        const permOrder = client.config.permissions
            .slice(0)
            .sort((p, c) => (p.level < c.level ? 1 : -1));
    
        while (permOrder.length) {
            const currentLevel = permOrder.shift();
            if (message.guild && currentLevel.guildOnly) continue;
            if (currentLevel.check(message, client)) {
            level = currentLevel.level;
            break;
            }
        }
        return level
    }
    client.findUser = (message, query) => {
        let user = message.mentions.members.first();
        if(user) return user
        query = query.toLowerCase()
        const users = []

    }
    client.load = (type, path) => {
        try {
            switch (type.toLowerCase()) {
                case "cmd": {
                    const command = require(`../commands/${path}`);
                    if(command.init) command.init(client)
                    const cmd = command(client)
                    client.cmds.set(cmd.name, cmd);
                    return cmd.aliases.forEach(alias => client.aliases.set(alias, cmd.name));
                }
                case "mod": {
                    const mod = require(`../modules/${path}`);
                    if(mod.init) mod.init(client)
                    client.modules.set(path, mod);
                    return mod(client);
                }
                case "database": {
                    const mod = require(`../modules/Database/modules/${path}`);
                    if(mod.init) mod.init(client)
                    client.database.set(path, mod);
                    return mod(client);
                }
                
                default: throw new Error(`${type} is not a valid loadable item.`);
            }
            
        } catch (error) { throw new Error(`Unable to load ${path} :: ${error.name}:${error.message}`) }
        
    }
    
    return this
}