module.exports = (client) => { client.https = require("axios"); return client.https; } // Done this way as my own https system was awful and just poor.
