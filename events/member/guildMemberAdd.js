const { MessageEmbed } = require("discord.js");

module.exports = (client, member) => {
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
}