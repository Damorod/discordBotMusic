const Discord = require('discord.js');

module.exports.run = (client, message, args, queue, searcher, spotifyApi) =>{
    message.react('👍');
    const exampleEmbed = new Discord.MessageEmbed()
	.setColor('GREEN')
	.setAuthor('Music Bot', 'https://i.imgur.com/HQqoqu7.jpg')
	.addFields(
		{ name: "!play/!p/!pl", value: "Se utiliza escribiendo !play seguido del nombre de la cancion, el link de youtube o spotify", inline: false },
        { name: "!pause/!pa", value: "Se utiliza para pausear la cancion actual", inline: false },
        { name: "!resume/!r", value: "Se utiliza para continuar la cancion actual", inline: false },
        { name: "!cola/!c", value: "Se utiliza para saber la lista de cancion en la cola de espera", inline: false },
        { name: "!skip/!sk", value: "Se utiliza para skipear la cancion", inline: false },
        { name: "!volume/!v", value: "Se utiliza para reducir o subir el volumen (0 a 200)", inline: false },
        { name: "!loop/!l", value: "Se utiliza para repetir la cancion o la playlist constantemente (all, one, off)", inline: false },
        { name: "!leave", value: "Se utiliza para sacar el bot del canal", inline: false },
        { name: "!info/!i", value: "Se utiliza para parar ver todos los comandos", inline: false },
        { name: "!clear/!cle", value: "Se utiliza para borrar mensajes viejos", inline: false },
	)
	.setTimestamp()
	.setFooter('Music Bot', 'https://i.imgur.com/HQqoqu7.jpg');

    message.channel.send(exampleEmbed);
}
module.exports.config ={
    name: "info",
    aliases: ["i"]
}



    