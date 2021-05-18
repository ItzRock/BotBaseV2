module.exports = async (client, interaction) => {
    if (!interaction.isCommand()) return;
    interaction.author = interaction.member.user
    
}