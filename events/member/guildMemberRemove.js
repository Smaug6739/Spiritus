const { MessageEmbed } = require("discord.js");

module.exports = async(client, member) => {
  let { ROUGE } = require('../../configstyle');
    const embed = new MessageEmbed()
    .setColor(`${client.config.color.ROUGE}`)
    .setTitle('Member left')
    .setAuthor('Module d\'evenement', 'https://french-gaming-family.fr/public/spiritusavatar.png')
    .setDescription("**" + member.displayName +"** vient de nous quitter. A bientôt l'ami ! :wave:")
    //.setImage()
    .setThumbnail(member.user.displayAvatarURL())
    .setTimestamp()
    .setFooter('Smaug devellopers officiels du BOT', 'https://french-gaming-family.fr/public/logoFGF.png');
  client.channels.cache.get('710763508425424897').send(embed);
  const settings = await client.getGuild(member.guild);

  if(settings.serveurstats){
    const logs = await member.guild.channels.cache.find(c => c.name.startsWith("All Members : "))
    if(!logs)return await member.guild.channels.create(`All Members : ${member.guild.memberCount}`, {type : "voice"}) 
    
   logs.setName(`All Members : ${member.guild.memberCount}`)
  }
}
