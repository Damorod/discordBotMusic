module.exports.run = (client, message, args, queue, searcher) =>{
    message.react('👌');
    const serverQueue = queue.get(message.guild.id);
    if(!message.member.voice.channel)
        return message.channel.send("Necesitas estar en un canal de voz");

    var test = message.content.split(" ") 

    var tmp = serverQueue.songs[parseInt(test[1])];
    serverQueue.songs[parseInt(test[1])] = serverQueue.songs[parseInt(test[2])];
    serverQueue.songs[parseInt(test[2])] = tmp;
}
module.exports.config ={
    name: "move",
    aliases: ["m"]
}