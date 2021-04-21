const defaults = {
    // General Settings
    prefix:  {
        name : "prefix",
        value : ";",
        valueType: String,
        category : "General",
        editable : true,
        premium : false
    },
    autorole:  {
        name : "autorole",
        value : undefined,
        valueType: String,
        category : "General",
        editable : true,
        premium : false
    },
    welcoming:  {
        name : "welcoming",
        value : undefined,
        valueType: Boolean,
        category : "General",
        editable : true,
        premium : false
    },
    "welcoming-channel":  {
        name : "welcoming-channel",
        value : undefined,
        valueType: String,
        category : "General",
        editable : true,
        premium : false
    },
    "welcoming-text":  {
        name : "welcoming-text",
        value : undefined,
        valueType: String,
        category : "General",
        editable : true,
        premium : false
    },
    
    // Moderation.

    admins:  {
        name : "admins",
        value : [],
        valueType: Array,
        category : "Moderation",
        editable : true,
        premium : false
    },
    mods:  {
        name : "mods",
        value : [],
        valueType: Array,
        category : "Moderation",
        editable : true,
        premium : false
    },
    logs: {
        name : "logs",
        value : undefined,
        valueType: String,
        category : "Moderation",
        editable : true,
        premium : false
    },
    mutedrole: {
        name : "mutedrole",
        value : undefined,
        valueType: String,
        category : "Moderation",
        editable : true,
        premium : false
    },


    // Etc
    premium: {
        name : "premium",
        value : false,
        valueType: Boolean,
        category : "BotAdmin",
        editable : false,
        premium : false
    },
    disabledCMDS: {
        name : "disabledCMDS",
        value : [],
        valueType: Array,
        category : "BotAdmin",
        editable : false,
        premium : false
    },
    mutedUsers: {
        name : "mutedUsers",
        value : [],
        valueType: Array,
        category : "BotAdmin",
        editable : false,
        premium : false
    },
    
}
module.exports = defaults