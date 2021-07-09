module.exports = async (client, interaction) => {
    if(!interaction.isButton() || !interaction.isCommand()) return;
    if(interaction.isButton()) client.emit("messageButton", client, interaction)
    if(interaction.isCommand()) client.emit("slashCommand", client, interaction)
}