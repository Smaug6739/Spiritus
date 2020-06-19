const color = require('../util/constants')
module.exports.run =async(client, message, args) => { 
const ytdl = require("ytdl-core");
const ytdlDiscord = require("ytdl-core-discord");
const { Util } = require("discord.js");
    const  voiceChannel  = message.member.voice.channel;
    if (!voiceChannel)
      return message.channel.send(
        "Vous devez être dans un salon vocal pour utiliser cette commande !"
      );
      client.queue = new Map();

    const serverQueue = message.client.queue.get(message.guild.id);
    const songInfo = await ytdl.getInfo(args[0]);
    const song = {
      id: songInfo.video_id,
      title: Util.escapeMarkdown(songInfo.title),
      url: songInfo.video_url
    };

    if (serverQueue) {
      serverQueue.songs.push(song);
      return message.channel.send(
        `✅ **${song.title}** est ajoutée à la queue !`
      );
    }

    const queueConstruct = {
      textChannel: message.channel,
      voiceChannel,
      connection: null,
      songs: [],
      volume: 1,
      playing: true
    };
    message.client.queue.set(message.guild.id, queueConstruct);
    queueConstruct.songs.push(song);

    const play = async song => {
      const queue = message.client.queue.get(message.guild.id);
      if (!song) {
        queue.voiceChannel.leave();
        message.client.queue.delete(message.guild.id);
        return;
      }

      const dispatcher = queue.connection
      .play(await ytdlDiscord(song.url))
        .on("end", reason => {
          if (reason === "Récupération trop lente !")
            console.log("La musique s'est arrêtée !");
          else console.log(reason);
          queue.songs.shift();
          play(queue.songs[0]);
        })
        .on("error", error => console.error(error));
      dispatcher.setVolumeLogarithmic(queue.volume / 5);
      queue.textChannel.send(`🎶 Commence à jouer: **${song.title}**`);
    };

    try {
      const connection = await voiceChannel.join();
      queueConstruct.connection = connection;
      play(queueConstruct.songs[0]);
    } catch (error) {
      console.error(`Je n'ai pas pu rejoindre le salon: ${error}`);
      message.client.queue.delete(message.guild.id);
      await voiceChannel.leave();
    }
}


   

module.exports.help = {
    
    name : 'play',
    aliases : ['play'],
    category : 'misc',
    description : 'Joue quelque chose',
    cooldown : 3,
    usage : '',
    exemple :[],
    permissions : false,
    isUserAdmin: false,
    args : false,
    sousCommdandes : []
}

