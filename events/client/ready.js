const { Guild } = require("../../models/index");
const DBL = require('dblapi.js');
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
  client.user.setPresence({ activity: { name: `${client.configuration.DEFAULTSETTINGS.prefix}help | ${client.configuration.DEFAULTSETTINGS.prefix}cmds`, type: 'WATCHING' }, status: 'online' });
  const webhookClient  = new WebhookClient(`${client.configuration.WEBHOOKS.CONNECTIONS.DISCORD.ID}`, `${client.configuration.WEBHOOKS.CONNECTIONS.DISCORD.TOKEN}`);
  const embed = new MessageEmbed()
  .setTitle(`BOT ${client.user.tag} à démarer avec succès.`)
  .setColor(`#0099ff`)
  .setThumbnail(`${client.user.displayAvatarURL()}`)
  .addField('Event ','Ready',true)
  .addField('Users ',`${client.guilds.cache.map(g => g.memberCount).reduce((a, b) => a + b)}`,true)
  .addField('Guilds ',`${client.guilds.cache.size.toString()}`,true)
  .setTimestamp()
  .setFooter('BOT ID : 689210215488684044');

  webhookClient.send('',{
    username: `${client.configuration.WEBHOOKS.CONNECTIONS.DISCORD.NAME}`,
    avatarURL: `${client.configuration.WEBHOOKS.CONNECTIONS.DISCORD.AVATAR}`,
    embeds: [embed],
  });


  if(client.user.id === client.config.IDOFFITIEL){
    const dbl = new DBL("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4OTIxMDIxNTQ4ODY4NDA0NCIsImJvdCI6dHJ1ZSwiaWF0IjoxNTk4MDI4MzE5fQ.Mcm1t7ehWiS1daU8RW38B2ebwsQPpz3ivsXAC-C0cvc");
  dbl.webhook.on('ready', hook => {
      console.log(`Webhook running at http://${hook.hostname}:${hook.port}${hook.path}`);
    });
  dbl.webhook.on('vote', async vote => {
      const guild = client.guilds.cache.get('710759353472516176')
      const channel = client.channels.cache.get(`736074693790138409`)
      try{
          const member = guild.members.cache.get(vote.user);
              channel.send(`<@!${member.id}> a voté pour Spiritus sur DBL ! Merci ❤️`)
      
  
      }catch(err){
          console.log(err)
          const channelerror = client.channels.cache.get(`730120455243038794`)
          channelerror.send(`**Erreur DBL : **\n\`\`\`js\n${err}\`\`\``)
      }
  })
  }
  }