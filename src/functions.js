module.exports = (client) => {
    client.file = (str) => { return new Buffer.from(str); }
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
                default: throw new Error(`${type} is not a valid loadable item.`);
            }
            
        } catch (error) { throw new Error(`Unable to load ${path} :: ${error.name}:${error.message}`) }
        
    }
    
    return this
}