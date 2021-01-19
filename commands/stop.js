module.exports.run = (client, message, args, queue, searcher, spotifyApi) =>{
    message.react('👋');
    const serverQueue = queue.get(message.guild.id);
    if(!message.member.voice.channel)
        return message.channel.send("Necesitas estar en un canal de voz");
    serverQueue.songs = [];
    serverQueue.connection.dispatcher.end();
}
module.exports.config ={
    name: "leave",
    aliases: ["l"]
}
