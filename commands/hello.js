module.exports.run = (message) =>{
    message.channel.send("Hello VA!");
}

module.exports.config = {
    name: "hello",
    aliases: ["hi", "hey"]
}