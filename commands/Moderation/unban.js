const { MessageEmbed } = require("discord.js");
module.exports.run = async (client, message, args) => {
  try {
    let user = await client.users.fetch(args[0]);
    if (!user)
      return message.channel.send(`${client.config.emojis.error}User not found.`);
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
        `${client.config.emojis.error}User not found.`
      );
    else
      return message.channel.send(`${client.config.emojis.error}An error has occurred. Please try again.`);
  }
};

module.exports.help = {
  name: "unban",
  aliases: ["unban"],
  category: "moderation",
  description: "Unban a user.",
  cooldown: 10,
  usage: "<user_id>",
  exemple: ["unban 611468402263064577"],
  isUserAdmin: false,
  moderator: true,
  args: true,
  userPermissions: [],
  botPermissions: ['BAN_MEMBERS'],
  subcommands: [],
};
