const { MessageEmbed } = require("discord.js");
module.exports.run = async (client, message, args, settings) => {

    /*if(args[0].toLowerCase() === 'match'){
      if(!args[1]){
          const banMatcheDescription = new MessageEmbed()
          .setTitle(`Sous commande : ${settings.prefix}ban match`)
          .setColor(client.config.color.EMBEDCOLOR)
          .setDescription(`**Module :** Moderation\n**Description :** Permet  de bannir plusieurs personnes ayant poster un meme message \n**Usage : **${settings.prefix}ban match [texte]\n**Exemples :** \n ${settings.prefix}ban match Rejoignez mon serveur https://discord.gg/TC7Qjfs `)
          .setFooter('BOT ID : 689210215488684044')
          .setTimestamp()
          return message.channel.send(banMatcheDescription)
      }
      //if(!args[1])return message.channel.sendErrorMessage(` Merci d'indiquer le contenu d'un message.`)
      let query;
      let reason = 'Aucune raison donnée';
      query = args.slice(1).join(' ')
      reason = encodeURIComponent(reason);
      const msgs = await message.channel.messages.fetch()
      let messge = await message.channel.send(`${client.config.emojis.LOADING} Recherche du message \`${query}\`...`);
      const messages = msgs.filter(m => m.content.includes(query) || m.content === query);
      if (!messages || messages.length === 0) return messge.edit(`${client.config.emojis.error} Ce message n'a pas été trouver.`);
      const ids = messages.map(m => m.author.id);
      console.log('IDS : ' + ids)
      const users = [];
      for (const id of ids) {
          console.log(id)
          let add = true;
          let user = await client.resolveMember(message.guild, id);
          console.log(user)
         // if (users.includes(id)) add = false;
         //if (!user && id.match(/^\d+$/)) {
         //     user = await client.getRESTUser(id).catch(() => {
         //       add = false;
         //    });
         //}
          
          if (!user) add = false ;
          if(id !== message.author.id){
              if (add) users.push(user.id);
          }
      }
  
      if (users.length === 0) return messge.edit(`${client.config.emojis.error} Aucun utilisateur trouver.`);//message.channel.sendErrorMessage(` Aucun utilisateur trouver.`);
      //messge.edit({ content: `Vous etes sur le point de banir **${users.length}** user(s). Vous pouvez confirmer en réagissant avec ${client.config.emojis.success} où annuler la commande en réagissant avec ${client.config.emojis.error} .` });
          usersList = [];
          success = 0;
          errored = 0;
          admin = 0;
          const descrip = `${client.config.emojis.LOADING} Banmassing en cour...`;
          messge.edit({ content: descrip });
          for (const user of users) {
                  try {
                      userToBan = await client.resolveMember(message.guild,user)
                      usr = user
                      await usersList.push(`${userToBan.user.username}#${userToBan.user.discriminator}`);
                      if(userToBan.bannable){
                          userToBan.ban()
                          success++
                      }else{
                          errored++
                          admin++
                      }
                       //messge.edit(`${descrip} (${success}/${users.length})`);
                   } catch (e) {
                       errored++;
                   }
              
              
          }
          let title;
          if (errored > 0) title = `${client.config.emojis.error} Une erreur s'est produite avec un ou plusieurs utilisateurs :`;
          else title = `${client.config.emojis.success} Banmass Users :`;
          let desc = success > 0 ? `**Nombre de bannis : ** \`${success}\`` : '';
          if (errored > 0) desc += `\n Nombre de bans échoués : \`${errored}\``;
          if (errored > 0 && admin > 0) desc += `\n Nombre de modérateurs (non bannis) : \`${errored}\``;
          if (desc !== 'Erreur lors du ban de certaines personnes') desc += ` sur \`${usersList.length}\` \n Nombre de messages filtrés : \`${ids.length}\``;
          if(settings.modLogs){
              const channel = client.resolveChannel(message.guild, settings.modLogs)
              if(channel){
                  if(channel.permissionsFor(message.guild.me).has('SEND_MESSAGES')){
                      channel.send({content: '',
                      embed: {
                         // title: `${client.config.emojis.success} Banmass Users : `,
                          title : `${title}`,
                          color: client.config.color.VERT,
                          description: desc,
                          timestamp: new Date(),
                          fields: [
                              {
                                  name: 'Utilisateurs concernés : ',
                                  value: `\`\`\`\n${usersList.join('\n')}\`\`\``
                              }
                          ]
                      }})
                  }
              }
          }
          messge.edit({
              content: '',
              embed: {
                 // title: `${client.config.emojis.success} Banmass Users : `,
                  title : `${title}`,
                  color: client.config.color.VERT,
                  description: desc,
                  timestamp: new Date(),
                  fields: [
                      {
                          name: 'Utilisateurs concernés : ',
                          value: `\`\`\`\n${usersList.join('\n')}\`\`\``
                      }
                  ]
              }
  
          
          
      });*/


    //let user = message.mentions.users.first();
    let reason = (args.splice(1).join(' ') || 'No reason was given');
    let user = await client.resolveMember(message.guild, args[0])
    if (user == undefined) return message.channel.sendErrorMessage(`User not found.`)
    const embed = new MessageEmbed()
        .setAuthor(`${user.username} (${user.id})`)
        .setColor(`${client.config.color.ROUGE}`)
        .setDescription(`**Action**: ban\n**Reason**: ${reason}\n**Guild :** ${message.guild.name}\nModerator : ${message.author.username}`)
        .setThumbnail(user.displayAvatarURL())
        .setTimestamp()
        .setFooter(message.author.username, message.author.avatarURL());
    if (user) {
        if (message.guild.member(user).bannable) {
            try {
                await user.send(embed)
            } catch {

            }
            message.guild.member(user).ban({ reason: `${reason}` }).then(() => {
                message.channel.send(embed).then(m => m.delete({ timeout: 5000 }))
                if (settings.modLogs) {
                    const channel = client.resolveChannel(message.guild, settings.modLogs)
                    if (channel) {
                        if (channel.permissionsFor(message.guild.me).has('SEND_MESSAGES')) {
                            channel.send(embed)
                        }
                    }
                }
            })
        } else message.channel.sendErrorMessage(`I can't ban this user.`)

    } else message.channel.sendErrorMessage(`User not found.`);

};

module.exports.help = {
    name: "ban",
    aliases: ['ban'],
    category: 'moderation',
    description: "Ban a user.",
    cooldown: 10,
    usage: '<@user> <reason>',
    exemple: ["ban @Smaug spam"],
    isUserAdmin: false,
    moderator: true,
    args: true,
    userPermissions: ['BAN_MEMBERS'],
    botPermissions: ['BAN_MEMBERS'],
    subcommands: []
};