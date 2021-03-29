module.exports.run = async (client, message, args) => {
  if (!message.guild.me.permissions.has('MANAGE_NICKNAMES')) return message.channel.send(`${client.config.emojis.error}I don't have permission to rename users.`);

  let utilisateur = await client.resolveMember(message.guild, args[0])
  if (utilisateur == undefined) return message.channel.send(`${client.config.emojis.error}User not found.`)
  let newName = args.slice(1).join(" ");
  if (newName.length > 15) return message.channel.send(`${client.config.emojis.error}The nickname is too long.`)
  if (newName.length < 2) return message.channel.send(`${client.config.emojis.error}The nickname is too short.`)
  utilisateur.setNickname(newName)
    .then(message.channel.send(`${client.config.emojis.success}I have updated the nickname of the user ${utilisateur}.`))

};

module.exports.help = {
  name: "rename",
  aliases: ['rename', 'rname'],
  category: 'moderation',
  description: "Change nickname of user.",
  cooldown: 10,
  usage: '<user> <new_name>',
  exemple: ["rename @Smaug Smaug6739"],
  isUserAdmin: false,
  permissions: true,
  args: true,
  subcommands: []
};