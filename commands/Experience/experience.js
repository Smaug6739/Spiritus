const { MessageEmbed } = require("discord.js") 
module.exports.run = async(client, message, args, settings) => {
    if(settings.expsysteme){
        
        if(!args[0]){
            const embed = new MessageEmbed()
            .setTitle('Commande experience')
            .setDescription('La commande `experience` permet de gérer l\'experience des membres du serveur graces aux sous commandes suivantes :')
            .addFields(
                { name: '\u200b', value: `${client.config.emojis.FLECHE}\`experience add\` permet de donner de l\'exp a un membre.`, inline: false },
                { name: '\u200b', value: `${client.config.emojis.FLECHE}\`experience rem\` permet de supprimer de l\'exp a un membre.`, inline: false })
            .setTimestamp()
            .setFooter('BOT ID : 689210215488684044')
            return message.channel.send(embed)
        }
        //-------------------------------------------ADD-EXPERIENCE-----------------------------------------
        if(args[0].toLowerCase() === 'add'){
            const user = message.guild.member(message.mentions.users.first());
            const expToAdd = parseInt(args[2]);
            if((message.mentions.users.first())){
            if (isNaN(expToAdd)) return message.reply("vous devez entrer un nombre valide !");
            if(!user)return message.channel.send(`${client.config.emojis.FALSE} Je ne peux pas ajouter de l'exp a cette personne.`)
           await client.addExp(client, user, expToAdd);
            message.channel.send(`Vous avez ajouté avec succès ${expToAdd} points d'expérience à l'utilisateur ${user}!`);
            }else{
                message.channel.send(`${client.config.emojis.FALSE}Vous ne pouvez pas utiliser cette commande sur un bot.`)
            }
        //-------------------------------------------REM-EXPERIENCE-----------------------------------------
        }else if(args[0].toLowerCase() === 'rem'){
            const user = message.guild.member(message.mentions.users.first());
            const expToRemove = parseInt(args[2]);
            if((message.mentions.users.first())){
            if (isNaN(expToRemove)) return message.reply("vous devez entrer un nombre valide !");
            if(!user)return message.channel.send(`${client.config.emojis.FALSE} Je ne peux pas enlever de l'exp a cette personne.`)
           await client.removeExp(client, user, expToRemove)
            .then(message.channel.send(`Vous avez enlevé avec succès ${expToRemove} points d'expérience à l'utilisateur ${user}!`))
        }else{
            message.channel.send(`${client.config.emojis.FALSE}Vous ne pouvez pas utiliser cette commande sur un bot.`)
        }
        }
    }else{
        return message.channel.send(`${client.config.emojis.FALSE}Le système d'experience n'est pas activer sur ce serveur. Pour l'activer utilisez la commande \`${settings.prefix}systeme-experience\``)
    };
};
module.exports.help = {

name : 'experience',
aliases : ['experience'],
category : 'experience',
description : 'Ajoute ou enleve de l\'exp à une personne.',
cooldown : 10,
usage : '<@user> <nb_experience>',
exemple :["remexp @Smaug 1500"],
permissions : true,
isUserAdmin: false,
args : false,
sousCommdandes : ["experience add", "experience rem"]

}