const Discord = require('discord.js');

module.exports.run = (client, message, args, queue, searcher, spotifyApi) =>{
    message.react('👍');
    const serverQueue = queue.get(message.guild.id);
    if(!serverQueue.connection)
        return message.channel.send("No hay ninguna cancion sonando");
    if(!message.member.voice.channel)
        return message.channel.send("Necesitas estar en un canal de voz");

    switch(args[0].toLowerCase()){
        case 'on':
            serverQueue.autoplay = true;
            if(serverQueue.autoplay)
                message.channel.send("autoplay activado");
        break;
        case 'off':
            serverQueue.autoplay = flase;
            if(serverQueue.autoplay)
                message.channel.send("autoplay desactivado");
        break;
        default:
            message.channel.send("Especificar on o off");
    }

}
module.exports.config ={
    name: "autoplay",
    aliases: ["auto"]
}