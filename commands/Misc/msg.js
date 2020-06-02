module.exports.run =(client, message, args) => {
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
                
                } else {
                    user.send("**Message de l'administration : **"+content,attachments).then(msg => {
                        message.delete()
                    })
                    .catch(console.error);
                }
        }
    } else {
        
        let attachments = message.attachments
        let channel = message.mentions.channels.first()
        
        if(attachments) {
            
            let arrayMsg = message.content.split(/ +/g)
            
            if(arrayMsg.length > 2) {
                
                arrayMsg.shift()
                arrayMsg.shift()
                let content = arrayMsg.join(" ")
                channel.send(content, message.attachments.first()).then(msg => {
                    message.delete()
                })
                .catch(console.error);
            } else {
                
                channel.send("", message.attachments.first()).then(msg => {
                    message.delete()
                })
                .catch(console.error);
            }
            
            
        } else {
            
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
    
    
}
module.exports.help = {
    
    name : 'msg',
    aliases : ['msg'],
    category : 'misc',
    description : 'Envoi un message spécifié dans un channel ou en MP',
    cooldown : 10,
    usage : '<#channel> <votre_message> ou <@user> <votre_message>',
    exemple :["msg @Smaug Message","msg #spiritus Message"],
    isUserAdmin: false,
    permissions : false,
    args : true
}
