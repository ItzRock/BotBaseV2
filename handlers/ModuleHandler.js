const { promisify } = require("util");
const fs = require("fs");
const readdir = promisify(fs.readdir);
module.exports = async (client) => {
    client.modules = new Map();
    client.load("mod", "Logger");  
    const modules = await readdir('./modules')
    modules.forEach(moduleName => {
        try {
            client.log(`Loading ${moduleName}`)
            client.load("mod", moduleName.replace(".js", ""));    
        } catch (error) {
            console.log(`${error.message}`) 
        }
    })
    client.log(`All Modules have been loaded`);   
}