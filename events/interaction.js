module.exports = async (client, interaction) => {
    if(interaction.isButton()) execButton(client, interaction)
    if(interaction.isCommand()) execCommand(client, interaction)
}
function execButton(client, button){
    
}
function execCommand(client, command){
    
}