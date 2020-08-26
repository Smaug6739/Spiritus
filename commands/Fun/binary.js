const {MessageEmbed} = require('discord.js')
module.exports.run = (client, message, args, settings) => {
    let text = args.join(' ');
        let result = '';
        for (let i = 0; i < text.length; i++) {
            let bin = text[i].charCodeAt().toString(2);
            result += Array(8 - bin.length + 1).join('0') + bin;
        }
        if(result.length > 1999) result = 'Le resultat est trop long. Discord limite les messages à 2000 caractères.'
        const embed = new MessageEmbed()
        .setTitle(`Convertion binaire`)
        .setColor(client.config.color.EMBEDCOLOR)
        .setDescription(result)
        .setTimestamp()
        .setFooter(`Module de la commande : Fun`)
        return message.channel.send(embed);
};
  
module.exports.help = {
    name: "binary",
    aliases: ['binary'],
    category: 'fun',
    description: "Transforme du texte en binaire.",
    cooldown: 3,
    usage: '<texte>',
    exemple :["binary Spiritus"],
    isUserAdmin: false,
    permissions: false,
    args: true,
    sousCommdandes : []
};