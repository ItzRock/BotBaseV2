const permissions = [
    {
        level: -1,
        name: "Bot Banned",
        check: () => true
    },
    {
        level: 0,
        name: "User",
        check: (message, client) => client.isNotBotBanned(message.author.id)
    },
    {
        level: 3,
        name: "Moderator",
        check: (message) => {
            try {
                const roles = message.settings.mods.value
                message.member.roles.cache.forEach(role =>{
                    if(roles.includes(role.id)) return true;
                })
            } catch (error) {
                return false;
            }
        }
    },
    {
        level: 6,
        name: "Administrator",
        check: (message) => {
            try {
                const roles = message.settings.admins.value
                message.member.roles.cache.forEach(role =>{
                    if(roles.includes(role.id)) return true;
                })
            } catch (error) {
                return false;
            }
        }
    },
    {
        level: 8,
        name: "Server Owner",
        check: (message) => message.guild !== undefined ? (message.guild.ownerID === message.author.id ? true : false) : false
    },
    {
        level: 10,
        name: `Bot Administrator`,
        check: (message, client) => client.isBotAdmin(message.author.id)
    },
    
    
]
module.exports = permissions