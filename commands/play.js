const ytdl = require('ytdl-core');
const ytpl = require('ytpl');
const SpotifyWebApi = require("spotify-web-api-node");
const Discord = require('discord.js');
var {google} = require('googleapis');


module.exports.run = async(client, message, args, queue, searcher, spotifyApi) =>{
    const vc = message.member.voice.channel;
    message.react('👍');
    if(!vc)
        return message.channel.send("Necesitas es un canal de voz");
    if(args.length < 1) 
        return message.channel.send("Ingresa un nombre o un link de youtube")
    let url = args.join("");
    try{
        if(url.match(/^https?:\/\/(www.youtube.com|youtube.com)\/watch(.*)list(.*)$/)){
            await ytpl(url).then(async playlist =>{
                message.channel.send(`La playlist: "${playlist.title}" fue agregada`)
                playlist.items.forEach(async item =>{
                    await videoHandler(await ytdl.getInfo(item.shortUrl), message, vc, true)
                })
            })
        }else if(url.match((/^https?:\/\/(www.youtube.com|youtube.com)\/watch(.*)$/))){
            let songInfo = await ytdl.getInfo(url);
            autoplay(url.match(/(?<=\=)(.*)$/))
            return videoHandler(songInfo, message, vc);
    
        }else if(url.match(/^https?:\/\/(open.spotify.com)\/playlist\/(.*)$/)){
            var match = url.match(/([0-9].*)$/);
            getPlaylistSongs(match);
        }
        else {
            let result = await searcher.search(args.join(" "), {type: "video"});
            if(result.first == null)
                return message.channel.send("No se encontraron resultados");
            let songInfo = await ytdl.getInfo(result.first.url);
            autoplay(result.first.url.match(/(?<=\=)(.*)$/))
            return videoHandler(songInfo, message, vc);
        }
    }catch(UnhandledPromiseRejectionWarning){
        message.channel.send(`Se alcanzo el limite de canciones por dia 😭`)
    }
   

    async function getPlaylistSongs(match){
        const data = await spotifyApi.getPlaylistTracks(match[0], {
            offset: 1,
            limit: 50,
            fields: 'items'
        })
        let tracks = [];
        for(let trackobjt of data.body.items){
            const track = trackobjt.track
            tracks.push(track);
        }
        for(let test of tracks){
            var st = test.name + " " + test.artists[0].name;
            let result = await searcher.search(st, {type: "video"});
            let songInfo = await ytdl.getInfo(result.first.url);
            videoHandler(songInfo, message, vc, true);
        }
    }   

    async function videoHandler(songInfo, message, vc, playlist = false){
        const serverQueue = queue.get(message.guild.id);
        const song = {
            title: songInfo.videoDetails.title,
            url: songInfo.videoDetails.video_url,
            thumbnail: songInfo.videoDetails.thumbnails[3].url,
            vLenght: songInfo.videoDetails.lengthSeconds
        }
        if(!serverQueue){
            const queueConstructor = {
                txtChannel: message.channel,
                vChannel: vc,
                connection: null,
                songs: [],
                volume: 100,
                playing: true,
                loopone: false,
                loopall: false
            };
            queue.set(message.guild.id, queueConstructor);

            queueConstructor.songs.push(song);

            try{
                let connection = await queueConstructor.vChannel.join();
                queueConstructor.connection = connection;
                play(message.guild, queueConstructor.songs[0]);
            }catch (error){
                console.error(err);
                queue.delete(message.guild.id);
                return message.channel.send(`Fallo ${err}`)
            }
        }else{
            serverQueue.songs.push(song);
        }
    }
    function play(guild, song){
        const serverQueue = queue.get(guild.id);
        if(!song){
            serverQueue.vChannel.leave();
            queue.delete(guild.id);
            return;
        }
        if(serverQueue.songs.length == 1){
            autoplay(serverQueue.songs[0].url.match(/(?<=\=)(.*)$/))
        }
        const dispatcher = serverQueue.connection
            .play(ytdl(song.url))
            .on('finish', () =>{
                if(serverQueue.loopone){
                    play(guild, serverQueue.songs[0]);
                }
                else if(serverQueue.loopall){
                    serverQueue.songs.push(serverQueue.songs[0]);
                    serverQueue.songs.shift();
                }else{
                    serverQueue.songs.shift();
                }
                play(guild, serverQueue.songs[0]);
            })
            let msg = new Discord.MessageEmbed()
                .setDescription(`Escuchando: [${serverQueue.songs[0].title}](${serverQueue.songs[0].url})`)
                .setColor("GREEN")
            return message.channel.send(msg).then(messageSent => {
                messageSent.delete({ timeout: serverQueue.songs[0].vLenght*1000});
            });
    }

    function autoplay(videoId){
        var str = videoId;
        google.youtube('v3').search.list({
            key: process.env.youtube_api,
            part: 'snippet',
            type: 'video', 
            videoDuration: 'medium',
            maxResults: 10,
            relatedToVideoId: str[0].toString(), 
        }).then((response)  =>{
            const {data} = response;
            data.items.forEach( async (item) => {
                try{
                    console.log(item.snippet.title);
                    let result = await searcher.search(item.snippet.title, {type: "video"});
                    let songInfo = await ytdl.getInfo(result.first.url);
                    await videoHandler(songInfo, message, vc);
                }catch(UnhandledPromiseRejectionWarning){
                    console.log("no va");
                }
            });        
        }).catch((err) => console.log(err));
    }

    async function deleteMsg(){
        await message.channel.messages.fetch({limit: 1}).then(messages =>{
            message.channel.bulkDelete(messages);
        })
    }
}
module.exports.config ={
    name: "play",
    aliases: ["p", "pl"]
}