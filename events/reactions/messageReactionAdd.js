//module.exports = (client, messageReaction, user) => {
    /*const message = messageReaction.message;
    const member = message.guild.members.cache.get(user.id);
    const emoji = messageReaction.emoji.name;
    const channel = message.guild.channels.cache.find(c => c.id === '710763401902686250');
    const lapinRole = message.guild.roles.cache.get("710856300061393009");
    const wahRole = message.guild.roles.cache.get("710856300979945553");
    const truer = message.guild.roles.cache.get("711965683709378560");
    const falser = message.guild.roles.cache.get("711965685156413462");

    if (member.user.bot) return;
  
    if (["1️⃣", "2️⃣","👍","👎"].includes(emoji) && message.channel.id === channel.id) {
      switch (emoji) {
        case "1️⃣":
          member.roles.add(lapinRole);
          message.channel.send(`Le rôle ${lapinRole.name} a été ajouté avec succès!`);
          break;
        case "2️⃣":
          member.roles.add(wahRole);
          message.channel.send(`Le rôle ${wahRole.name} a été ajouté avec succès!`);
          break;
          case "👍":
          member.roles.add(truer);
          message.channel.send(`Le rôle ${truer.name} a été ajouté avec succès!`);
          break;
          case "👎":
          member.roles.add(falser);
          message.channel.send(`Le rôle ${falser.name} a été ajouté avec succès!`);
          break;
      };
    }*/
 // }








  module.exports = async (client, messageReaction, user) => {
    const message = messageReaction.message;
    const member = message.guild.members.cache.get(user.id);
    const emoji = messageReaction.emoji.name;
    const channel = message.guild.channels.cache.find(c => c.id === '708593997890977823');
    const roleun = message.guild.roles.cache.get("713757081966215269");
    const roledeux = message.guild.roles.cache.get("713757111678664845");
    if (member.user.bot) return;
  
    if (messageReaction.partial) {
      await messageReaction.fetch();
      return;
    }
  
    if (["1️⃣", "2️⃣"].includes(emoji) && message.channel.id === channel.id) {
      switch (emoji) {
        case "1️⃣":
          member.roles.add(roleun);
          message.channel.send(`Le rôle ${roleun.name} a été ajouté avec succès!`);
          break;
        case "2️⃣":
          member.roles.add(roledeux);
          message.channel.send(`Le rôle ${roledeux.name} a été ajouté avec succès!`);
          break;
      };
    };
  
    if (emoji === "🟥") message.delete();
    if (emoji === "🟦") message.reactions.removeAll();
    if (emoji === "🟩") message.channel.send(`Reaction : 🟩`);
  }