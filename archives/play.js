const ytdl = require('ytdl-core')
module.exports.run =async(client, message, args) => { 
    const  voiceChannel  = message.member.voice.channel;
    const  voiceChannelMe  = message.guild.me.voice.channel;
    if (!voiceChannel)return message.channel.send("Vous devez être dans un salon vocal pour utiliser cette commande.");
    if (voiceChannelMe)return console.log("Je suis déja dans un salon vocal.")
    if(!args[0]) return message.channel.send('Merci de préciser un lien youtube.')
    const valide = await ytdl.validateURL(args[0])
    if(!valide) return message.channel.send("Le lien n'est pas valide.")
    const info = await ytdl.getInfo(args[0])
  console.log(info)
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

