const defaults = {
    // General Settings
    prefix:  {
        name : "prefix",
        value : "?",
        valueType: "string",
        category : "General",
        editable : true,
        premium : false
    },
    autorole:  {
        name : "autorole",
        value : undefined,
        valueType: "string",
        category : "General",
        editable : true,
        premium : false
    },
    welcoming:  {
        name : "welcoming",
        value : undefined,
        valueType: "boolean",
        category : "General",
        editable : true,
        premium : false
    },
    "welcoming-channel":  {
        name : "welcoming-channel",
        value : undefined,
        valueType: "string",
        category : "General",
        editable : true,
        premium : false
    },
    "welcoming-text":  {
        name : "welcoming-text",
        value : undefined,
        valueType: "string",
        category : "General",
        editable : true,
        premium : false
    },
    
    // Moderation.

    admins:  {
        name : "admins",
        value : [],
        valueType: "array",
        category : "Moderation",
        editable : true,
        premium : false
    },
    mods:  {
        name : "mods",
        value : [],
        valueType: "array",
        category : "Moderation",
        editable : true,
        premium : false
    },
    logs: {
        name : "logs",
        value : undefined,
        valueType: "string",
        category : "Moderation",
        editable : true,
        premium : false
    },
    mutedrole: {
        name : "mutedrole",
        value : undefined,
        valueType: "string",
        category : "Moderation",
        editable : true,
        premium : false
    },


    // Etc
    premium: {
        name : "premium",
        value : false,
        valueType: "boolean",
        category : "BotAdmin",
        editable : false,
        premium : false
    },
    disabledCMDS: {
        name : "disabledCMDS",
        value : [],
        valueType: "array",
        category : "BotAdmin",
        editable : false,
        premium : false
    },
    mutedUsers: {
        name : "mutedUsers",
        value : [],
        valueType: "array",
        category : "BotAdmin",
        editable : false,
        premium : false
    },
    
}
module.exports = defaults