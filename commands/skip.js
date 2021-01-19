module.exports.run = (client, message, args, queue, searcher) =>{
    message.react('👌');
    const serverQueue = queue.get(message.guild.id);
    if(!message.member.voice.channel)
        return message.channel.send("Necesitas estar en un canal de voz");
    if(!serverQueue)
      return message.channel.send("No hay nada en la cola");
    serverQueue.connection.dispatcher.end();
}
module.exports.config ={
    name: "skip",
    aliases: ["sk"]
}
