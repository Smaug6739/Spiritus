const { MessageEmbed } = require("discord.js");
const {EMBED} = require('../../configstyle')
module.exports.run = (client, message, args) => {
  const embed = new MessageEmbed()
    .setColor(`${EMBED}`)
    .setAuthor(`${client.user.username} Info`, client.user.avatarURL())
    .addFields(
      { name: 'Developpeur', value: `Smaug#6739`, inline: true },
      { name: 'Mémoire', value: `${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB`, inline: true },
      { name: 'Uptime', value: `${Math.floor(client.uptime / 1000 / 60).toString()} minutes`, inline: true },
      //{ name: '\u200b', value: `\u200b`, inline: true },
      { name: 'Serveurs', value: `${client.guilds.cache.size.toString()}`, inline: true },
      { name: 'Salons', value: `${client.channels.cache.size.toString()}`, inline: true },
      { name: 'Utilisateurs', value: `${client.guilds.cache.map(g => g.memberCount).reduce((a, b) => a + b)}`, inline: true },
      { name: 'Version', value: `1.0.0`, inline: true },
      { name: 'Librairie ', value: `discord.js (javascript)`, inline: true },

      { name: 'Support', value: `[Serveur support ](https://discord.gg/TC7Qjfs)`, inline: true },
      { name: 'Invitation :', value: `[Invite](https://discordapp.com/oauth2/authorize?client_id=689210215488684044&scope=bot&permissions=1946446974)`, inline: true }

    );

		message.channel.send(embed);
};
module.exports.help = {
     
    name : 'botinfo',
    aliases : ['botinfo'],
    category : 'misc',
    description : 'Donne des informations sur le bot.',
    cooldown : 10,
    usage : '',
    exemple :[""],
    isUserAdmin: false,
    permissions : false,
    args : false
}