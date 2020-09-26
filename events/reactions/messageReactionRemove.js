module.exports = async (client, messageReaction, user) => {
  const message = messageReaction.message;
  const member = message.guild.members.cache.get(user.id);
  const emojiID = messageReaction.emoji.id;
  const emoji = messageReaction.emoji.name;
  const channel = message.guild.channels.cache.find(c => c.id === '708593997890977823');
  const roleun = message.guild.roles.cache.get("713757081966215269");
  const roledeux = message.guild.roles.cache.get("713757111678664845");
  const settings = await client.getGuild(message.guild);
  if (member.user.bot) return;
  settings.reactionroles.forEach(element => {

    if(element.messageID === `${message.id}` && element.channelID === `${message.channel.id}`){
      if(element.emoji == `${emojiID}`|| element.emoji == `${emoji}`){      //console.log(element)
        let roleToRem = message.guild.roles.cache.get(`${element.roleID}`)
        if(member.roles.highest.comparePositionTo(roleToRem) <= 0)return console.log(`Vous ne pouvez pas enlever un role superieur a votre role le plus haut.`);
        if(message.guild.me.roles.highest.comparePositionTo(roleToRem) <= 0) return console.log(`Je n'ai pas un role sufisant pour vous enlever ce role`)
        member.roles.remove(roleToRem)
      }
    }
   })
  //console.log('RR rem')
  /*const message = messageReaction.message;
  const member = await message.guild.members.cache.get(user.id);
  const emojiID = messageReaction.emoji.id;
  const emoji = messageReaction.emoji.name;
  const channel = message.guild.channels.cache.find(c => c.id === '708593997890977823');
  const roleun = message.guild.roles.cache.get("713757081966215269");
  const roledeux = message.guild.roles.cache.get("713757111678664845");
  const settings = await client.getGuild(message.guild);
 if(user.bot)
  console.log('OK remove')
  settings.reactionroles.forEach(element => {
        
    if(element.messageID === `${message.id}` && element.channelID === `${message.channel.id}`){
      if(element.emoji == `${emojiID}`|| element.emoji == `${emoji}`){      //console.log(element)
        let roleToRem = message.guild.roles.cache.get(`${element.roleID}`)
        let mem = client.resolveMember()
        //if(member.roles.highest.comparePositionTo(roleToRem) <= 0)return console.log(`Vous ne pouvez pas enlever un role superieur a votre role le plus haut.`);
        if(message.guild.me.roles.highest.comparePositionTo(roleToRem) <= 0) return console.log(`Je n'ai pas un role sufisant pour vous enlever ce role`)
        member.roles.remove(roleToRem)
      }
    }
   })*/
  /*if(message.guild.me.roles.highest.comparePositionTo(role) <= 0) return message.channel.send(`${client.config.emojis.FALSE}Je n'ai pas un role sufisant pour vous attribuer ce role`)
  if(message.member.roles.highest.comparePositionTo(role) <= 0){
  return message.channel.send(`${client.config.emojis.FALSE}Vous ne pouvez pas ajouter un role superieur a votre role le plus haut.`);
  }else{
      if (utilisateur.roles.cache.has(role.id)) return message.channel.send(`${client.config.emojis.FALSE}L'utilisateur pocède déja ce role.`);
      utilisateur.roles.add(role)
      .then(m => message.channel.send(`${client.config.emojis.TRUE}J'ai bien ajouter le role ${role} a ${utilisateur}.`))
      .catch(e => console.log(e));
  }*/



  /*if (member.user.bot) return;

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
  if (emoji === "🟩") message.channel.send(`Reaction : 🟩`);*/
}
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
 