module.exports = (client) => {
    const MongoClient = require("mongodb").MongoClient;
    const databaseInfo = client.config.Database
    const url = databaseInfo.url
    const dbID = databaseInfo.DB
    const functions = {
        read: async (query, collection) => {
            const promise = new Promise(async (resolve, reject) => {
                MongoClient.connect(url, { useUnifiedTopology: true }, function(err, db){
                    const database = db.db(dbID);
                    database.collection(collection).find(query).toArray(async function(err, result){
                        if (err) reject(err)
                        resolve(result);
                        return db.close()
                    })
                });
            })
            const value = await promise;
            return value;
        },
        write: async (data, collection) => {
            const promise = new Promise(async (resolve, reject) => {
                MongoClient.connect(url, { useUnifiedTopology: true }, function(err, db){
                    const database = db.db(dbID);
                    database.collection(collection).insertOne(data, function(err, res) {
                        if (err) reject(err)
                        resolve(data)
                        return db.close()
                    });
                });
            })
            const value = await promise;
            return value;
        },
        remove: async (query, collection) => {
            const promise = new Promise(async (resolve, reject) => {
                MongoClient.connect(url, { useUnifiedTopology: true }, function(err, db){
                    const database = db.db(dbID);
                    database.collection(collection).deleteOne(query, function(err, obj) {
                        if (err) reject(err)
                        resolve('Successfully Removed')
                        return db.close()
                    });
                });
            })
            const value = await promise;
            return value;
        },
        update: async (oldQuery, newValues, collection) => {
            const promise = new Promise(async (resolve, reject) => {
                MongoClient.connect(url, { useUnifiedTopology: true }, function(err, db){
                    const database = db.db(dbID);
                    database.collection(collection).updateOne(oldQuery, newValues, function(err, obj) {
                        if (err) reject(err)
                        resolve('Successfully Removed')
                        return db.close()
                    });
                });
            })
            const value = await promise;
            return value;
        },
        count: async (collection, query) => {
            const promise = new Promise(async (resolve, reject) => {
                MongoClient.connect(url, { useUnifiedTopology: true }, function(err, db){
                    const database = db.db(dbID);
                    database.collection(collection).find(query).toArray(async function(err, result){
                        if (err) reject(err)
                        resolve(result.length);
                        return db.close()
                    })
                });
            })
            const value = await promise;
            return value;
        }
    }
    return functions
}