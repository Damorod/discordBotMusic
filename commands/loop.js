module.exports.run = (client, message, args, queue, searcher) =>{
    message.react('👍');
    const serverQueue = queue.get(message.guild.id);
    if(!serverQueue.connection)
        return message.channel.send("No hay ninguna cancion sonando");
    if(!message.member.voice.channel)
        return message.channel.send("Necesitas estar en un canal de voz");
    switch(args[0].toLowerCase()){
        case 'all':
            serverQueue.loopall = !serverQueue.loopall;
            serverQueue.loopone = false;
            if(serverQueue.loopall)
                message.channel.send("Loop all activado");
            else
                message.channel.send("Lopp all desactivado");
            break;
        case 'one':
            serverQueue.loopall = false;
            serverQueue.loopone = !serverQueue.loopone;
            if(serverQueue.loopone)
                message.channel.send("loop one activado");
            else
                message.channel.send("loop one desactivado");
        break;
        case 'off':
            serverQueue.loopall = false;
            serverQueue.loopone = false;

            message.channel.send("loop desactivado");
        break;
        default:
            message.channel.send("Especificar que tipo de loop !loop all/one/off");
    }
}

module.exports.config ={
    name: "loop",
    aliases: ["lo"]
}
