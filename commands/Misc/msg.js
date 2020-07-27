//const { MessageEmbed } = require("discord.js")
module.exports.run = (client, message, args) => {
    message.channel.send(args.join(' '))
    /*if (args[1]) {
        if (!message.guild.me.hasPermission('MANAGE_MESSAGES')) return message.channel.send(`${client.config.emojis.FALSE}Je n'ai pas la permission de modifier le serveur.`);
        if (typeof message.mentions.channels.first() === 'undefined') {
            if (typeof message.mentions.users.first() !== 'undefined') {
                let attachments = message.attachments
                let user = message.mentions.users.first()
                let arrayMsg = message.content.split(/ +/g)
                arrayMsg.shift()
                arrayMsg.shift()
                let content = arrayMsg.join(" ")
                if (attachments) {
                    user.send("**Message de l'administration : **" + content, message.attachments.first()).then(msg => {
                        message.delete()
                    })
                        .catch(console.error);
                } else {
                    user.send("**Message de l'administration : **" + content, attachments).then(msg => {
                        message.delete()
                    })
                        .catch(console.error);
                }
            }
        } else {
            let attachments = message.attachments
            let channel = message.mentions.channels.first()
            if (attachments) {
                let arrayMsg = message.content.split(/ +/g)
                if (arrayMsg.length > 2) {
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
    } else {
        const embed = new MessageEmbed()
            .setTitle('Commande message')
            .setColor(`${client.config.color.EMBEDCOLOR}`)
            .setDescription(`La commande __message__ permet d'envoyer un message a une personne ou dans un channel grace aux sous commandes suivantes :\n\n${client.config.emojis.FLECHE}__message @user__ envoi un message dans les MP d\'une personne.\n${client.config.emojis.FLECHE}__message #channel__ envoi un message dans un channel.`)
            .setTimestamp()
            .setFooter('BOT ID : 689210215488684044')
        message.channel.send(embed)
    }*/
}
module.exports.help = {

    name: 'say',
    aliases: ['say'],
    category: 'misc',
    description: 'Permet d\'envoyer un message.',
    cooldown: 10,
    usage: 'text',
    exemple: ["say Spiritus is ce best bot !"],
    isUserAdmin: false,
    permissions: true,
    args: true,
    sousCommdandes: []
}
