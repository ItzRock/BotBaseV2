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
            "299682971374452739" // Discord user ID
        ],

        Database: {
            url: "mongodb://localhost:27017",
            login: "Hue",
            password: keys.dbAccess
        },
    }
    return config
}
module.exports = configuration