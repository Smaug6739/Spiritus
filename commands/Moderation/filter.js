module.exports.run = async (client, message, args, settings) => {

  switch (args[0].toLowerCase()) {
    case 'add':
      if (!message.member.permissions.has('MANAGE_GUILD')) return message.channel.sendErrorMessage(`You need manage server permission for use this command.`);
      const wordToAdd = args[1]
      if (!wordToAdd) return message.channel.sendErrorMessage(`Please indicate a word to add to the list.`)
      settings.filter.push(wordToAdd);
      await settings.save();
      message.channel.sendSuccessMessage(`This word is now forbidden on the server.`);
      break;
    case 'rem':
      if (!message.member.permissions.has('MANAGE_GUILD')) return message.channel.sendErrorMessage(`You need manage server permission for use this command.`);
      const wordToRemove = args[1]
      if (!args[1]) return message.channel.sendErrorMessage(`Please indicate the word to delete from the list.`)
      if (!settings.filter.includes(wordToRemove)) return message.channel.sendErrorMessage(`This word is not in the list.`);
      const index = settings.filter.indexOf(wordToRemove);
      settings.filter.splice(index, 1);
      await settings.save();
      message.channel.sendSuccessMessage(`The word \`${wordToRemove}\` is now allowed.`);
      break;

    case 'list':
      if (!settings.filter || settings.filter.length < 1) return message.channel.sendErrorMessage(`There are no forbidden words for this server. To add it use the command \`${settings.prefix}filter add <mot>\``)
      if (!message.member.permissions.has('MANAGE_GUILD')) return message.channel.sendErrorMessage(`You need manage server permission for use this command.`);
      let embed = {
        title: `List of words in blacklist of this guild**${message.guild.name}** | ${settings.filter.length} total`,
        thumbnail: {
          url: `${message.guild.iconURL()}`,
        },
        color: `${client.config.color.EMBEDCOLOR}`,
        description: null,
        fields: []
      };
      embed.description = `${settings.filter.join(', ')}`;
      message.channel.send({ embed });
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
  permissions: true,
  args: false,
  subcommands: [
    {
      name: 'add',
      description: 'Add word to the blacklist',
      usage: '<word>',
      args: true,
      exemples: ['bad_word']
    },
    {
      name: 'rem',
      description: 'Remove word to the blacklist',
      usage: '<word>',
      args: true,
      exemples: ['bad_word']
    },
    {
      name: 'list',
      description: 'View blacklist',
      usage: '',
      args: false,
      exemples: []
    },
  ]
};



