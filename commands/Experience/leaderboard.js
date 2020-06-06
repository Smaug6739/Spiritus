const {MessageEmbed} = require('discord.js')
const {EMBED} = require('./../../configstyle')
module.exports.run = async(client, message, args, settings, dbUser) => {
    if(settings.expsysteme){
        const embed = new MessageEmbed()
        .setTitle('Classement du TOP 10 des utilisateurs du serveur')
        .setColor(EMBED)
        .setThumbnail(`${message.guild.iconURL()}`)
        .setTimestamp()
        .setFooter('BOT ID : 689210215488684044')

        await client.getUsers(message.guild).then(p =>{
            console.log(p)
           p.sort((a, b) =>(a.experience < b.experience) ? 1 : -1).splice(0, 10).forEach(e =>{
               embed.addField(e.username, `${e.experience} points d'experience level : ${e.level}`)
           })
        })
        message.channel.send(embed)

     




    }else{
        return message.channel.send('Le système d\'exp n\'est pas activé sur ce serveur.');
    }
  };


module.exports.help = {

name : 'leaderboard',
aliases : ['leaderboard','lead'],
category : 'experience',
description : 'Top 10 des utilisateurs sur le serveur',
cooldown : 10,
usage : '',
//exemple :["channel-create text nom"],
permissions : false,
isUserAdmin: false,
args : false
}