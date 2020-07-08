const { Collection,MessageEmbed,WebhookClient } = require('discord.js');

module.exports = async(client, message) => {
  if (message.channel.type === "dm") return //client.emit("directMessage", message);
  if (!message.channel.permissionsFor(message.guild.me).has('SEND_MESSAGES')) return console.log('Je n\'ai pas la permission d\'envoyer messages');

  if (message.author.bot) return;
  const settings = await client.getGuild(message.guild);
  const dbUser = await client.getUser(message.member, message.member.guild.id);
  //--------------------------------SYSTEME-ANTI-INVITS----------------------
  if(settings.invitations){
    if(message.content.includes('https://discord.gg')){
      message.delete()
      message.reply('les invitations sont interdites sur ce serveur !')
    }
  }
  //----------------------------------CMD-PERSONALISEE-------------------------
  if(message.content.startsWith(settings.prefix)){
    const cmdNom = message.content.slice(settings.prefix.length).split(/ +/);
    const comd = await client.getCmd(cmdNom[0], message.guild)
      if(comd) message.channel.send(comd.contenu)
  }  
  if(settings.expsysteme){

  if(!dbUser) await client.createUser({
    guildID: message.member.guild.id,
    guildName: message.member.guild.name,
    userID: message.member.id,
    username: message.member.user.tag,
  });
  //-----------Si le système d'experience est activé------------------

  if(dbUser){
    const expCd = Math.floor(Math.random() * 19) + 1; // 1 - 20 
    const expToAdd = Math.floor(Math.random() * 25) + 10; //  10 - 35
      if(expCd >= 10 && expCd  <= 15){
          if(!dbUser){
            setTimeout(async function () {
            //message.reply(`tu viens de gagner ${expToAdd} points d'experience`)
            await client.addExp(client, message.member, expToAdd);
            },1000)
            
          }else{
            //message.reply(`tu viens de gagner ${expToAdd} points d'experience`)
            await client.addExp(client, message.member, expToAdd);
          }
        //-------------------------------------------LEVELS------------------------------------------
        const userLevel = Math.floor(0.1 * Math.sqrt(dbUser.experience));
        //Augmanter 0.1 pour avoir besoins de moins de poinnts d'exp.
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
  if (!message.content.startsWith(settings.prefix)) return;


  const args = message.content.slice(settings.prefix.length).split(/ +/);

  const commandName = args.shift().toLowerCase();
  const user = message.mentions.users.first();
  const command = client.commands.get(commandName) || client.commands.find(cmd => cmd.help.aliases && cmd.help.aliases.includes(commandName));
  if (!command) return;

  if (command.help.permissions && !message.member.hasPermission('BAN_MEMBERS')) return message.reply("tu n'as pas les permissions pour taper cette commande.");

  if (command.help.args && !args.length) {
    let noArgsReply = `Il nous faut des arguments pour cette commande, ${message.author}!`;

   /* if (command.help.usage) noArgsReply += `\nVoici comment utiliser la commande: \`${settings.prefix}${command.help.name} ${command.help.usage}\``;
    return message.channel.send(noArgsReply);*/
    const embed = new MessageEmbed()
    .setColor(client.config.color.EMBEDCOLOR)
    .setTitle(`${client.config.emojis.LOGOBOT} **Commande :** ${settings.prefix}${command.help.name}`)
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

    if (timeNow < cdExpirationTime) {
      timeLeft = (cdExpirationTime - timeNow) / 1000;
      return message.reply(`merci d'attendre ${timeLeft.toFixed(0)} seconde(s) avant de ré-utiliser la commande \`${command.help.name}\`.`);
    }
  }

  tStamps.set(message.author.id, timeNow);
  setTimeout(() => tStamps.delete(message.author.id), cdAmount);
  try{
     await command.run(client, message, args, settings, dbUser)
    }catch(e){
      const webhookClient  = new WebhookClient(`${client.config.webhooks.errors.ID}`, `${client.config.webhooks.errors.TOKEN}`);
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
        embeds: [embed],
      });
    }
 
}