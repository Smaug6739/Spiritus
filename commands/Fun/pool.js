const {MessageEmbed} = require('discord.js')
module.exports.run = async (client, message, args, settings) => {
    const question = args.join(' ')
    const embed = new MessageEmbed()
    .setAuthor(`${message.author.username}`,`${message.author.displayAvatarURL()}`)
    .setColor(client.config.color.EMBEDCOLOR)
    .setDescription(`**Sondage de ${message.author.username} :**\n${question}`)
    .addField(`\u200b`,`🟩 Pour (Oui)\n🟦 Neutre\n🟥 Contre (Non)`)
    .setTimestamp()
    .setFooter(`Module de la commande : Fun`)
    const msg = await message.channel.send(embed)
    await msg.react('🟩')
    await msg.react('🟦')
    await msg.react('🟥')
};
  
module.exports.help = {
    name: "pool",
    aliases: ['pool'],
    category: 'fun',
    description: "Envoie un sondage.",
    cooldown: 3,
    usage: '<question>',
    exemple :["pool <question>"],
    isUserAdmin: false,
    permissions: false,
    args: true,
    sousCommdandes : []
};