module.exports = async (client) => {
    const defaults = client.config.defaults;
    const interval = setInterval(()=>{
        if(client.database !== undefined) {
            clearInterval(interval)
        }
    }, 100)
    const collections = client.config.Database.collections
    const checkup = async (data) => {
        return data // this will do something later i swear
    }
    client.settings = {
        read: async (guild) => {
            const data = await client.database.read({GuildID: guild}, collections.ServerSettings)
            const newData = checkup(data[0])
            if(data.length == 0) {
                const creationData = await client.settings.create(guild)
                return creationData
            } else return newData
        },
        create: async (guild) => {
            const data = await client.database.write({GuildID: guild, Settings: defaults}, collections.ServerSettings)
            return data
        }
    }

}