const { MessageEmbed } = require("discord.js");
module.exports.run = async (client, message, args, settings) => {
    if(!message.guild.me.hasPermission('KICK_MEMBERS')) return message.channel.send(`${client.config.emojis.error}Je n'ai pas la permission pour kick un utilisateur.`);
    if(!message.mentions.members.first()) return message.channel.send(`${client.config.emojis.error}Vous devez mentionner une personne.`)

      let user = message.guild.member(message.mentions.users.first());
      if(user == undefined)return message.channel.send(`${client.config.emojis.error}Je n'ai pas trouver cet utilisateur.`)
      if(message.member.roles.highest.comparePositionTo(user.roles.highest) <= 0) return message.channel.send(`${client.config.emojis.error}Vous n'avez pas un role sufisament haut pour kick cette personne.`)
      let reason = (args.splice(1).join(' ') || 'Aucune raison spécifiée');
      const embed = new MessageEmbed()
      .setAuthor(`${user.user.username} (${user.id})`)
      .setColor(`${client.config.color.ORANGE}`)
      .setDescription(`**Action**: kick\n**Raison**: ${reason}`)
      .setThumbnail(user.user.displayAvatarURL())
      .setTimestamp()
      .setFooter(message.author.username, message.author.avatarURL()); 
      if(user){
        if(user.kickable){
          try{
            await user.send(embed)
          }catch{

          }
          message.guild.member(user).kick(reason).then(() => {
            message.channel.send(embed)
            if(settings.modLogs){
              const channel = client.resolveChannel(message.guild, settings.modLogs)
              if(channel){
                  if(channel.permissionsFor(message.guild.me).has('SEND_MESSAGES')){
                      channel.send(embed)
                  }
              }
          }
          })
        }
      } else message.channel.send(`${client.config.emojis.error}Je n'ai pas trouver cet utilisateur`);       
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