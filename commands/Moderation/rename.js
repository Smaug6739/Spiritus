module.exports.run = async (client, interaction, args) => {
  const argMember = client.getArg(args, 'user')
  const argNewName = client.getArg(args, 'new_name')
  const member = await client.resolveMember(interaction.guild, argMember)
  if (member == undefined) return interaction.replyErrorMessage(`User not found.`)
  if (argNewName.length > 15) return interaction.replyErrorMessage(`The nickname is too long.`)
  if (argNewName.length < 2) return interaction.replyErrorMessage(`The nickname is too short.`)
  await member.setNickname(argNewName)
    .catch((err) => {
      console.log(err)
      interaction.replyErrorMessage(`An error has occurred. Please try again.`)
    })
  interaction.replySuccessMessage(`I have updated the nickname of the user ${member}.`)

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
  args: [
    {
      name: 'user',
      description: 'User to change',
      type: 'STRING',
      required: true
    },
    {
      name: 'new_name',
      description: 'New username',
      type: 'STRING',
      required: true
    },
  ],
  userPermissions: [],
  botPermissions: ['MANAGE_NICKNAMES'],
  subcommands: []
};