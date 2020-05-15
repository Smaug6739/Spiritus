const { MessageEmbed } = require("discord.js");

module.exports = (client, member) => {

    const embed = new MessageEmbed()
    .setColor('#dc143c')
    .setTitle('Member left')
    .setAuthor('Module d\'evenement', 'https://french-gaming-family.fr/public/spiritusavatar.png')
    .setDescription("**" + member.displayName +"** vient de nous quitter. A bientôt l'ami ! :wave:")
    //.setImage()
    .setThumbnail(member.user.displayAvatarURL())
    .setTimestamp()
    .setFooter('Smaug devellopers officiels du BOT', 'https://french-gaming-family.fr/public/logoFGF.png');
  client.channels.cache.get('710763508425424897').send(embed);
}
