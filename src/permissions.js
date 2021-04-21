const permissions = [
    {
        level: -1,
        name: "Bot Banned",
        check: () => false
    },
    {
        level: 0,
        name: "User",
        check: () => true
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
        check: (message) => message.channel.type === "text" ? (message.guild.ownerID === message.author.id ? true : false) : false
    },
    {
        level: 10,
        name: `Bot Administrator`,
        check: (message, client) => client.config.Operators.includes(message.author.id)
    },
    
    
]
module.exports = permissions