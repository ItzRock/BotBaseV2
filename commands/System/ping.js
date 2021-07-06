const filename = require('path').basename(__filename).split(".")[0]
const category = __dirname.split("\\")[__dirname.split("\\").length - 1].split("/")[__dirname.split("/").length - 1]
/**
 * @param {import("discord.js").Client} client 
 * @param {import("discord.js").Message} message 
 * @param {import("discord.js")} Discord 
 */
const invoke = async (client, message, arguments, userPermissions, userLevel, Discord) =>{
    const customHTTPServices = [ // Add as many as you wish.
        {name: "Google", URL: "https://google.com", message: `Calculating`},
        {name: "GitHub", URL: "https://github.com", message: `Calculating`},
        
    ]
    const connections = [ // Do not modify (unless its the default message)
        {name: `${client.user.username} v${client.version}`, message: `Calculating`},
        {name: `API Latency`, message: `Calculating`}
    ]
    const embed = client.embed(`${client.user.username} Connections`);
    async function update(){
        embed.spliceFields(0, embed.fields.length)
        connections.forEach(service => {
            embed.addField(service.name, service.message, true)
        })
        customHTTPServices.forEach( service => {
            embed.addField(service.name, service.message, true)
        })
    }
    await update();
    const msg = await message.channel.send({ embeds: [embed] });
    const ms = msg.createdTimestamp - message.createdTimestamp;
    connections[0].message = `\`${ms}\` ms`;
    connections[1].message = `\`${Math.round(client.ws.ping)}\` ms`;
    for(let index in customHTTPServices){
        const service = customHTTPServices[index]
        const startTime = new Date();
        const response = await client.https.get(service.URL);
        const endTime = new Date();
        customHTTPServices[index].message = `\`${Math.floor(endTime - startTime)}\` ms`
    }
    update();
    msg.edit({ embeds: [embed] })
}

module.exports = (client) => {
    const details = {
        name: filename,
        category: category,
        aliases: [],
        desciption: undefined,
        usage: `${filename}`
    }
    const config = {
        permissionLevel: 0,
        requiredPermissions: [],
        guildOnly: false,
        requiredArguments: 0,
        premium: false,
        disableable: true
    }
    const command = new client.command(invoke, details, config)
    return command
}