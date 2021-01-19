const Discord = require('discord.js');
const fs = require('fs');
const SpotifyWebApi = require("spotify-web-api-node")

const client = new Discord.Client();
client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();

fs.readdir("./commands/", (e, f) => {
    if(e) return console.error(e);
    f.forEach(file =>{
        if(!file.endsWith(".js"))return
        console.log(`${file} cargado`);
        let cmd = require(`./commands/${file}`);
        let cmdName = cmd.config.name;
        client.commands.set(cmdName, cmd);
        cmd.config.aliases.forEach(alias =>{
            client.aliases.set(alias, cmdName);
        })
    })
});

const { YTseacher, YTSearch, YTSearcher } = require("ytsearcher");

client.login(process.env.discord_token)
const searcher = new YTSearcher({
    //key: process.env.youtube_ap,
    key: process.env.youtube_api,
    revealed: true
});

var spotifyApi = new SpotifyWebApi({
    clientId: process.env.spotify_cliente,
    clientSecret: process.env.spotify_secret,
});

function newToken(){
    spotifyApi.clientCredentialsGrant().then(
        function(data) {       
          spotifyApi.setAccessToken(data.body['access_token']);
        },
        function(err) {
          console.log('Something went wrong when retrieving an access token', err);
        }
    );
}
newToken();

tokenRefreshInterval = setInterval(newToken, 1000 * 60 * 60);

const prefix = '!';

const queue = new Map();

client.on('ready', () => {
    console.log('Bot on')
    
})


client.on('message', async(message) =>{

    if(!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).trim().split(/ +/g)
    const command = args.shift().toLowerCase();

    const cmd = client.commands.get(command) || client.commands.get(client.aliases.get(command))

    if(!cmd) return
    try{
        cmd.run(client, message, args, queue, searcher, spotifyApi);
        
    }catch(err){
        return console.error(err);
    }
})





