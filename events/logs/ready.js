const { Guild } = require("../../models/index");
module.exports =async client => {
    console.log(`Logged in as ${client.user.tag}!`);
    //let emoji = client.emojis.cache.find(emoji => emoji.name === "Z9Z9");
    //console.log(emoji)
    const Discord = require('discord.js');
  /*
  * Create a new webhook
  * The Webbooks ID and token can be found in the URL, when you request that URL, or in the response body.
  * https://discordapp.com/api/webhooks/12345678910/T0kEn0fw3Bh00K
  *                                     ^^^^^^^^^^  ^^^^^^^^^^^^ 
  *                                     Webhook ID  Webhook Token
  */
const webhookClient  = new Discord.WebhookClient('714886315937759252', 'GtQPNjgyVAHQEaZAudHJ7TgpdhVrifSxp2jkEJVV8H5M0wQ9SEWJOUhMg94M2g_hpKZl');
const embed = new Discord.MessageEmbed()
	.setTitle('BOT 2.0 en démarer avec succès.')
	.setColor('#0099ff');

webhookClient.send('Webhook test', {
	username: 'Démarage',
	avatarURL: 'https://cdn.discordapp.com/attachments/714242633375023164/714879334879461476/1584471129028.png',
	embeds: [embed],
});
  }