module.exports.run = async (client, message, args) => {
  let utilisateur = await client.resolveMember(message.guild, args[0])
  if (utilisateur == undefined) return message.channel.sendErrorMessage(`User not found.`)
  let newName = args.slice(1).join(" ");
  if (newName.length > 15) return message.channel.sendErrorMessage(`The nickname is too long.`)
  if (newName.length < 2) return message.channel.sendErrorMessage(`The nickname is too short.`)
  utilisateur.setNickname(newName)
    .then(message.channel.sendSuccessMessage(`I have updated the nickname of the user ${utilisateur}.`))

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
  moderator: true,
  args: true,
  userPermissions: [],
  botPermissions: ['MANAGE_NICKNAMES'],
  subcommands: []
};