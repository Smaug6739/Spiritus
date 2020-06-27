const { MessageEmbed } = require("discord.js") 
module.exports.run = async (client, message, args) => {
    let { FALSE,FLECHE } = require('../../configstyle');
    if(!message.guild.me.hasPermission('MANAGE_EMOJIS')) return message.channel.send(`${FALSE}Je n'ai pas la permission de gérer les emojis.`);
    if(!message.member.hasPermission('MANAGE_EMOJIS'))return message.channel.send(`${FALSE}Vous devez avoir la permission de gérer les emojis pour utiliser cette commande !`)
    if(args[0].toLowerCase() === 'create'){
            if(!args[1]) return message.channel.send(`${FALSE}Merci de d'incure le nom du nouvel emoji et son nom.`)
            if(args[1].includes('-')||args[1].includes('/')||args[1].includes('/')||args[1].includes('+')||args[1].includes('*')||args[1].includes('(')||args[1].includes(')')||args[1].includes('[')||args[1].includes(']')||args[1].includes('{')||args[1].includes('}')||args[1].includes('#')||args[1].includes('~')||args[1].includes('@')||args[1].includes('&')||args[1].includes('^')||args[1].includes('$')||args[1].includes('€')||args[1].includes('°')||args[1].includes('%')||args[1].includes('£')||args[1].includes(',')||args[1].includes('<')||args[1].includes('>')) return message.channel.send(`${FALSE}Le nom de l'emoji n'est pas valide`);
            let nomEmoji = args[1]
            if(message.attachments.first()) emoji = message.attachments.first().url
            else emoji = args[2]
            if(!message.attachments.first() && !args[2]) return message.channel.send(`${FALSE} Veuillez indiquer un lien ou uploader l'image de l'emoji.`);
            if(!message.attachments.first() && !args[2].includes('http'||'https'&&'.png'||'.gif'||'.jpg'||'jpeg'))return message.channel.send(`${FALSE}Le lien n'est pas valide.Merci de spécifier le lien d'une image`);
            if(nomEmoji.length < 2) return message.channel.send(`${FALSE}Le nom de l'emoji doit contenir au moins 2 caractères`);
            if(nomEmoji.length > 35) return message.channel.send(`${FALSE}Le nom de l'emoji doit contenir 35 caractères maximum`);
            const embed = new MessageEmbed()
            embed.setTitle('Emoji create')
            embed.setThumbnail(emoji)
            embed.setColor(0x00FF00)
            embed.addFields(
            { name: 'Nom :', value: `${nomEmoji}`, inline: true },
            { name: 'Emoji URL :', value: `${emoji}`, inline: true })
            embed.setTimestamp()
            embed.setFooter('BOT ID : 689210215488684044', `${message.guild.iconURL()}`);
            try{            
              await  message.guild.emojis.create(emoji, nomEmoji).then(message.channel.send(embed));
            }catch(err){
              message.channel.send(`${FALSE}Une erreur s'est produite merci de ressayer`);
              client.channels.cache.get('725251200660013136').send(`Une erreur sur la commande \`emoji-create\` s'est produite sur le serveur : ${message.guild.name}.\n\`ERREUR :\`\n\`\`\`xl\n${err}\`\`\``);
            }
    

    
      
    }
}
module.exports.help = {
    
    name : 'test',
    aliases : ['test'],
    category : 'misc',
    description : 'Permet de gérer les emojis du serveur.',
    cooldown : 5,
    usage : '<action> <args>',
    exemple :["emoji create lien Spiritus "],
    permissions : false,
    isUserAdmin: false,
    args : false,
    sousCommdandes : ["emojis liste","emojis create","emojis update","emoji delete"]

}
