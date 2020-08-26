const {MessageEmbed} = require('discord.js')
module.exports.run = (client, message, args, settings) => {
    const replies = ['Oui','Non','Peut-être']
    const question = args.join(' ')
    const reponce = Math.floor(Math.random() * replies.length)
    const embed = new MessageEmbed()
    .setAuthor(`${message.author.username}`,`${message.author.displayAvatarURL()}`)
    .setColor(client.config.color.EMBEDCOLOR)
    .addField(`${question}`,`${replies[reponce]}`,false)
    .setTimestamp()
    .setFooter(`Module de la commande : Fun`)
    message.channel.send(embed)
};
  
module.exports.help = {
    name: "8ball",
    aliases: ['8ball'],
    category: 'fun',
    description: "Poser une question à la fameuse boule magique.",
    cooldown: 3,
    usage: '<question>',
    exemple :["8ball <question>"],
    isUserAdmin: false,
    permissions: false,
    args: true,
    sousCommdandes : []
};