const { MessageEmbed } = require("discord.js");
module.exports = (client) => {
  client.embedColour = function (safe) {
    const array = [
      "#f54242",
      "#4287f5",
      "#e042f5",
      "#5d42f5",
      "#42f59e",
      "#f5d142",
      "#ff8133",
    ]
    if (safe) array.shift()
    return array.random()
  };
  client.errorEmbed = (error) => {
    const avatarURL = client.user.avatarURL()
    const clientUsername = client.user.username
    const embed = new MessageEmbed()
      .setAuthor(clientUsername, avatarURL)
      .setFooter(clientUsername, avatarURL)
      .setTimestamp()
      .setColor("RED")
      .setTitle(`${client.config.emojis.exclamation} An Error has occurred`)
      .setDescription(`\`${error.name === "" ? error.name : error.name + ': '}${error.message}\`\nIf this continues to happen please join our support server by running \`;server\``)
    return embed
  }
  client.embed = function (
    title,
    description,
    color = client.embedColour(),
    authorExtText = ""
  ) {
    const clientUser = client.user.username;
    const avatar = client.user.avatarURL();
    const embed = new MessageEmbed()
      .setAuthor(`${clientUser} ${authorExtText}`, avatar)
      .setFooter(`${clientUser}`, avatar)
      .setTitle(title)
      .setColor(color)
      .setTimestamp()
      .setDescription(description);
    return embed;
  }
}