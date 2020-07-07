const {MessageEmbed} = require("discord.js")
module.exports.run =(client, message, args) => {
  if(args[1]){
    if(typeof message.mentions.channels.first() === 'undefined') {
        if(typeof message.mentions.users.first() !== 'undefined') {
            let attachments = message.attachments
            let user = message.mentions.users.first()
            let arrayMsg = message.content.split(/ +/g)
            arrayMsg.shift()
            arrayMsg.shift()
            let content = arrayMsg.join(" ")
                if(attachments) {
                    user.send("**Message de l'administration : **"+content, message.attachments.first()).then(msg => {
                    message.delete()
                })
                .catch(console.error);
                }else{
                    user.send("**Message de l'administration : **"+content,attachments).then(msg => {
                        message.delete()
                    })
                    .catch(console.error);
                }
        }
    }else{
        let attachments = message.attachments
        let channel = message.mentions.channels.first()
        if(attachments){ 
            let arrayMsg = message.content.split(/ +/g)   
            if(arrayMsg.length > 2) {
                arrayMsg.shift()
                arrayMsg.shift()
                let content = arrayMsg.join(" ")
                channel.send(content, message.attachments.first()).then(msg => {
                    message.delete()
                })
                .catch(console.error);
            }else{
                channel.send("", message.attachments.first()).then(msg => {
                    message.delete()
                })
                .catch(console.error);
            }
        }else{
            let arrayMsg = message.content.split(/ +/g)
            arrayMsg.shift()
            arrayMsg.shift()
            let content = arrayMsg.join(" ")
            channel.send(content).then(msg => {
                message.delete()
            })
            .catch(console.error);
        }

    }
  }else{
    const embed = new MessageEmbed()
    .setTitle('Commande message')
    .setColor(`${client.config.color.EMBEDCOLOR}`)
    .setDescription('La commande `message` permet d\'envoyer un message a une personne ou dans un channel grace aux sous commandes suivantes :')
    .addFields(
        { name: '\u200b', value: `${client.config.emojis.FLECHE}\`message @user\` envoi un message dans les MP d\'une personne.`, inline: false },
        { name: '\u200b', value: `${client.config.emojis.FLECHE}\`message #channel\` envoi un message dans un channel..`, inline: false }
    )
    .setTimestamp()
    .setFooter('BOT ID : 689210215488684044')
    message.channel.send(embed)      
  } 
}
module.exports.help = {
    
    name : 'message',
    aliases : ['message','msg','m'],
    category : 'misc',
    description : 'Envoi un message spécifié dans un channel ou en MP',
    cooldown : 10,
    usage : '<#channel> <votre_message> ou <@user> <votre_message>',
    exemple :["msg @Smaug Message","msg #spiritus Message"],
    isUserAdmin: false,
    permissions : true,
    args : false,
    sousCommdandes : []
}
