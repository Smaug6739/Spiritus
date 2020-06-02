const {MessageEmbed} = require('discord.js')
module.exports.run = async (client, message, args) => {
  const {FALSE,ADMIN} = require('../../configstyle')
  if(!ADMIN.includes(message.author.id)) return message.channel.send(`${FALSE}Tu n'est pas admin du BOT.`);

  let couleur_embed = '';
  let channel = '';
  let msg = '';
  message.channel.send('Quel est  l\'id du channel ou l\'embed doit etre envoyer ? ').then(() => {
      const filter = m => message.author.id === m.author.id;

      message.channel.awaitMessages(filter, { time: 60000, max: 1, errors: ['time'] })
          .then(messages => {
              channel = messages.first().content
              //message.channel.send(`Vous avez rentrer : ${messages.first().content}`);
              message.channel.send('Quel est  la couleur de l\'embed ?').then(() => {
                const filter = m => message.author.id === m.author.id;
          
                message.channel.awaitMessages(filter, { time: 60000, max: 1, errors: ['time'] })
                    .then(messages => {
                        couleur_embed = messages.first().content
                        message.channel.send('Quel est  le contenu de l\'embed ?').then(() => {
                          const filter = m => message.author.id === m.author.id;
                    
                          message.channel.awaitMessages(filter, { time: 60000, max: 1, errors: ['time'] })
                              .then(messages => {
                                  msg = messages.first().content
                                  let embed = new MessageEmbed()
                                  .setColor(couleur_embed)
                                  .setDescription(`**${msg}**`)
                                  message.guild.channels.cache.get(`${channel}`).send(embed)
                                  //message.channel.send(`Vous avez rentrer : ${messages.first().content}`);
                                  
                                  
                              })
                              .catch(() => {
                              message.channel.send(`${FALSE}Une erreur s'est produite. Vous n'avez rien rentrer ou la valeur n'était pas valide`);
                              });
                      });
                        
                    })
                    .catch(() => {
                    message.channel.send(`${FALSE}Une erreur s'est produite. Vous n'avez rien rentrer ou la valeur n'était pas valide`);
                    });
            });
              
              
          })
          .catch(() => {
          message.channel.send(`${FALSE}Une erreur s'est produite. Vous n'avez rien rentrer ou la valeur n'était pas valide`);
          });
  });




  
}
module.exports.help = {
    
  name : 'embed',
  aliases : ['embed'],
  category : 'admin',
  description : 'commande de test',
  cooldown : 0.1,
  usage : '',
  // exemple :["ping"],
  permissions : false,
  isUserAdmin: false,
  args : false
}

/*
  message.channel.send('Quel est  l\'id du channel ou l\'embed doit etre envoyer ? ').then(() => {
      const filter = m => message.author.id === m.author.id;

      message.channel.awaitMessages(filter, { time: 60000, max: 1, errors: ['time'] })
          .then(messages => {
              channel = messages.first().content
              //message.channel.send(`Vous avez rentrer : ${messages.first().content}`);
              
              
          })
          .catch(() => {
          message.channel.send('Vous n\'avez rien entrer !');
  });
  });
  */