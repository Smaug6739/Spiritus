const { MessageEmbed } = require("discord.js");

module.exports = async(client, member) => {
  let { VERTCLAIRE } = require('../../configstyle');
    const embed = new MessageEmbed()
    .setAuthor(`${member.displayName} (${member.id})`, member.user.displayAvatarURL())
    .setColor(`${client.config.color.VERT}`)
    .setTitle('Member add')
    .setAuthor('Module d\'evenement', 'https://french-gaming-family.fr/public/spiritusavatar.png')
    .setDescription("**" + member.displayName +"** vient de nous rejoindre. Amuse toi bien !")
    .setThumbnail(member.user.displayAvatarURL())
    .setFooter("Un utilisateur a rejoint")
    .setTimestamp();
    client.channels.cache.get('710763508425424897').send(embed);
    const settings = await client.getGuild(member.guild);

    if(settings.serveurstats){
      const logs = await member.guild.channels.cache.find(c => c.name.startsWith("All Members : "))
      if(!logs)return await member.guild.channels.create(`All Members : ${member.guild.memberCount}`, {type : "voice"}) 
      
     logs.setName(`All Members : ${member.guild.memberCount}`)
    }
    



  const newUser = {
    guildID: member.guild.id,
    guildName: member.guild.name,
    userID: member.id,
    username: member.user.tag,
  }
  //await client.createUser(newUser);
}