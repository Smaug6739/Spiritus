const { MessageEmbed } = require("discord.js") 
module.exports.run = async (client, message, args) => {
    
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



   
}
module.exports.help = {
    
    name : 'emoji-create',
    aliases : ['emoji-cre'],
    category : 'misc',
    description : 'Crée un emoji',
    cooldown : 5,
    usage : 'emojicreate https://url-img.png name',
    exemple :["emojicreate url_img name"],
    permissions : false,
    isUserAdmin: false,
    args : true
}
