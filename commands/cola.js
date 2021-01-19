const { DiscordAPIError } = require("discord.js");
const Discord = require('discord.js');
const { json } = require("express");

module.exports.run = (client, message, args, queue, searcher) =>{
    message.react('👌');
    const serverQueue = queue.get(message.guild.id);
    if(!serverQueue.connection)
        return message.channel.send("No hay ninguna cancion en la cola");
    if(!message.member.voice.channel)
        return message.channel.send("Necesitas estar en un canal de voz");
   
    const embeds = embedGen(serverQueue);
    
    message.channel.send(embeds);

    function embedGen(serverQueue){
        const embeds = [];
        let songs = 11;
        if(serverQueue.songs.length <= 1){
            const msg = new Discord.MessageEmbed()
                .setDescription(`Escuchando: [${serverQueue.songs[0].title}](${serverQueue.songs[0].url})`)
                .setColor('GREEN')
            embeds.push(msg); 
            return embeds;   
        }
        for(var i = 1; i < serverQueue.songs.length; i++){
            const current = serverQueue.songs.slice(i, songs)
            songs += 10;
            let j = i-1;
            const info = current.map(song => `${++j}.  [${song.title}](${song.url}) ${parseInt(song.vLenght/60)}:${song.vLenght - 60 * parseInt(song.vLenght / 60)}`).join('\n' )
            let durActual = `${parseInt(serverQueue.songs[0].vLenght/60)}:${serverQueue.songs[0].vLenght - 60 * parseInt(serverQueue.songs[0].vLenght / 60)}`
            const msg = new Discord.MessageEmbed()
                .setDescription(`Escuchando:  [${serverQueue.songs[0].title}](${serverQueue.songs[0].url}) ${durActual} \n ${info}`)
                .setColor('GREEN')
            embeds.push(msg);    
        }
        return embeds
    }  
}
module.exports.config ={
    name: "cola",
    aliases: ["c"]
}
