const {MessageEmbed} = require('discord.js')
const {LOGOBOT,FALSE} = require('./../../configstyle')

module.exports.run = async(client, message, args, settings, dbUser) => {
    
    if(settings.expsysteme){

        if(!dbUser) return message.channel.send("Vous n'avez jamais envoyer de messages. Merci de réessayer.")

        let uti = message.mentions.members.first() || message.author
        const user = message.guild.member(message.mentions.users.first());
        
        if(message.mentions.users.first()){
            try{
                const mentionUser = await client.getUser(user, message.member.guild.id)
                
                const embed = new MessageEmbed()
                .setTitle(`${LOGOBOT} User experience : ${user.user.tag}`)
                .setColor('0x00FF00')
                .setThumbnail(user.user.displayAvatarURL())
                .setDescription(`Points d'experience : ${mentionUser.experience}xp\nNiveau : ${mentionUser.level}\nNiveau suivant : ${mentionUser.level+1}`)
                message.channel.send(embed)            
            }catch(err){
                return message.channel.send(`${FALSE}Cet utilisateur n'a jamais envoyer de messages sur ce serveur.`)
            }
            
        }else{

            const embed = new MessageEmbed()
                .setTitle(`${LOGOBOT} User experience : ${uti.tag}`)
                .setColor('0x00FF00')
                .setThumbnail(uti.displayAvatarURL())
                .setDescription(`Points d'experience : ${dbUser.experience}xp\nNiveau : ${dbUser.level}\nNiveau suivant : ${dbUser.level+1}\n`)
                message.channel.send(embed)
        }

    }else{
       return message.channel.send('Le système d\'exp n\'est pas activé sur ce serveur.');
    }
}
module.exports.help = {
    
    name : 'userexperience',
    aliases : ['userexperience','uexp','rank'],
    category : 'experience',
    description : 'Donne l\'exp d\'une personne.',
    cooldown : 10,
    usage : '<@user>',
    exemple :["uexp @Smaug"],
    permissions : false,
    isUserAdmin: false,
    args : false,
    sousCommdandes : []
}