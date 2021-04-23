const { promisify } = require("util");
const fs = require("fs");
const readdir = promisify(fs.readdir);
module.exports = async (client) => {
    client.modules = new Map();

    const modules = await readdir('./modules')
    modules.forEach(moduleName => {
        try {
            console.log(`Loading ${moduleName}`)
            client.load("mod", moduleName.replace(".js", ""));    
        } catch (error) {
            console.log(`${error.message}`) 
        }
    })
    client.log(`All Modules have been loaded`);   
}