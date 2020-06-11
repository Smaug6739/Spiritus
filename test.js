const {MessageEmbed}=require('discord.js')
const {PREFIX}=require('../config.js');
module.exports = (bot) => {
bot.on('message', message => {
if(message.author.bot) return;
let couleur_embed = '#6633FF';
  let channel = '';
  let msg = '';



  if(message.content === PREFIX +"raidizer")

  message.channel.send("Tappez le nom du raid ou de l'activité que vous souhaitez organiser : ").then(() => {
    const filter = m => message.author.id === m.author.id;
   //Ce filtre sert a vérifier que c bien la personne qui a taper la commande qui répond aux questions
        message.channel.awaitMessages(filter, { time: 60000, max: 1, errors: ['time'] })
            .then(messages => {
              let nomRaid = messages.first().content
               

            //Ici on met la 2eme question
  message.channel.send("Tappez maintenant le jour dd/mm et l'heure 00:00 de l'activité : ").then(() => {
    const filter = m => message.author.id === m.author.id;
  //Ce filtre sert a vérifier que c bien la personne qui a taper la commande qui répond aux questions
        message.channel.awaitMessages(filter, { time: 60000, max: 1, errors: ['time'] })
            .then(messages => {
              let dateetheureRaid = messages.first().content


    const raidorganizerEmbed = new MessageEmbed()
      .setTitle("")
      .setDescription("")
      .setColor("#6633FF")
      .setImage("")
      .setThumbnail("")                                                                                                                                                                         
            
                                                                                                                                                                                  
message.channel.send(raidorganizerEmbed);


                               
                
            })
            .catch(() => {
            message.channel.send('Vous n\'avez rien entrer !');
            //Message d'erreur après 1min
            })
          })
        })
      })
    })
  }