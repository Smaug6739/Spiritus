const { MessageEmbed } = require("discord.js");
module.exports.run = async (client, message, args) => {
    if(!message.guild.me.hasPermission('KICK_MEMBERS')) return message.channel.send(`${client.config.emojis.FALSE}Je n'ai pas la permission pour kick un utilisateur.`);
    if(!message.mentions.members.first()) return message.channel.send(`${client.config.emojis.FALSE}Vous devez mentionner une personne.`)

      let user = message.guild.member(message.mentions.users.first());
      console.log(user)
      //let user  = await client.resolveMember(message.guild,args[0])
      if(user == undefined)return message.channel.send(`${client.config.emojis.FALSE}Je n'ai pas trouver cet utilisateur.`)
      if(message.guild.me.roles.highest.comparePositionTo(user.roles.highest) <= 0) return message.channel.send(`${client.config.emojis.error}Je n'ai pas un role sufisant pour kick cette personne.`)
      if(message.member.roles.highest.comparePositionTo(user.roles.highest) <= 0) return message.channel.send(`${client.config.emojis.error}Vous n'avez pas un role sufisament haut pour kick cette personne.`)
      let reason = (args.splice(1).join(' ') || 'Aucune raison spécifiée');
      await user ? message.guild.member(user).kick(reason) : message.channel.send(`${client.config.emojis.FALSE}Je n'ai pas trouver cet utilisateur`);
      const embed = new MessageEmbed()
        .setAuthor(`${user.user.username} (${user.id})`)
        .setColor(`${client.config.color.ORANGE}`)
        .setDescription(`**Action**: kick\n**Raison**: ${reason}`)
        .setThumbnail(user.user.displayAvatarURL())
        .setTimestamp()
        .setFooter(message.author.username, message.author.avatarURL());    
        message.channel.send(embed);

  
};

module.exports.help = {
  name: "kick",
  aliases: ['kick'],
  category : 'moderation',
  description: "Kick un utilisateur.",
  cooldown: 10,
  usage: '<@user> <raison>',
  exemple :["kick @Smaug spam"],
  isUserAdmin: true,
  permissions: true,
  args: true,
  sousCommdandes : []
};