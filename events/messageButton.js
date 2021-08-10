module.exports = async (client, button) => {
    client.emit(`${button.id}`, button)
}