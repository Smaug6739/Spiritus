const { Guild } = require("../../models/index");
const {MessageEmbed, WebhookClient} = require('discord.js')
module.exports =async client => {
    console.log(`Logged in as ${client.user.tag}!`);
    //let emoji = client.emojis.cache.find(emoji => emoji.name === "loading");
    //console.log(emoji)
 
  const webhookClient  = new WebhookClient('714886315937759252', 'GtQPNjgyVAHQEaZAudHJ7TgpdhVrifSxp2jkEJVV8H5M0wQ9SEWJOUhMg94M2g_hpKZl');
  const embed = new MessageEmbed()
	.setTitle('BOT 2.0 à démarer avec succès.')
  .setColor('#0099ff')
  .setTimestamp()
  .setFooter('BOT ID : 689210215488684044');

  webhookClient.send('',{
    username: 'Démarage',
    avatarURL: 'https://cdn.discordapp.com/attachments/714242633375023164/714879334879461476/1584471129028.png',
    embeds: [embed],
  });
  }