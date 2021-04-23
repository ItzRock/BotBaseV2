const { promisify } = require("util");
const fs = require("fs");
const readdir = promisify(fs.readdir);
module.exports = async (client) => {
    client.database = new Map();

    const modules = await readdir('./modules/Database/modules')
    modules.forEach(moduleName => {
        try {
            console.log(`Loading ${moduleName}`)
            client.load("database", moduleName.replace(".js", ""));    
        } catch (error) {
            console.log(`${error.message}`) 
        }
    })
    client.log(`All Database Modules have been loaded`);   
}