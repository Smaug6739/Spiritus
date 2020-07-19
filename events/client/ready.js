const { Guild } = require("../../models/index");
const {MessageEmbed, WebhookClient} = require('discord.js')
module.exports =async client => {
    console.log(`Logged in as ${client.user.tag}!`);
    //let emoji = client.emojis.cache.find(emoji => emoji.name === "loading");
    //console.log(emoji)
    //let status = [`Commandes : ?help`,`Serveurs : ${client.guilds.cache.size.toString()}`,`Utilisateurs : ${client.guilds.cache.map(g => g.memberCount).reduce((a, b) => a + b)}`],i =0;
   /* let status = [`Commandes : ${client.config.PREFIX}help`,`Utilisateurs : ${client.guilds.cache.map(g => g.memberCount).reduce((a, b) => a + b)}`,`Commandes : ${client.config.PREFIX}help`],i =0;
    setInterval(() => {
      client.user.setPresence({ activity: { name: `${status [i++ % status.length]}`, type: 'WATCHING' }, status: 'online' });
    },60000)*/
    client.user.setPresence({ activity: { name: `${client.config.PREFIX}`, type: 'WATCHING' }, status: 'online' });
  const webhookClient  = new WebhookClient(`${client.config.webhooks.readyLogs.ID}`, `${client.config.webhooks.readyLogs.TOKEN}`);
  const embed = new MessageEmbed()
  .setTitle(`BOT ${client.user.tag} à démarer avec succès.`)
  .setColor(`${client.config.webhooks.readyLogs.COLOR}`)
  .setThumbnail(`${client.user.displayAvatarURL()}`)
  .addField('Event ','Ready',true)
  .addField('Users ',`${client.guilds.cache.map(g => g.memberCount).reduce((a, b) => a + b)}`,true)
  .addField('Guilds ',`${client.guilds.cache.size.toString()}`,true)
  .setTimestamp()
  .setFooter('BOT ID : 689210215488684044');

  webhookClient.send('',{
    username: `${client.config.webhooks.readyLogs.NAME}`,
    avatarURL: `${client.config.webhooks.readyLogs.AVATAR}`,
    embeds: [embed],
  });
  }