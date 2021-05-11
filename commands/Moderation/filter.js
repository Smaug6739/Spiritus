const { MessageEmbed } = require('discord.js')
module.exports.run = async (client, interaction, args, settings) => {

  switch (args[0].subcommand) {
    case 'add':
      const wordToAdd = client.getArg(args, 'word')
      settings.filter.push(wordToAdd);
      await settings.save();
      interaction.replySuccessMessage(`This word is now forbidden on the server.`);
      break;
    case 'rem':
      if (!interaction.member.permissions.has('MANAGE_GUILD')) return interaction.replyErrorMessage(`You need manage server permission for use this command.`);
      const wordToRemove = client.getArg(args, 'word')
      if (!settings.filter.includes(wordToRemove)) return interaction.replyErrorMessage(`This word is not in the list.`);
      const index = settings.filter.indexOf(wordToRemove);
      settings.filter.splice(index, 1);
      await settings.save();
      interaction.replySuccessMessage(`The word \`${wordToRemove}\` is now allowed.`);
      break;

    case 'list':
      if (!settings.filter || settings.filter.length < 1) return interaction.replyErrorMessage(`There are no forbidden words for this server. To add it use the command \`${settings.prefix}filter add <mot>\``)
      if (!interaction.member.permissions.has('MANAGE_GUILD')) return interaction.replyErrorMessage(`You need manage server permission for use this command.`);
      const embed = new MessageEmbed()
        .setTitle(`List of words in blacklist of this guild**${interaction.guild.name}** | ${settings.filter.length} total`)
        .setThumbnail(interaction.guild.iconURL() ? interaction.guild.iconURL() : '')
        .setColor(client.config.color.EMBEDCOLOR)
        .setDescription(`\`${settings.filter.join('\`, \`')}\``)
        .setFooter('Command module: Moderation')
        .setTimestamp()
      interaction.reply(embed);
      break;
  }
};

module.exports.help = {
  name: "filter",
  aliases: ['filter'],
  category: 'moderation',
  description: "Forbidden words on the server.",
  cooldown: 10,
  usage: '<word>',
  exemple: ["filter fck"],
  isUserAdmin: false,
  moderator: true,
  args: null,
  userPermissions: [],
  botPermissions: [],
  subcommands: [
    {
      name: 'add',
      description: 'Add word to the blacklist',
      usage: '<word>',
      args: [
        {
          name: 'word',
          description: 'Word to add to the blacklist',
          type: 'STRING',
          required: true
        },
      ],
      exemples: ['bad_word']
    },
    {
      name: 'rem',
      description: 'Remove word to the blacklist',
      usage: '<word>',
      args: [
        {
          name: 'word',
          description: 'Word to remove to the blacklist',
          type: 'STRING',
          required: true
        },
      ],
      exemples: ['bad_word']
    },
    {
      name: 'list',
      description: 'View blacklist',
      usage: '',
      args: null,
      exemples: []
    },
  ]
};



