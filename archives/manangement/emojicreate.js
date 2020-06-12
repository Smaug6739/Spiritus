const { MessageEmbed } = require("discord.js") 
module.exports.run = async (client, message, args) => {
  let { FALSE } = require('../../configstyle');
  if(!message.guild.me.hasPermission('MANAGE_EMOJIS')) return message.channel.send(`${FALSE}Je n'ai pas la permission de gérer les emojis.`);
  if(message.member.hasPermission('MANAGE_EMOJIS')){
    if(args[0].includes('-')||args[0].includes('/')||args[0].includes('/')||args[0].includes('+')||args[0].includes('*')||args[0].includes('(')||args[0].includes(')')||args[0].includes('[')||args[0].includes(']')||args[0].includes('{')||args[0].includes('}')||args[0].includes('#')||args[0].includes('~')||args[0].includes('@')||args[0].includes('&')||args[0].includes('^')||args[0].includes('$')||args[0].includes('€')||args[0].includes('°')||args[0].includes('%')||args[0].includes('£')||args[0].includes(',')||args[0].includes('<')||args[0].includes('>')) return message.channel.send(`${FALSE}Le nom de l'emoji n'est pas valide`);
    let nom_emoji = args[0]
    let emoji = '';
    if(message.attachments.first()){
      emoji = message.attachments.first().url
    }else{
      emoji = args[1]
    }
    if(!message.attachments.first() && !args[1]) return message.channel.send(`${FALSE}Une erreur s'est produite.Verifiez que vous utiliser correctement la commande.`);
    if(!message.attachments.first() && !args[1].includes('http'||'https'&&'.png'||'.gif'||'.jpg'||'jpeg'))return message.channel.send(`${FALSE}Le lien n'est pas valide.Merci de spécifier le lien d'une image`);
    if(nom_emoji.length < 2) return message.channel.send(`${FALSE}Le nom de l'emoji doit contenir au moins 2 caractères`);
    const embed = new MessageEmbed()
    embed.setTitle('Emoji create')
    embed.setThumbnail(emoji)
    embed.setColor(0x00FF00)
    embed.addFields({ name: 'Nom :', value: `${nom_emoji}`, inline: true },
    { name: 'Emoji URL :', value: `${emoji}`, inline: true })
    embed.setTimestamp()
    embed.setFooter('BOT ID : 689210215488684044', `${message.guild.iconURL()}`);
    //-------------------------------------CREATION EMOJI -----------------------------------------
    try{            
      await  message.guild.emojis.create(emoji, nom_emoji)
      .then(message.channel.send(embed));
      //.catch(console.error);

    }catch(err){
      message.channel.send(`${FALSE}Une erreur s'est produite merci de ressayer`);
      client.channels.cache.get('716327345975197879').send(`Une erreur sur la commande \`emoji-create\` s'est produite sur le serveur : ${message.guild.name}.\n\`ERREUR :\`\n\`\`\`xl\n${err}\`\`\``);
    }

  }else{
    return message.channel.send(`${FALSE}Vous devez avoir la permission de gérer les emojis pour utiliser cette commande !`);
  }

}
module.exports.help = {
    
    name : 'emoji-create',
    aliases : ['emoji-cre'],
    category : 'manangement',
    description : 'Crée un emoji',
    cooldown : 5,
    usage : 'emojicreate https://url-img.png name',
    exemple :["emojicreate url_img name"],
    permissions : false,
    isUserAdmin: false,
    args : true
}
