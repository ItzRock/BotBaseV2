const { promisify } = require("util");
const fs = require("fs");
const readdir = promisify(fs.readdir);
module.exports = async (client) => {
    client.database = new Map();

    const modules = await readdir('./modules/Database/modules')
    const dbType = client.config.Database.type
    modules.forEach(moduleName => {
        try {
            client.log(`Loading ${moduleName}`)
            require(`./${dbType}/${moduleName}`)(client)
        } catch (error) {
            console.log(`An Error has occured. ${error.name} : ${error.message}`) 
        }
    })
    client.log(`All Database Modules have been loaded`);   
}