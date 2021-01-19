module.exports.run = (client, message, args, queue, searcher, spotifyApi) =>{
    const serverQueue = queue.get(message.guild.id);
    if(!serverQueue) 
        return message.channel.send("No hay musica sonando");
    if(!message.member.voice.channel)
        return message.channel.send("Necesitas estar en un canal de voz");
    if(isNaN(args[0]) || args[0] > 200 || args[0] < 0)
        return message.channel.send("Ingrese un valor entre 0 y 200");
    let number = args[0]/100;
    serverQueue.connection.dispatcher.setVolume(number);
    message.channel.send(`Volumen : ${serverQueue.songs[0].title} a ${args[0]}`);

}
module.exports.config ={
    name: "volume",
    aliases: ["v"]
}