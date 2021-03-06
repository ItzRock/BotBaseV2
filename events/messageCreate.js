/**
 * 
 * @param {import("discord.js").Client} client 
 * @param {import("discord.js").Message} message 
 * @returns 
 */
module.exports = async (client, message) => {
  if (message.author.bot) return;
  
  const settings = message.channel.type.toLowerCase() == "dm" ? client.config.defaults : (await client.settings.fetch(message.guild.id)).Settings;
  message.settings = settings
  if (message.content.includes(client.user.toString())) return message.reply(`:wave: my prefix is \`${settings.prefix.value}\``)
  if (message.content.indexOf(settings.prefix.value) !== 0) return;

  const arguments = message.content.slice(settings.prefix.value.length).trim().split(/ +/g);
  const command = arguments.shift().toLowerCase();

  if (message.guild && !message.member) await message.guild.members.fetch(message.author);
  const level = client.getLevel(message)
  const cmd = client.cmds.get(command) || client.cmds.get(client.cmdsAliases.get(command));
  if (!cmd) return;

  const operator = client.config.Operators.includes(message.author.id)

  const emojis = Object.entries(client.config.emojis)
  emojis.forEach(emoji => {
    message[emoji[0]] = emoji[1]
  })

  if (cmd.enabled = false) return;
  if (message.channel.type == "dm" && cmd.guildOnly === true) return message.reply(`${message["-"]} This command is unavailable in DMs. Please run in a Server.`);

  if (settings.disabledCMDS.value.includes(cmd.name)) {
    if (operator) {
      message.reply(`${message.check} This command is disabled but \`${message.author.tag}\` is allowed. (Case: ${client.user.username} Administrator)`)
    }
    else return message.reply(`${message["-"]} This command has been disabled in this guild! please try another guild or in DMs.`)
  }

  const premiumStatus = settings.premium.value;
  if (cmd.premium && !premiumStatus && !operator) return message.reply(`${message["-"]} This command can only be used in premium servers.`)

  const userLevel = client.config.permissions.find(l => l.level === level).name
  const cmdLevel = client.config.permissions.find(l => l.level === cmd.permissionLevel).name
  if (level < cmd.permissionLevel) return message.reply(`${message["-"]} Invalid Permissions:\nYour Level \`${level}\` : \`${userLevel}\`,\nRequired Level \`${cmd.permissionLevel}\` : \`${cmdLevel}\``)

  const missingPermissions = []
  cmd.requiredPermissions.forEach(permission => {
    if (!message.guild.me.hasPermission(permission)) missingPermissions.push(permission)
  })

  if (missingPermissions.length !== 0) return message.reply(`${message["-"]} Invalid Bot Permissions. Missing perms for this command: \`\`\`\n${missingPermissions.join(" ")}\n\`\`\``)
  if (arguments.length < cmd.requiredArguments) return message.reply(client.invalidArguments(cmd.name))

  const guild = message.channel.type.toLowerCase() == "dm" ? message.channel.type : message.guild.name
  client.cmd(`GUILD: ${guild} | L${level} ${message.author.username} ran ${cmd.name}`);

  try {
    const data = cmd.invoke(client, message, arguments, message.member == null ? null :message.member.permissions.toArray(), level, require("discord.js"))
    if(data.catch) data.catch(error => message.reply({embeds: [new client.ErrorEmbed(error)]}))
  } catch (error) {
    message.reply({embeds: [new client.ErrorEmbed(error)]})
  }
}