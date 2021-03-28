const { MessageEmbed } = require("discord.js");
module.exports.run = async (client, message, args) => {
  if (!message.guild.me.permissions.has("BAN_MEMBERS")) return message.channel.send(`${client.config.emojis.FALSE}Je n'ai pas la permission pour unban un utilisateur.`);
  try {
    let user = await client.users.fetch(args[0]);
    if (!user)
      return message.channel.send(
        `${client.config.emojis.FALSE}Je n'ai pas trouver cet utilisateur.`
      );
    message.guild.members.unban(user);
    const embed = new MessageEmbed()
      .setAuthor(`${user.username} (${user.id})`, user.avatarURL())
      .setColor(`${client.config.color.ROUGE}`)
      .setDescription(`**Action**: unban`)
      .setTimestamp()
      .setFooter(message.author.username, message.author.avatarURL());
    message.channel.send(embed);
  } catch (e) {
    if (e.message.match("Unknown User"))
      return message.channel.send(
        `${client.config.emojis.FALSE}Je n'ai pas trouver cette personne.`
      );
    else
      return message.channel.send(
        `${client.config.emojis.FALSE}Une erreur s'est produite. Merci de réessayer.`
      );
  }
};

module.exports.help = {
  name: "unban",
  aliases: ["unban"],
  category: "moderation",
  description: "Unban un utilisateur.",
  cooldown: 10,
  usage: "<user_id>",
  exemple: ["unban 611468402263064577"],
  isUserAdmin: false,
  permissions: true,
  args: true,
  sousCommdandes: [],
};
