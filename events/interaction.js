module.exports = async (client, interaction) => {
    if (!interaction.isCommand()) return;
    return
    interaction.author = interaction.user
    if(!interaction.channel) {
        interaction.channel = interaction.user
    }
    const settings = client.config.defaults;
    interaction.content = settings.prefix.value + `${interaction.commandName} ${interaction.options.join(" ")}`
    require("./message")(client, interaction)
}