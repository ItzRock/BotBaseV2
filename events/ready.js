module.exports = async (client) => {
    client.updateActivity = () => client.user.setActivity(client.status.msg + ` | ${client.user.username} v${client.version}`, {type: client.status.type});
    client.version = "1.0.0";
    client.status = {msg : `for ${client.config.defaults.prefix.value}help`, type: "WATCHING"} 
    client.updateActivity()
    const interval = setInterval(() => client.updateActivity(), 1500000)
    client.warn(`${await client.user.username} Has logged on`)
}