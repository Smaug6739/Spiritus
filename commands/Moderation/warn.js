const { MessageEmbed } = require("discord.js");
module.exports.run = async (client, message, args, settings) => {
   // if(!message.guild.me.hasPermission('KICK_MEMBERS')) return message.channel.send(`${FALSE}Je n'ai pas la permission pour kick un utilisateur.`);
  let user = message.mentions.users.first();
  let reason = (args.splice(1).join(' ') || 'Aucune raison spécifiée');

    if(user){
        const embed = new MessageEmbed()
        .setTitle('Avertissement :')
        .setAuthor(`${user.username} (${user.id})`)
        .setColor(`${client.config.color.ORANGE}`)
        .setDescription(`**Action :** Warn\n**Raison :** ${reason}\n**Serveur :** ${message.guild.name}\n**Modérateur :** ${message.author.username}`)
        .setThumbnail(user.displayAvatarURL())
        .setTimestamp()
        .setFooter(message.author.username, message.author.avatarURL());
        try{
          if(settings.modLogs){
            const channel = client.resolveChannel(message.guild, settings.modLogs)
              if(channel){
                  if(channel.permissionsFor(message.guild.me).has('SEND_MESSAGES')){
                      channel.send(embed)
                  }
              }
          }
            user.createDM().then(msg =>
            msg.send(embed)
            
            .then(message.channel.send(`${client.config.emojis.TRUE}J'ai bien warn l'utilisateur **${user.tag}**`)))
            .catch(() =>{})
        }catch{
          return;
        }
        
        
    }else{
        message.channel.send(`${client.config.emojis.FALSE}Je n'ai pas trouver cet utilisateur.`)
    }
 
};

module.exports.help = {
  name: "warn",
  aliases: ['warn','avertissement'],
  category : 'moderation',
  description: "Warn un utilisateur.",
  cooldown: 10,
  usage: '<@user> <raison>',
  exemple :["warn @Smaug spam"],
  isUserAdmin: true,
  permissions: true,
  args: true,
  sousCommdandes : []
};