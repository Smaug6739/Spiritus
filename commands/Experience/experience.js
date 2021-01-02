const { MessageEmbed } = require("discord.js") 
module.exports.run = async(client, message, args, settings) => {
    if(settings.expsysteme){
        
        if(!args[0]){
            const embed = new MessageEmbed()
            .setTitle('Commande experience')
            .setColor(`${client.config.color.EMBEDCOLOR}`)
            .setDescription(`La commande __experience__ permet de gérer l'experience des membres du serveur graces aux sous commandes suivantes :\n\n${client.config.emojis.FLECHE}__experience add__ permet de donner de l'exp a un membre.\n${client.config.emojis.FLECHE}__experience rem__ permet de supprimer de l'exp a un membre.`)
            .setTimestamp()
            .setFooter('BOT ID : 689210215488684044')
            return message.channel.send(embed)
        }
        //-------------------------------------------ADD-EXPERIENCE-----------------------------------------
        if(args[0].toLowerCase() === 'add'){
            const helpEmbedAdd = new MessageEmbed()
            .setTitle(`Sous commande : ${settings.prefix}experience add`)
            .setColor(client.config.color.EMBEDCOLOR)
            .setDescription(`**Module :** Misc\n**Description :** Permet de donner de l'exp à une personne.\n**Usage :** [mention]\n**Exemples :** \n ${settings.prefix}experience add @Smaug 1500`)
            .setFooter('BOT ID : 689210215488684044')
            .setTimestamp()
            if(!args[2])return message.channel.send(helpEmbedAdd)
            const user = message.guild.member(message.mentions.users.first());
            const expToAdd = parseInt(args[2]);
            if((message.mentions.users.first())){
            if (isNaN(expToAdd)) return message.channel.send(`${client.config.emojis.error} Veuillez entrer un nombre valide.`);
            if(!user)return message.channel.send(`${client.config.emojis.error} Je ne peux pas ajouter de l'exp a cette personne.`)
           await client.addExp(client, user, expToAdd);
            message.channel.send(`Vous avez ajouté avec succès ${expToAdd} points d'expérience à l'utilisateur ${user}!`);
            }else{
                message.channel.send(`${client.config.emojis.error}Vous ne pouvez pas utiliser cette commande sur un bot.`)
            }
        //-------------------------------------------REM-EXPERIENCE-----------------------------------------
        }else if(args[0].toLowerCase() === 'rem'){
            const helpEmbedRem = new MessageEmbed()
            .setTitle(`Sous commande : ${settings.prefix}experience rem`)
            .setColor(client.config.color.EMBEDCOLOR)
            .setDescription(`**Module :** Misc\n**Description :** Permet d'enlever de l'exp à une personne.\n**Usage :** [mention]\n**Exemples :** \n ${settings.prefix}experience rem @Smaug 1500`)
            .setFooter('BOT ID : 689210215488684044')
            .setTimestamp()
            if(!args[2])return message.channel.send(helpEmbedRem)
            const user = message.guild.member(message.mentions.users.first());
            const expToRemove = parseInt(args[2]);
            if((message.mentions.users.first())){
            if (isNaN(expToRemove)) return message.channel.send(`${client.config.emojis.error} Veuillez entrer un nombre valide.`);
            if(!user)return message.channel.send(`${client.config.emojis.error} Je ne peux pas enlever de l'exp a cette personne.`)
           await client.removeExp(client, user, expToRemove)
            .then(message.channel.send(`Vous avez enlevé avec succès ${expToRemove} points d'expérience à l'utilisateur ${user}!`))
        }else{
            message.channel.send(`${client.config.emojis.error}Vous ne pouvez pas utiliser cette commande sur un bot.`)
        }
        }
    }else{
        return message.channel.send(`${client.config.emojis.error}Le système d'experience n'est pas activer sur ce serveur. Pour l'activer utilisez la commande \`${settings.prefix}config experience\``)
    };
};
module.exports.help = {
    name : 'adminxp',
    aliases : ['adminxp'],
    category : 'experience',
    description : 'Gère l\'exp d\'une personne.',
    cooldown : 10,
    usage : '<@user> <nb_experience>',
    exemple :["remexp @Smaug 1500"],
    permissions : true,
    isUserAdmin: false,
    args : false,
    sousCommdandes : ["experience add", "experience rem"]
}