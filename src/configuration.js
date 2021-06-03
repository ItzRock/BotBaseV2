const configuration = (client) => {
    const keys = require("./keys.json");
    const config = {
        keys: require("./keys.json"),
        defaults: require("./defaults.js"),
        permissions: require("./permissions"),

        debug: { // Put Channel IDs here, or put undefined or false to have it not send.
            console: "",
            logs: "",
            error: ""
        },
        emojis: { // <:EMOJI-NAME:EMOJI-ID>
            check: "<:checkmark:833771519813484614>",
            ["!"]: "<:Exclamation:833788633918996490>",
            x: "<:X:833788610523824179>", 
            ["-"]:"<:Denied:834926734730068008>", 
            eval: "<:eval:834946086056493076>"
        },

        Operators: [
            "299682971374452739", // Discord user ID
            "412729903893708801" //Stinky
        ],

        Database: {
            /* 
                Types of DBs

                1. mongo (MongoDB, cannot connect to foreign networks) -- Requires https://www.mongodb.com/
                2. sqlite (SQlite3, stored locally. requires 3rd party program to view.) 
                3. json (JSON, stored locally. recommened if you have never messed with a db)
            */
            type: "mongo", 
            url: "mongodb://localhost:27017",
            DB: "BotBase",
            password: keys.dbAccess,
            collections: {
                ServerSettings: "server-settings",
            }
        },
    }
    return config
}
module.exports = configuration