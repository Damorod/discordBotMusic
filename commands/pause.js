module.exports.run = (client, message, args, queue, searcher) =>{
    message.react('⏸️');
    const serverQueue = queue.get(message.guild.id);
    if(!serverQueue.connection)
        return message.channel.send("No hay ninguna cancion sonando");
    if(!message.member.voice.channel)
        return message.channel.send("Necesitas estar en un canal de voz");
    if(serverQueue.connection.dispatcher.paused)
        return message.channel.send("La cancion ya esta pauseada");
    serverQueue.connection.dispatcher.pause();
    message.channel.send("Cancion pauseada");
}
module.exports.config ={
    name: "pause",
    aliases: ["pa"]
}
