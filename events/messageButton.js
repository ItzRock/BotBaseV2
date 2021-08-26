module.exports = async (client, button) => {
    client.emit(`${button.customId}`, button)
}