module.exports = async (client, interaction) => {
    if(!interaction.isButton() && !interaction.isCommand()) return console.log("returning");
    if(interaction.isButton()) client.emit("messageButton", interaction)
    if(interaction.isCommand()) client.emit("slashCommand", interaction)
}