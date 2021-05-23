class command {
    constructor(invoke, details, config){
        this.invoke = invoke

        this.name = details.name
        this.aliases = details.aliases || []
        this.description = details.description || `This is a standard command with no desciption.`
        this.usage = details.usage || `${details.name}`
        this.category = details.category

        this.permissionLevel = config.permissionLevel || 0
        this.requiredPermissions = config.requiredPermissions
        this.guildOnly = config.guildOnly || true
        this.requiredArguments = config.requiredArguments || 0
        this.premium = config.premium || false
        this.disableable = config.disableable || true
        this.enabled = config.enabled || true
    }
}
module.exports = (client) => { client.command = command; }