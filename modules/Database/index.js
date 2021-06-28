module.exports = async (client) => {
    const dbType = client.config.Database.type
    try {
        client.log(`Loading ${dbType}`)
        client.database = require(`./${dbType}/index.js`)(client)
    } catch (error) {
        console.log(`An Error has occured. ${error.name} : ${error.message}`) 
    }
}