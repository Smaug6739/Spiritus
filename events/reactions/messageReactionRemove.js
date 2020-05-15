module.exports = (client, messageReaction, user) => {
    const message = messageReaction.message;
    const member = message.guild.members.cache.get(user.id);
    const emoji = messageReaction.emoji.name;
    const channel = message.guild.channels.cache.find(c => c.id === '710840240570368053');
    const lapinRole = message.guild.roles.cache.get("710856300061393009");
    const wahRole = message.guild.roles.cache.get("710856300979945553");
    if (member.user.bot) return;
  
    if (["1️⃣", "2️⃣"].includes(emoji) && message.channel.id === channel.id) {
      switch (emoji) {
        case "1️⃣":
          member.roles.remove(lapinRole);
          message.channel.send(`Le rôle ${lapinRole.name} a été supprimé avec succès!`);
          break;
        case "2️⃣":
          member.roles.remove(wahRole);
          message.channel.send(`Le rôle ${wahRole.name} a été supprimé avec succès!`);
          break;
      };
    };
  }