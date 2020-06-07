const { MessageEmbed } = require("discord.js");

module.exports = async(client, member) => {
  let { VERTCLAIRE } = require('../../configstyle');

  const embed = new MessageEmbed()
    .setAuthor(`${member.displayName} (${member.id})`, member.user.displayAvatarURL())
    .setColor(`${VERTCLAIRE}`)
    .setTitle('Member add')
    .setAuthor('Module d\'evenement', 'https://french-gaming-family.fr/public/spiritusavatar.png')
    .setDescription("**" + member.displayName +"** vient de nous rejoindre. Amuse toi bien !")
    .setThumbnail(member.user.displayAvatarURL())
    .setFooter("Un utilisateur a rejoint")
    .setTimestamp();
    client.channels.cache.get('710763508425424897').send(embed);
    const settings = await client.getGuild(member.guild);

    if(settings.serveurstats){
      const logs = member.guild.channels.cache.find(c => c.name.startsWith("All Members :"))
      if(!logs){
      await member.guild.channels.create('All Members :', {type : "voice"})
      }else{
        //console.log('Il doit mettre a jour')
        try{
        await member.guild.channels.cache.find(c => c.name.startsWith("All Members :")).setName(`All Members : ${member.guild.memberCount}`)
        }catch(err){console.log(err)}

      }
    }



  const newUser = {
    guildID: member.guild.id,
    guildName: member.guild.name,
    userID: member.id,
    username: member.user.tag,
  }
  //await client.createUser(newUser);
}