const { MessageEmbed } = require("discord.js");
module.exports.run = async (client, message, args) => {

  switch (args[0].subcommand) {
    case 'channel':
      message.channel.clone().then(message.channel.delete())
      break;
    case 'messages':
      const messagesToDelete = await message.channel.messages.fetch({
        limit: Math.min(client.getArg(args, 'testname'), 100),
        before: message.id
      });
      message.channel.bulkDelete(messagesToDelete)
        .then(() => {
          message.reply(new MessageEmbed()
            .setAuthor(message.user.username, message.user.avatarURL())
            .setColor(`${client.config.color.ROUGE}`)
            .setDescription(`**Action**: purge\n**Messages**: ${client.getArg(args, 'testname')}\n**Channel**: ${message.channel}`)
          ).then(() => {
            setTimeout(function () {
              message.deleteReply()
            }, 3000)
          })
        })
        .catch((err) => {
          if (err.message.match('You can only bulk delete messages that are under 14 days old')) message.channel.sendErrorMessage(`You cannot delete messages older than 14 days.`)
          else message.channel.sendErrorMessage(`An error occurred. Please try again.`)
          console.error(err)
        })
      break;
    case 'user':
      const argUser = client.getArg('user');
      const argNumber = client.getArg('number')
      let user = await client.resolveMember(message.guild, argUser)
      if (isNaN(argNumber) || (argNumber < 1 || argNumber > 100)) return message.channel.sendErrorMessage(`You must specify a number between 1 and 100.`);
      const messagesOfUser = (await message.channel.messages.fetch({
        limit: 100,
        before: message.id,
      })).filter(a => a.author.id === user.id).array();
      messagesOfUser.length = Math.min(argNumber, messagesOfUser.length);
      if (messagesOfUser.length === 0 || !user) return message.channel.sendErrorMessage(`No message to delete`);
      if (messagesOfUser.length === 1) await messagesOfUser[1].delete();
      else await message.channel.bulkDelete(messagesOfUser);
      message.delete();
      const embedLogs = new MessageEmbed()
        .setAuthor(message.author.username, message.author.avatarURL())
        .setColor(`${client.config.color.ROUGE}`)
        .setDescription(`**Action**: prune\n**Messages**: ${argNumber}\n**User**: ${user}`)
      message.reply(embedLogs);
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
      usage: '',
      args: [],
      exemples: []
    },
    {
      name: 'messages',
      description: 'Delete messages in a channel',
      usage: '<number_messages>',
      args: [
        {
          name: 'number',
          description: 'Number of messages',
          type: 'STRING',
          required: true
        }
      ],
      exemples: ['5', '25']
    },
    {
      name: 'user',
      description: 'Fully purge a channel',
      usage: '<@user> <number_messages>',
      args: [
        {
          name: 'user',
          description: 'User',
          type: 'STRING',
          required: true
        },
        {
          name: 'number',
          description: 'Number of messages',
          type: 'STRING',
          required: true
        }
      ],
      exemples: ['@Smaug 25', '710759495483129876 69']
    }
  ]
};