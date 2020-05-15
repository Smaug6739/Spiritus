const { MessageEmbed } = require("discord.js");

module.exports.run = (client, message, args) => {
  const lapinRole = message.guild.roles.cache.get("710856300061393009");
  const wahRole = message.guild.roles.cache.get("710856300979945553");
  //const lapinEmoji = message.guild.emojis.cache.get("👍");
  //const wahEmoji = message.guild.emojis.cache.get("👎");
  const lapinEmoji = "1️⃣";
  const wahEmoji = "2️⃣";

  const embed = new MessageEmbed()
    .setTitle("Rôles")
    .setDescription("Cliquez sur une des réactions ci-dessous pour obtenir le rôle correspondant")
    .setColor("#dc143c")
    .addField(
      "Les rôles disponibles:",
      `
      ${lapinEmoji} - ${lapinRole.toString()}
      ${wahEmoji} - ${wahRole.toString()}
      `
    );

    client.channels.cache.get('710840240570368053').send(embed).then(async msg => {
      await msg.react(lapinEmoji);
      await msg.react(wahEmoji);
    })
};

module.exports.help = {
  name: "allroles",
  aliases: ['allroles'],
  category: 'reactions',
  description: "Renvoie un message avec des réactions!",
  cooldown: 10,
  usage: '',
  permissions: true,
  isUserAdmin: false,
  args: false
};