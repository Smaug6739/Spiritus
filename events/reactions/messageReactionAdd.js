module.exports = async (client, messageReaction, user) => {
  const message = messageReaction.message;
  const member = message.guild.members.cache.get(user.id);
  const emoji = messageReaction.emoji.name;
  const emojiID = messageReaction.emoji.id;
  if (!member) return;
  if (!member.user) return;
  if (member.user.bot) return;
  const settings = await client.getGuild(message.guild);
  settings.reactionroles.forEach(element => {
    if (element.messageID === `${message.id}` && element.channelID === `${message.channel.id}`) {
      if (element.emoji == `${emojiID}` || element.emoji == `${emoji}`) {
        let roleToAdd = message.guild.roles.cache.get(`${element.roleID}`)
        if (message.guild.me.roles.highest.comparePositionTo(roleToAdd) <= 0) return;
        member.roles.add(roleToAdd)
      }
    }
  })

}