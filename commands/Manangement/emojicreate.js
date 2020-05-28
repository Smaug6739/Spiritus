const { MessageEmbed } = require("discord.js") 
module.exports.run = async (client, message, args) => {
  let { FALSE } = require('../../configstyle');
  if(!message.guild.me.hasPermission('MANAGE_EMOJIS')) return message.channel.send(`${FALSE}Je n'ai pas la permission de gérer les emojis.`);


  if(message.member.hasPermission('MANAGE_EMOJIS')){

      if(message.attachments.first()){
            //if(args[0].includes('-'))return message.reply('Le nom de l\'emoji n\'est pas valide.')
            let nom_emoji = args[0]
            if(nom_emoji.length < 2) return message.channel.send(`${FALSE}Le nom de l'emoji doit contenir au moins 2 caractères`)
            const embed = new MessageEmbed()
            .setTitle('Emoji create')
            .setThumbnail(message.attachments.first().url)
            .setColor(0x00FF00)
            .addFields(
            { name: 'Nom :', value: `${nom_emoji}`, inline: true },
            { name: 'Emoji URL :', value: `${message.attachments.first().url}`, inline: true }
            )
            .setTimestamp()
            .setFooter('BOT ID : 689210215488684044', `${message.guild.iconURL()}`);
          await  message.guild.emojis.create(message.attachments.first().url, nom_emoji)
          .then(emoji => /*console.log(`Created new emoji with name ${emoji.name}!`)*/ message.channel.send(embed))
          .catch(console.error);

      }else{

        if(!args[0].includes('http')) return message.channel.send(`${FALSE}Une erreur s\'est produite assurez vous d\'utiliser correctement la commande`)
        if(!args[1]) return message.channel.send(`${FALSE}Veuillez spécifier un nom à votre emoji.`)
        let nom_emoji = args[1]
        if(nom_emoji.length < 2) return message.channel.send(`${FALSE}Le nom de l'emoji doit contenir au moins 2 caractères`)
        const embed = new MessageEmbed()
        .setTitle('Emoji create')
        .setThumbnail(args[0])
        .setColor(0x00FF00)
        .addFields(
        { name: 'Nom :', value: `${nom_emoji}`, inline: true },
        { name: 'Emoji URL :', value: `${args[0]}`, inline: true }
        )
        .setTimestamp()
        .setFooter('BOT ID : 689210215488684044', `${message.guild.iconURL()}`);
        message.guild.emojis.create(args[0], nom_emoji)
      .then(emoji => /*console.log(`Created new emoji with name ${emoji.name}!`)*/ message.channel.send(embed))
      .catch(console.error);

      }    

  }else{
    return message.channel.send(`${FALSE}Vous devez avoir la permission de gérer les emojis pour utiliser cette commande !`)
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
