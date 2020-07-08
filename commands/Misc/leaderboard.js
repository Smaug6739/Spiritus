const {MessageEmbed} = require('discord.js')
module.exports.run = async(client, message, args, settings, dbUser) => {
    if(settings.expsysteme){
        const embed = new MessageEmbed()
        .setTitle('Classement du TOP 10 des utilisateurs du serveur')
        .setColor(client.config.color.EMBEDCOLOR)
        .setThumbnail(`${message.guild.iconURL()}`)
        .setTimestamp()
        .setFooter('BOT ID : 689210215488684044')
        await client.getUsers(message.guild).then(p =>{
            //console.log(p)
           p.sort((a, b) =>(a.experience < b.experience) ? 1 : -1).splice(0, 10).forEach(e =>{
               embed.addField(e.username, `${e.experience} points d'experience level : ${e.level}`)
           })
        })
        message.channel.send(embed)

    }else{
        return message.channel.send(`${client.config.emojis.FALSE}Le système d'experience n'est pas activer sur ce serveur. Pour l'activer utilisez la commande \`${settings.prefix}config experience\``)
    }
  };


module.exports.help = {

name : 'leaderboard',
aliases : ['leaderboard','lead'],
category : 'misc',
description : 'Top 10 des utilisateurs sur le serveur',
cooldown : 10,
usage : '',
exemple :[],
permissions : false,
isUserAdmin: false,
args : false,
sousCommdandes : []

}