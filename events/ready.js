module.exports = async (client) => {
    client.version = "1.0.0";
    client.status = {msg : `for ${client.config.defaults.prefix.value}help | ${client.user.username} v${client.version}`, type: "WATCHING"} 
    client.user.setActivity(client.status.msg, {type: client.status.type});
    const interval = setInterval(()=>{
        client.user.setActivity(client.status.msg, {type: client.status.type});
    }, 1500000)
    client.warn(`${await client.user.username} Has logged on`)
}