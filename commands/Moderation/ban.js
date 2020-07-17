const { MessageEmbed } = require("discord.js");
module.exports.run = async (client, message, args) => {
  if(!message.guild.me.hasPermission('BAN_MEMBERS')) return message.channel.send(`${client.config.emojis.FALSE}Je n'ai pas la permission pour ban un utilisateur.`);
 


  if(args[0].toLowerCase() === 'match'){
    if(!args[1])return message.channel.send(`${client.config.emojis.FALSE} Merci d'indiquer le contenu d'un message.`)
    let query;
    let reason = 'No reason provided';
    query = args.slice(1).join(' ')
    reason = encodeURIComponent(reason);
    const msgs = await message.channel.messages.fetch()
    let messge = await message.channel.send(`${client.config.emojis.LOADING} Recherche du message \`${query}\`...`);
    const messages = msgs.filter(m => m.content.includes(query) && !m.content.includes(query));
    if (!messages || messages.length === 0) return messge.edit(`${client.config.emojis.FALSE} Ce message n'a pas été trouver.`);
    const ids = messages.map(m => m.author.id);
    //console.log('IDS : ' + ids)
    const users = [];
    for (const id of ids) {
        let add = true;
        let user = await client.resolveMember(message.channel.guild, id);
        if (users.includes(id)) add = false;
        if (!user && id.match(/^\d+$/)) {
            user = await client.getRESTUser(id).catch(() => {
                add = false;
            });
        }
        if (!user) add = false;
        if (add) users.push(user.id);
    }

    if (users.length === 0) return messge.edit(`${client.config.emojis.FALSE} Aucun utilisateur trouver.`);//message.channel.send(`${client.config.emojis.FALSE} Aucun utilisateur trouver.`);

    //messge.edit({ content: `Vous etes sur le point de banir **${users.length}** user(s). Vous pouvez confirmer en réagissant avec ${client.config.emojis.TRUE} où annuler la commande en réagissant avec ${client.config.emojis.FALSE} .` });
        usersList = [];
        success = 0;
        errored = 0;
        admin = 0;
        const descrip = `${client.config.emojis.LOADING} Banmassing en cour...`;
        messge.edit({ content: descrip });
        for (const user of users) {
                try {
                    userToBan = client.resolveMember(message.guild,user)

                    usr = user
                    await usersList.push(`${userToBan.user.username}#${userToBan.user.discriminator}`);
                    if(userToBan.banable){
                        userToBan.ban()
                        .catch(
                            errored++ ,
                            success--
                           )
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
        if (errored > 0) title = `${client.config.emojis.FALSE} Une erreur s'est produite avec un ou plusieurs utilisateurs :`;
        else title = `${client.config.emojis.TRUE} Banmass Users :`;
        let desc = success > 0 ? `**Nombre de bannis : ** \`${success}\`` : ''/*'Erreur lors du ban de certaines personnes'*/;
        if (errored > 0) desc += `\n Nombre de bans échoués : \`${errored}\``;
        if (errored > 0 && admin > 0) desc += `\n Nombre de modérateurs (non bannis) : \`${errored}\``;
        if (desc !== 'Erreur lors du ban de certaines personnes') desc += ` sur \`${usersList.length}\` \n Nombre de messages filtrés : \`${ids.length}\``;
        messge.edit({
            content: '',
            embed: {
               // title: `${client.config.emojis.TRUE} Banmass Users : `,
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
        
        /*if (guildConfig.modLogChannel) {
            let logChannel = msg.channel.guild.channels.get(guildConfig.modLogChannel);
            return logChannel.createMessage({
                embed: {
                    author: {
                        name: `${msg.author.username}#${msg.author.discriminator}`,
                        icon_url: msg.member.avatarURL ? msg.member.avatarURL : msg.member.defaultAvatarURL
                    },
                    title: 'Massban',
                    color: this.delta.constants.colors.main,
                    description: desc,
                    timestamp: new Date(),
                    fields: [
                        {
                            name: 'Banned users',
                            value: `\`\`\`\n${usersList.join('\n')}\`\`\``
                        }
                    ]
                }
            });
        }*/
    });

  }else{
    let user  = await client.resolveMember(message.guild,args[0])
    if(user == undefined)return message.channel.send(`${client.config.emojis.FALSE}Je n'ai pas trouver cet utilisateur.`)
    let reason = (args.splice(1).join(' ') || 'Aucune raison spécifiée');
    //let user = message.mentions.users.first();
    const embed = new MessageEmbed()
    .setAuthor(`${user.user.username} (${user.id})`)
    .setColor(`${client.config.color.ROUGE}`)
    .setDescription(`**Action**: ban\n**Raison**: ${reason}`)
    .setThumbnail(user.user.displayAvatarURL())
    .setTimestamp()
    .setFooter(message.author.username, message.author.avatarURL());
    user ? message.guild.member(user).ban({reason : `${reason}`}).then(message.channel.send(embed)) : message.channel.send(`${client.config.emojis.FALSE}Je n'ai pas trouver cet utilisateur`);

  }

 
};

module.exports.help = {
  name: "ban",
  aliases: ['ban'],
  category : 'moderation',
  description: "Ban un utilisateur.",
  cooldown: 10,
  usage: '<@user> <raison>',
  exemple :["ban @Smaug spam"],
  isUserAdmin: true,
  permissions: true,
  args: true,
  sousCommdandes : []
};