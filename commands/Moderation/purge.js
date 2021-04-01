const { MessageEmbed } = require("discord.js");
module.exports.run = async (client, message, args) => {

  switch (args[0].toLowerCase()) {
    case 'channel':
      message.channel.clone().then(message.channel.delete())
      break;
    case 'messages':
      if (isNaN(args[1]) || (args[1] < 1 || args[1] > 100)) return message.channel.sendErrorMessage(` Please give a valid number.`)
      const messagesToDelete = await message.channel.messages.fetch({
        limit: Math.min(args[1], 100),
        before: message.id
      });
      message.delete();
      message.channel.bulkDelete(messagesToDelete)
        .then(() => {
          message.channel.send(new MessageEmbed()
            .setAuthor(message.author.username, message.author.avatarURL())
            .setColor(`${client.config.color.ROUGE}`)
            .setDescription(`**Action**: purge\n**Messages**: ${args[1]}\n**Channel**: ${message.channel}`)
          ).then(m => {
            setTimeout(function () {
              m.delete()
            }, 3000)
          })
        })
        .catch((err) => {
          if (err.message.match('You can only bulk delete messages that are under 14 days old')) message.channel.sendErrorMessage(`You cannot delete messages older than 14 days.`)
          else message.channel.sendErrorMessage(`An error occurred. Please try again.`)
        })
      break;
    case 'user':
      let user = await client.resolveMember(message.guild, args[1])
      if (isNaN(args[2]) || (args[2] < 1 || args[2] > 100)) return message.channel.sendErrorMessage(`You must specify a number between 1 and 100.`);
      const messagesOfUser = (await message.channel.messages.fetch({
        limit: 100,
        before: message.id,
      })).filter(a => a.author.id === user.id).array();
      messagesOfUser.length = Math.min(args[1], messagesOfUser.length);
      if (messagesOfUser.length === 0 || !user) return message.channel.sendErrorMessage(`No message to delete`);
      if (messagesOfUser.length === 1) await messagesOfUser[1].delete();
      else await message.channel.bulkDelete(messagesOfUser);
      message.delete();
      const embedLogs = new MessageEmbed()
        .setAuthor(message.author.username, message.author.avatarURL())
        .setColor(`${client.config.color.ROUGE}`)
        .setDescription(`**Action**: prune\n**Messages**: ${args[1]}\n**User**: ${user}`)
      message.channel.send(embedLogs);
      break;
  }
};

module.exports.help = {
  name: "purge",
  aliases: ['purge'],
  category: 'moderation',
  description: "Delete messages.",
  cooldown: 10,
  usage: '<nb_messages>',
  exemple: ["purge 50"],
  isUserAdmin: false,
  moderator: true,
  args: false,
  userPermissions: [],
  botPermissions: ['MANAGE_MESSAGES'],
  subcommands: [
    {
      name: 'channel',
      description: 'Fully purge a channel',
      usage: '<channel>',
      args: 1,
      exemples: ['#channel', '710759495483129876']
    },
    {
      name: 'messages',
      description: 'Delete messages in a channel',
      usage: '<number_messages>',
      args: 1,
      exemples: ['5', '25']
    },
    {
      name: 'user',
      description: 'Fully purge a channel',
      usage: '<@user> <number_messages>',
      args: 1,
      exemples: ['@Smaug 25', '710759495483129876 69']
    }

  ]
};