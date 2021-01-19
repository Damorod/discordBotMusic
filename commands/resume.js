module.exports.run = (client, message, args, queue, searcher, spotifyApi) =>{
    message.react('⏯️');
    const serverQueue = queue.get(message.guild.id);
    if(!serverQueue.connection)
        return message.channel.send("No hay ninguna cancion sonando");
    if(!message.member.voice.channel)
        return message.channel.send("Necesitas estar en un canal de voz");
    if(serverQueue.connection.dispatcher.resumed)
        return message.channel.send("La cancion ya esta sonando");
    serverQueue.connection.dispatcher.resume();
    message.channel.send("Cancion reanudada");
}
module.exports.config ={
    name: "resume",
    aliases: ["r"]
}
