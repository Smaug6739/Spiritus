const { MessageEmbed } = require("discord.js");
module.exports.run = async (client, interaction, args) => {
  try {
    const argUser = client.getArg(args, 'user')
    const user = await client.users.fetch(argUser);
    if (!user)
      return interaction.replyErrorMessage(`User not found.`);
    await interaction.guild.members.unban(user)
      .catch(() => { interaction.replyErrorMessage('This user isn\'t ban.') })
    const embed = new MessageEmbed()
      .setAuthor(`${user.username} (${user.id})`, user.avatarURL())
      .setColor(`${client.config.color.ROUGE}`)
      .setDescription(`**Action**: unban`)
      .setTimestamp()
      .setFooter(interaction.user.username, interaction.user.avatarURL());
    interaction.reply(embed);
  } catch (e) {
    if (e.message.match("Unknown User")) return interaction.replyErrorMessage(`User not found.`);
    else return interaction.replyErrorMessage(`An error has occurred. Please try again.`);
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
  args: [
    {
      name: 'user',
      description: 'User for unban',
      type: 'STRING',
      required: true
    },
  ],
  userPermissions: [],
  botPermissions: ['BAN_MEMBERS'],
  subcommands: [],
};
