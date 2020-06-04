const {MessageEmbed} = require('discord.js')
const {LOGOBOT} = require('./../../configstyle')

module.exports.run = async(client, message, args, settings, dbUser) => {
    
    if(settings.expsysteme){
        let uti = message.mentions.members.first() || message.author
        if(!dbUser){
            setTimeout(async function () {
                const use = await client.getUser(message.member, message.member.guild.id);
                
                message.reply(`tu possède ${use.experience} points d'experience !`);
              },2000)
        }else{
            const embed = new MessageEmbed()
                .setTitle(`${LOGOBOT} User experience : ${uti.tag}`)
                .setColor('0x00FF00')
                .setThumbnail(uti.displayAvatarURL())
                .setDescription(`Points d'experience : ${dbUser.experience}xp\nNiveau : ${dbUser.level}\nNiveau suivant : ${dbUser.level+1}`)
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
    usage : '',
    //exemple :["channel-create text nom"],
    permissions : false,
    isUserAdmin: false,
    args : false
}