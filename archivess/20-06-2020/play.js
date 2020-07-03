const ffmpeg = require("ffmpeg")
const { Client, Util } = require('discord.js')
const ytdl = require('ytdl-core')
const PREFIX = '?'
 
const client = new Client({ disableEveryone: true })
 
const queue = new Map()
 
client.on('ready', () => console.log('Active'))
 
client.on('message', async message => {
    if(message.author.bot) return
    if(!message.content.startsWith(PREFIX)) return
 
    const args = message.content.substring(PREFIX.length).split(" ")
    const serveurQueue = queue.get(message.guild.id)
 
    if(message.content.startsWith(`${PREFIX}play`)) {
        const voiceChannel = message.member.voice.channel
        if(!voiceChannel) return message.channel.send("Vous devez être dans un salon pour jouer de la musique !")
        const permissions = voiceChannel.permissionsFor(message.client.user)
        if(!permissions.has('CONNECT')) return message.channel.send("Je n'ai pas la permission de me connecter dans ce salon !")
        if(!permissions.has('SPEAK')) return message.channel.send("Je n'ai pas la permissions de parler dans ce channel")
 
        const songInfo = await ytdl.getInfo(args[1])
        const song = {
            title: Util.escapeMarkdown(songInfo.title),
            url: songInfo.video_url
        }
 
        if(!serveurQueue) {
            const queueConstruct = {
                textChannel: message.channel,
                voiceChannel: voiceChannel,
                connection: null,
                songs: [],
                volume: 5,
                playing: true
            }
            queue.set(message.guild.id, queueConstruct)
           
            queueConstruct.songs.push(song)
 
            try {
                var connection = await voiceChannel.join()
                queueConstruct.connection = connection
                play(message.guild, queueConstruct.songs[0])
            } catch (error) {
                console.log(`There was an error connecting to the voice channel: ${error}`)
                queue.delete(message.guild.id)
                return message.channel.send(`There was an error connecting to the voice channel: ${error}`)
            }
        } else {
            serveurQueue.songs.push(song)
            return message.channel.send(`**${song.title}** est dans la fille d'attente !`)
        }
        return undefined
} else if (message.content.startsWith(`${PREFIX}stop`)) {
        if(!message.member.voice.channel) return message.channel.send("Tu as besoin d'être dans un channel pour stopper la musique !")
        if(!serveurQueue) return message.channel.send("There is nothing playinh !")
        serverQueue.songs = []
        serverQueue.connection.dispatcher.end()
        message.channel.send("J'ai stoper la musique pour toi !")
        return undefined
 } else if (message.content.startsWith(`${PREFIX}skip`)) {
        if(!message.member.voice.channel) return message.channel.send("Tu doit être dans un channel vocale pour skip la musique !")
        if(!serverQueue) return message.channel.send("There is nothing playing !")
        serverQueue.connection.dispatcher.end()
        message.channel.send("J'ai skipper la musique pour toi !")
        return undefined    
 } else if (message.content.startsWith(`${PREFIX}volume`)) {
        if(!message.member.voice.channel) return message.channel.send("Tu dois être dans un salon vocale pour changer le volume de la musique !")
        if(!serverQueue) return message.channel.send("There is nothing playing !")
        if(!args[1]) return message.channel.send(`That volume is: **${serverQueue.volume}**`)
        if(isNaN(args[1])) return message.channel;send("Ce n'est pas valide pour changer le volume !")
        serverQueue.volume = args[1]
        serverQueue.connection.dispatcher.setVolumeLogarithmic(args[1] / 5)
        message.channel.send(`J'ai changé le volume pour toi !: **${args[1]}**`)
        return undefined
} else if (message.content.startsWith(`${PREFIX}np`)) {
        if(!serverQueue) return message.channel.send("There is nothing playing !")
        message.channel.send(`Lecture en cours !: **${serverQueue.songs[0].title}**`)
        return undefined
 } else if (message.content.startsWith(`${PREFIX}queue`)) {
        if(!serverQueue) return message.channel.send("There is nothing playing !")
        message.channel.send (`
        __**Song Queue:**__
        ${serverQueue.songs.map(song => `**-** ${song.title}`).join(`\n`)}
       
        **Now Playing:** ${serverQueue.songs[0].title}
           `, { split: true})
           return undefined
 } else if (message.content.startsWith(`${PREFIX}pause`)) {
        if(!message.member.voice.channel) return message.channel.send("Tu dois être dans un salon vocale pour utiliser la commande pause !")
        if(!serverQueue) return message.channel.send(`There is nothing playing !`)
        if(!serverQueue.playing) return message.channel.send("La musique est déjà en pause !")
        serverQueue.playing = false
        serverQueue.connection.dispatcher.pause()
        message.channel.send("J'ai mis pour toi la musique en pause !")
        return undefined
} else if (message.content.startsWith(`${PREFIX}resume`)) {
        if(!message.member.voice.channel) return message.channel.send("Tu dois être dans un salon vocale pour utiliser la commande resume !")
        if(!serverQueue) return message.channel.send("There is notihing playing !")
        if(!serveurQueue.playing) return message.channel.send("La musique est déjà en cours !")
        serverQueue.playing = true
        serverQueue.connection.dispatcher.resume()
        message.channel.send("J'ai resumer la musique pour toi !")
        return undefined
    }
})
 
function play(guild, song) {
    const serverQueue = queue.get(guild.id)
 
    if(!song) {
        serverQueue.voiceChannel.leave()
        queue.delete(guild.id)
        return
    }
 
    const dispatcher = serverQueue.connection.play(ytdl(song.url))
    .on('finish', () => {
        serverQueue.songs.shift(
         play(guild, serverQueue.songs[0])  
        )
    })
    .on('error', error => {
        console.log(error)
    })
    dispatcher.setVolumeLogarithmic(serverQueue.volume / 5)
 
    serverQueue.textChannel.send(`Son jouer: *${song.title}**`)
}
 
client.login("MONTOKEN")