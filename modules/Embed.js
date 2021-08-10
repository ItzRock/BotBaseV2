const Discord = require("discord.js")
/** @param {Discord.Client} client */
module.exports = (client) => {
    client.Colour = () => Math.floor(Math.random()*16777215);
    class Embed extends Discord.MessageEmbed {
        constructor(title){
            super();
            this.footer = {
                text: client.user.username,
                iconURL: client.user.avatarURL({size: 4096, dynamic: true, format: "png"})
            };
            this.author = {
                name: client.user.username,
                iconURL: client.user.avatarURL({size: 4096, dynamic: true, format: "png"}),
                url: undefined
            };
            this.timestamp = Date.now();
            this.title = title || null;
            this.color = client.Colour()
        }
    }
    class ErrorEmbed extends Embed{
        constructor(error){
            super();
            this.color = 15548997
            this.description = `An error has occured! \`${error.name} : ${error.message}\`\nIf this error keeps occuring please report this in the support server for this bot found by running \`${client.config.defaults.prefix.value}server\``;
        }
    }
    client.ErrorEmbed = ErrorEmbed;
    client.Embed = Embed;
}
