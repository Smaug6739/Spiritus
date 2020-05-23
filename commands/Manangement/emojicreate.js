const { MessageEmbed } = require("discord.js") 
module.exports.run = async (client, message, args) => {
  let { FALSE } = require('../../configstyle');

  if(message.member.hasPermission('MANAGE_EMOJIS')){

    if(!message.content.includes('http') || args[1]=='undefined') return message.channel.send('une erreur s\'est produite assurez vous d\'utiliser correctement la commande :wink:')
   const embed = new MessageEmbed()
   .setTitle('Emoji create')
   .setThumbnail(args[0])
   .setColor(0x00FF00)
   .addFields(
    { name: 'Nom :', value: `${args[1]}`, inline: true },
    { name: 'Emoji URL :', value: `${args[0]}`, inline: true }
   )
   .setTimestamp()
   .setFooter('BOT ID : 689210215488684044', `${message.guild.iconURL()}`);
   message.guild.emojis.create(args[0], args[1])
  .then(emoji => /*console.log(`Created new emoji with name ${emoji.name}!`)*/ message.channel.send(embed))
  .catch(console.error);

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
