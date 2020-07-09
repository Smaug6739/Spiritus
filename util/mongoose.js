const mongoose = require("mongoose");
const {DBCONNECTION,webhooks} = require('./../config')
const {MessageEmbed, WebhookClient} = require('discord.js')

module.exports =  {

  init: () => {
    const mongOptions = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
      autoIndex: false, // Don't build indexes
      poolSize: 10, // Maintain up to 10 socket connections
      serverSelectionTimeoutMS: 10000, // Keep trying to send operations for 5 seconds //5000
      socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity  //45000
      family: 4 // Use IPv4, skip trying IPv6
    }

    mongoose.connect(DBCONNECTION, mongOptions);//createConnection //connect
    mongoose.Promise = global.Promise;
    mongoose.connection.on("connected", () =>{ 
      console.log("Mongoose est connecté!")
      const webhookClient  = new WebhookClient(`${webhooks.readyLogs.ID}`, `${webhooks.readyLogs.TOKEN}`);
      const embed = new MessageEmbed()
      .setTitle('Mongoose connecté avec succès.')
      .setColor('#0099ff')
      .setTimestamp()
      .setFooter('BOT ID : 689210215488684044');

      webhookClient.send('',{
        username: `Mongoose`,
        embeds: [embed],
      });
    });
  }
}