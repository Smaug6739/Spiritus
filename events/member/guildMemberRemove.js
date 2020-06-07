const { MessageEmbed } = require("discord.js");

module.exports = async(client, member) => {
  let { ROUGE } = require('../../configstyle');
    const embed = new MessageEmbed()
    .setColor(`${ROUGE}`)
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
    const logs = member.guild.channels.cache.find(c => c.name.startsWith("All Members :"))
    if(!logs){
    await member.guild.channels.create('All Members :', {type : "voice"})
    }else{
      
      console.log('Il doit mettre a jour')

      await member.guild.channels.cache.find(c => c.name.startsWith("All Members :")).setName(`All Members : ${member.guild.memberCount}`)

    }
  }
}
