const http = require('http')
const ytdl = require('ytdl-core');
var {google} = require('googleapis');
const { response } = require('express');

module.exports.run = (client, message, args, queue, searcher, spotifyApi) =>{

    deleteMsg();

    async function deleteMsg(){
        await message.channel.messages.fetch({limit: args[0]}).then(messages =>{
            message.channel.bulkDelete(messages);
        })
    }
}
module.exports.config ={
    name: "clear",
    aliases: ["cle"]
}
