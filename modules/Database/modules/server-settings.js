module.exports = (client) => {
    const MongoClient = require("mongodb").MongoClient;
    const databaseInfo = client.config.Database
    const { promisify } = require("util")
    const connect = promisify(MongoClient.connect)

    const url = databaseInfo.url
    const dbID = databaseInfo.DB
    
    const collection = databaseInfo.collections.ServerSettings;

    const functions = {
        read: async (guildID) => {
            const promise = new Promise(async (resolve, reject) => {
                const db = await connect(url);
                const database = db.db(dbID);
                const query = { GuildID: guildID }
                database.collection(collection).find(query).toArray(async function(result){
                    resolve(result);
                    return db.close()
                })
            })
            const value = await promise;
            return value;
        }
    }
    client.database.set("settings", functions)
}