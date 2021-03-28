const { MessageEmbed } = require('discord.js')
module.exports.run = async (client, message, args, settings, dbUser) => {
    if (!message.member.permissions.has('MANAGE_GUILD')) return message.channel.send(`${client.config.emojis.error}Vous devez avoir la permission de gérer le serveur pour utiliser cette commande.`);
    if (!args[0]) {
        const embed = new MessageEmbed()
            .setTitle('Commande adminshop')
            .setColor(`${client.config.color.EMBEDCOLOR}`)
            .setDescription(`La commande __adminshop__ permet de gérer le shop du serveur grâce aux sous commandes suivantes :\n\n${client.config.emojis.FLECHE}__adminshop add__ permet d'ajouter un objet au shop'.\n${client.config.emojis.FLECHE}__adminshop rem__ permet de supprimer un objet du shop.`)
            .setTimestamp()
            .setFooter('BOT ID : 689210215488684044')
        return message.channel.send(embed)
    }
    if (args[0].toLowerCase() === 'add') {
        const adminShopAdd = new MessageEmbed()
            .setTitle(`Sous commande : ${settings.prefix}adminshop add`)
            .setColor(client.config.color.EMBEDCOLOR)
            .setDescription(`**Module :** Economie\n**Description :** Permet de crée un nouvel objet sur le shop\n**Usage : **${settings.prefix}adminshop add [nom] [prix] [description]\n**Exemples :** \n ${settings.prefix}adminshop add Spiritus 15 Un très bel objet au nom du bot`)
            .setFooter(`BOT ID : ${client.user.id}`)
            .setTimestamp()
        if (args.length < 4) return message.channel.send(adminShopAdd)
        if (settings.shop.length > 14) return message.channel.send(`${client.config.emojis.error}Votre serveur à atteint le nombre maximal d'articles pouvant etre contenu dans le shop (15).`)
        const objetName = args[1]
        const objetPrix = parseInt(`${args[2]}`)
        const objetDescription = args.slice(3).join(' ')
        if (objetName.length > 30) return message.channel.send(`${client.config.emojis.error}Vous ne pouvez pas choisir un nom de plus de 30 caractères.`)
        if (objetDescription.length > 300) return message.channel.send(`${client.config.emojis.error} Vous ne pouvez pas choisir une description de plus de 300 caractères.`)
        if (isNaN(objetPrix) == true) return message.channel.send(`${client.config.emojis.error}Veuillez donner un nombre en prix à la place de \`${args[2]}\` .`);
        if (objetPrix > 999) return message.channel.send(`${client.config.emojis.error}Vous ne pouvez pas choisir un prix de plus de 999 ${client.config.emojis.coins}.`)
        if (settings.shop) {
            let existObj = settings.shop.find(e => e.name == objetName)
            if (existObj) return message.channel.send(`${client.config.emojis.error}Un objet avec ce nom existe déja dans la boutique merci de choisir un autre nom.`)
            let tableau = []
            tableau = settings.shop
            tableau.push({
                name: objetName,
                price: objetPrix,
                description: objetDescription,
                redwareRole: '',
                redwareMemberID: ''
            })
            await client.updateGuild(message.guild, { shop: tableau });
            message.channel.send(`${client.config.emojis.success}L'objet \`${objetName}\` à bien été ajouter dans le shop.`)
        }
    }
    if (args[0].toLowerCase() === 'rem') {
        if (settings.shop) {
            if (args.length == 2 && args[1] == 'all') {
                settings.shop.splice(0, settings.shop.length);
                settings.save();
                return message.channel.send(`${client.config.emojis.success} Toutes les objets du shop ont bien été supprimés.`);
            } else {
                const title = args[1]
                let objet = settings.shop.find(e => e.name == title)
                if (objet) {
                    client.updateGuild(message.guild, { $pull: { shop: { name: title } } });
                    message.channel.send(`${client.config.emojis.success} J'ai bien supprimer cet objet.`)
                }
                else return message.channel.send(`${client.config.emojis.error} Je n'ai pas trouver cet objet.`)
            }
        } else {
            return message.channel.send(`${client.config.emojis.error} Il n'y a aucun objets dans le shop de ce serveur.`)
        }
    }
}
module.exports.help = {
    name: 'adminshop',
    aliases: ['adminshop', 'admin-shop'],
    category: 'economie',
    description: 'Configure la boutique.',
    cooldown: 10,
    usage: '',
    exemple: [''],
    isUserAdmin: false,
    permissions: false,
    args: false,
    sousCommdandes: []
}
