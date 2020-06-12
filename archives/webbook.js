const { Guild } = require("../models/index");
const {MessageEmbed, WebhookClient} = require('discord.js')
module.exports.run = async (client, message, args) => {
    let id_webkook = '';
    let token_webkook = '';
    let avatar_webkook = '';
    let nom_webkook = '';
    let contenu_webkook = '';
       
    message.channel.send('Quel est le nom du webhook ?').then(async msg => {
    
        const filter = m => message.author.id === m.author.id;
        message.channel.awaitMessages(filter, { time: 60000, max: 1, errors: ['time'] })
            .then(messages => {
                nom_webkook = messages.first().content
                message.channel.send('OK je donne le nom '+nom_webkook+' au bot !')
                message.channel.send('Quel est l\'avater du webhook ?').then(async msg => {
    
                    const filter = m => message.author.id === m.author.id;
                    message.channel.awaitMessages(filter, { time: 60000, max: 1, errors: ['time'] })
                        .then(messages => {
                            avatar_webkook = messages.first().content
                            message.channel.send('OK je donne l\'avatar '+avatar_webkook+' au bot !')
                            message.channel.send('Quel est l\'id du webhook ?').then(async msg => {
    
                                const filter = m => message.author.id === m.author.id;
                                message.channel.awaitMessages(filter, { time: 60000, max: 1, errors: ['time'] })
                                    .then(messages => {
                                        id_webkook = messages.first().content
                                        message.channel.send('OK je récupère le webhook qui a pour id ' + id_webkook)
                                        message.channel.send('Quel est le token du webhook ?').then(async msg => {
    
                                            const filter = m => message.author.id === m.author.id;
                                            message.channel.awaitMessages(filter, { time: 60000, max: 1, errors: ['time'] })
                                                .then(messages => {
                                                    token_webkook = messages.first().content
                                                    message.channel.send('OK je donne recupère le token '+ token_webkook)
                                                    message.channel.send('Quel est le message que le webhook doit envoyer ?').then(async msg => {
    
                                                        const filter = m => message.author.id === m.author.id;
                                                        message.channel.awaitMessages(filter, { time: 60000, max: 1, errors: ['time'] })
                                                            .then(messages => {
                                                                contenu_webkook = messages.first().content
                                                                const webhookClient  = new WebhookClient(`${id_webkook}`, `${token_webkook}`);
 
                                                                 webhookClient.send(`${contenu_webkook}`,{
                                                                  username: nom_webkook,
                                                                  avatarURL: avatar_webkook,
                                                                }).then(console.log('ok'))
                                                                  .catch(console.error)
                                                                //message.channel.send('OK je donne l\'avatar '+avatar_webkook+' au bot !')
                                                            })
                                                            
                                                            .catch(() => {
                                                            message.channel.send('Vous n\'avez rien entrer !');
                                                            });
                                                        })
                                                })
                                                
                                                .catch(() => {
                                                message.channel.send('Vous n\'avez rien entrer !');
                                                });
                                            })
                                    })
                                    
                                    .catch(() => {
                                    message.channel.send('Vous n\'avez rien entrer !');
                                    });
                                })
                        })
                        
                        .catch(() => {
                        message.channel.send('Vous n\'avez rien entrer !');
                        });
                    })
                })
            .catch(() => {
            message.channel.send('Vous n\'avez rien entrer !');
            
     });
    
    
    })
 
  }

  module.exports.help = {
    
    name : 'webhook',
    aliases : ['webbook'],
    category : 'misc',
    description : 'Envoyez un message en choisissant l\'avatar et le nom du bot',
    cooldown : 0.1,
    usage : '',
    // exemple :["ping"],
    permissions : false,
    isUserAdmin: false,
    args : false
  }
 
  /*
   message.channel.send('Quel est l\'avater du webhook ?').then(async msg => {
    
                    const filter = m => message.author.id === m.author.id;
                    message.channel.awaitMessages(filter, { time: 60000, max: 1, errors: ['time'] })
                        .then(messages => {
                            avatar_webkook = messages.first().content
                            message.channel.send('OK je donne l\'avatar '+avatar_webkook+' au bot !')
                        })
                        
                        .catch(() => {
                        message.channel.send('Vous n\'avez rien entrer !');
                        });
                    })
                    */