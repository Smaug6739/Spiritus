const {MessageEmbed}= require('discord.js');
module.exports.run = async (client, message, args,settings) => {
    const embed = new MessageEmbed()
    .setTitle(`Lien d'invitation :`)
    .setColor(client.config.color.EMBEDCOLOR)
    .setDescription(`https://discordapp.com/oauth2/authorize?client_id=${client.user.id}&scope=bot&permissions=1946446974`)
    .setTimestamp()
    message.channel.send(embed)  
}
module.exports.help = {
    name : 'invite',
    aliases : ['invite'],
    category : 'bot',
    description : 'Donne le lien d\'invitetion du bot.',
    cooldown : 10,
    usage : '<action> <args>',
    exemple :["ignore add @Channel"],
    permissions : false,
    isUserAdmin: false,
    args : false,
    sousCommdandes : ["ignore add","ignore rem","ignore liste"]
}
