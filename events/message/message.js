const { Collection,MessageEmbed,WebhookClient } = require('discord.js');
module.exports = async(client, message) => {
  if (message.channel.type === "dm") return //client.emit("directMessage", message);
  if (!message.channel.permissionsFor(message.guild.me).has('SEND_MESSAGES')) return ;
  if (message.author.bot) return;
  const settings = await client.getGuild(message.guild);
  const dbUser = await client.getUser(message.member, message.guild.id);

  //------------------------------SYSTEME-IGNORE-CHANNEL---------------------
  if(settings.ignoreChannel){
    if(settings.ignoreChannel.includes(message.channel.id)) return;
  }
  //----------------------------------SYSTEME-FILTER-------------------------
  if(settings.filter){
    settings.filter.forEach(content => {
      if(message.content.includes(content)){
        message.delete()
        message.reply(`ce mot est interdit sur ce serveur !`)
      }
    });  
  }
  //--------------------------------SYSTEME-ANTI-INVITS----------------------
  if(settings.invitations){
    if(message.content.includes('discord.gg/')){
      message.delete()
      message.reply('les invitations sont interdites sur ce serveur !')
    }
  }
  //-----------Si le système d'experience est activé------------------
  if(settings.expsysteme){
    if(!dbUser) await client.createUser({
      guildID: message.member.guild.id,
      guildName: message.member.guild.name,
      userID: message.member.id,
      username: message.member.user.tag,
    });

    if(dbUser){
      const expCd = Math.floor(Math.random() * 19) + 1; // 1 - 20 
      const expToAdd = Math.floor(Math.random() * 25) + 10; //  10 - 35
      if(expCd >= 10 && expCd  <= 15){
        if(!dbUser){
            setTimeout(async function () {
            await client.addExp(client, message.member, expToAdd);
            },1000)
          }else{
            await client.addExp(client, message.member, expToAdd);
          }
        //-------------------------------------------LEVELS------------------------------------------
        const userLevel = Math.floor(0.1 * Math.sqrt(dbUser.experience));
        if (dbUser.level < userLevel) {
          if(settings.salonranks != ""){
            message.guild.channels.cache.get(`${settings.salonranks}`).send(`<@${dbUser.userID}> bravo à toi, tu viens de monter niveau **${userLevel}** :muscle: :muscle: `)
          }else{
            message.reply(` bravo à toi, tu viens de monter niveau **${userLevel}** :muscle: :muscle: `);
          }
          client.updateUser(message.member, { level: userLevel });
        }else if (dbUser.level > userLevel) {
          await client.updateUser(message.member, { level: userLevel });
        }
      }
    }
  }
  /*if(message.content.includes(`<@!${client.user.id}>`)){
    const embed = new MessageEmbed()
    .setAuthor(`Spiritus`,`${client.user.displayAvatarURL()}`)
    .setThumbnail(client.user.displayAvatarURL())
    .addField(`Prefix de ce serveur :`,`${settings.prefix}`,false)
    .addField(`Commande d'aide :`,`${settings.prefix}help ou ${settings.prefix}cmds`,false)
    .setTimestamp()
    .setFooter(`BOT ID : ${client.user.id}`)
    return message.channel.send(embed)
  }*/

  //-------------------------------LINKS---------------------------------------------------------------------------------------
  /*try{
    let stop = false;
    let webhooks = await message.channel.fetchWebhooks().catch(() => stop = true);
    if (!stop){
      webhooks = webhooks.map(w => w.id);
      if(settings.links){
        if (settings.links.length > 0 && settings.links.find(a => a.find(w => webhooks.includes(w)))) {
          firstWebhookID = settings.links.find(a => a.find(w => webhooks.includes(w))).find(b => webhooks.includes(b));
          if (!firstWebhookID) return;
          let otherWebhook = await client.fetchWebhook(settings.links.find(a => a.includes(firstWebhookID)).find(w => w !== firstWebhookID));
          const link  = new WebhookClient(`${otherWebhook.id}`, `${otherWebhook.token}`);
          link.send({
              auth: true,
              content: message.content,
              username: message.author.username,
              avatarURL: message.author.displayAvatarURL(),
              allowedMentions: {
                  everyone: false,
                  roles: false,
              }
          }).catch();
        }
      }
    }
    
  }catch(e){
  }
  */
  

  if (!message.content.startsWith(settings.prefix)) return;


  const args = message.content.slice(settings.prefix.length).split(/ +/);
  const commandName = args.shift().toLowerCase();
  const user = message.mentions.users.first();
  const command = client.commands.get(commandName) || client.commands.find(cmd => cmd.help.aliases && cmd.help.aliases.includes(commandName));
  //----------------------------------CMD-PERSONALISEE-------------------------
  if(settings.commandes){
    let customCommand = settings.commandes.find(e => e.nom == message.content.slice(settings.prefix.length).toLowerCase())
    if(customCommand)return message.channel.send(customCommand.contenu)
  }
  //--------------------------------------------------------------------------
  if (!command) return;
  if(command.help.permissions){
    const isMod = await client.checkMod(message.member, settings)
    if(!isMod || isMod == false)return message.reply("tu n'as pas les permissions pour taper cette commande.");
  }
      
  //if (command.help.permissions && !message.member.hasPermission('BAN_MEMBERS')) return message.reply("tu n'as pas les permissions pour taper cette commande.");
  if (command.help.args && !args.length) {
    let noArgsReply = `Il nous faut des arguments pour cette commande, ${message.author}!`;
   /* if (command.help.usage) noArgsReply += `\nVoici comment utiliser la commande: \`${settings.prefix}${command.help.name} ${command.help.usage}\``;
    return message.channel.send(noArgsReply);*/
    const embed = new MessageEmbed()
    .setColor(client.config.color.EMBEDCOLOR)
    .setAuthor(`Commande : ${settings.prefix}${command.help.name}`,`${client.user.avatarURL()}`)
    .addField("**__Description :__**", `${command.help.description} (cd: ${command.help.cooldown}secs)`)
    .addField("**__Utilisation :__**", command.help.usage ? `${settings.prefix}${command.help.name} ${command.help.usage}` : `${settings.prefix}${command.help.name}`, true)
    .setTimestamp()
    .setFooter('BOT ID : 689210215488684044', `${message.guild.iconURL()}`);
    if (command.help.aliases.length > 1) embed.addField("**__Alias :__**", `${command.help.aliases.join(`, `)}`);
    if (command.help.exemple && command.help.exemple.length > 0) embed.addField("**__Exemples :__**", `${settings.prefix}${command.help.exemple.join(`\r\n${settings.prefix}`)}`);
    if (command.help.sousCommdandes && command.help.sousCommdandes.length > 0) embed.addField("**__Sous commandes :__**", `${settings.prefix}${command.help.sousCommdandes.join(`\r\n${settings.prefix}`)}`);
    return message.channel.send(embed);
  };

  //if (command.help.isUserAdmin && !user) return message.reply('il faut mentionner un utilisateur.');
  if (command.help.isUserAdmin && args[0]){
    let user = client.resolveMember(message.guild,args[0])
    if(user){
    if(user.hasPermission('BAN_MEMBERS')) return message.reply("tu ne peux pas utiliser cette commande sur cet utilisateur.");
    }
  }
  //if (command.help.isUserAdmin && message.guild.member(user).hasPermission('BAN_MEMBERS')) return message.reply("tu ne peux pas utiliser cette commande sur cet utilisateur.");
  if (!client.cooldowns.has(command.help.name)) {
    client.cooldowns.set(command.help.name, new Collection());
  };
  const timeNow = Date.now();
  const tStamps = client.cooldowns.get(command.help.name);
  const cdAmount = (command.help.cooldown || 5) * 1000;
  if (tStamps.has(message.author.id)) {
    const cdExpirationTime = tStamps.get(message.author.id) + cdAmount;
    if (timeNow < cdExpirationTime && message.author.id != client.config.owner.id) {
      timeLeft = (cdExpirationTime - timeNow) / 1000;
      return message.reply(`merci d'attendre ${timeLeft.toFixed(0)} seconde(s) avant de ré-utiliser la commande \`${command.help.name}\`.`);
    }
  }
  tStamps.set(message.author.id, timeNow);
  setTimeout(() => tStamps.delete(message.author.id), cdAmount);
  try{
     await command.run(client, message, args, settings, dbUser)
    }catch(e){
      const webhookClient  = new WebhookClient(`${client.configuration.WEBHOOKS.ERRORS.ID}`, `${client.configuration.WEBHOOKS.ERRORS.TOKEN}`);
      const embed = new MessageEmbed()
      .setAuthor(`${message.author.username}#${message.author.discriminator}`,`${message.author.displayAvatarURL()}`)
      .setTitle("Message d'erreur")
      .setDescription(`__**Contenu du message :**__ \`${message.content}\` [Jump to message](https://discord.com/channels/${message.channel.guild.id}/${message.channel.id}/${message.id})`)
      .addField('Mention :',`User : <@${message.author.id}>`,true)
      .addField('Guild :',`ID : \`${message.guild.id}\` Name : \`${message.guild.name}\``,false)
      .addField('Channel :',`ID : \`${message.channel.id}\` Name : \`${message.channel.name}\``,true)
      .addField(`Erreur message :`,`\`\`\`js\n${e.message}\`\`\``,false)
      .addField(`Erreur complète :`,`\`\`\`js\n${e.stack}\`\`\``,false)
      .setColor('#0099ff')
      .setTimestamp()
      .setFooter('BOT ID : 689210215488684044');
      webhookClient.send(`<@${client.config.owner.id}>`,{
        username: `${client.configuration.WEBHOOKS.ERRORS.NAME}`,
        avatarURL: `${client.configuration.WEBHOOKS.ERRORS.AVATAR}`,
        embeds: [embed],
      });
    }
}