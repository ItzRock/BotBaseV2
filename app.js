/*
    ItzRock (299682971374452739) 
    @ItzRock_ (twitter)
    Support Server : https://discord.gg/QwgnZ83XD3

    Contributors:
    HarryXChen3 https://github.com/HarryXChen3
*/

const Discord = require("discord.js");
const client = new Discord.Client();

client.cmds = new Map();
client.cmdsAliases = new Map();

client.configuration = require("./src/configuration")(client)
client.config = client.configuration;

const client_boot = async () =>{
    
}
client_boot()