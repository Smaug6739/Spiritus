const { MessageEmbed,WebhookClient} = require("discord.js");
module.exports.run = async (client, message, args, settings) => {
    if(!args[0]){
        const embed = new MessageEmbed()
        .setTitle('Commande commande')
        .setDescription(`La commande __commande__ permet de gérer les commandes personalisées du serveur grâces aux sous commandes suivantes :\n\n${client.config.emojis.fleche}__commande liste__ permet voir la liste des commandes personalisées.\n${client.config.emojis.fleche}__commande create__ permet de crée une commande.\n${client.config.emojis.fleche}__commande delete__ permet de supprimer une commande peronalisée.`)
        .setColor(`${client.config.color.EMBEDCOLOR}`)
        .setTimestamp()
        .setFooter('BOT ID : 689210215488684044')
        return message.channel.send(embed)
      }
    if( args[0].toLowerCase() === 'create' || args[0].toLowerCase() === 'add' ){
        if (args.length < 2 && !message.attachments.first()) {
            const commandeCreateDescription = new MessageEmbed()
            .setTitle(`Sous commande : ${settings.prefix}command create`)
            .setColor(client.config.color.EMBEDCOLOR)
            .setDescription(`**Module :** Manangement\n**Description :** Permet de crée une commande\n**Usage : **${settings.prefix}commande create [nom] [Contenu de la commande]\n**Exemples :** \n ${settings.prefix}commande create invite https://discord.gg/TC7Qjfs`)
            .setFooter('BOT ID : 689210215488684044')
            .setTimestamp()
              return message.channel.send(commandeCreateDescription)
          }
        try{
            const title = args[1].toLowerCase()
            if(settings.commandes){
                if(settings.commandes.length > 19) return message.channel.send(`${client.config.emojis.error}Vous avez atteint le nombre maximal de commandes personalisées pour ce serveur`)
                let customCommand = settings.commandes.find(e => e.nom == title)
                if(customCommand) return message.channel.send(`${client.config.emojis.error}Une commande portant ce nom existe déja sur ce serveur.`)
            }
            const contenu = args.slice(2).join(' ')
            if(contenu.length > 1800)return message.channel.send(`${client.config.emojis.error} Le contenu de la commande est trop long. `)
            let tableau = []
            tableau = settings.commandes
            tableau.push({nom: title, contenu: contenu })
            await client.updateGuild(message.guild, { commandes: tableau});
            message.channel.send(`${client.config.emojis.success}J'ai bien crée cette commande.`);
        }catch(e){
            message.channel.send(`${client.config.emojis.error}Une erreur est survenue merci de réessayer.`)
            const webhookClient  = new WebhookClient(`${client.config.webhooks.errors.ID}`, `${client.config.webhooks.errors.TOKEN}`);
            const embed = new MessageEmbed()
            .setAuthor(`${message.author.username}#${message.author.discriminator}`,`${message.author.displayAvatarURL()}`)
            .setTitle("Commandes personalisées erreur :")
            .setDescription(`__**Contenu du message :**__ \`${message.content}\` [Jump to message](https://discord.com/channels/${message.channel.guild.id}/${message.channel.id}/${message.id})`)
            .addField('Mention :',`User : <@${message.author.id}>`,true)
            .addField('Guild :',`ID : \`${message.guild.id}\` Name : \`${message.guild.name}\``,false)
            .addField('Channel :',`ID : \`${message.channel.id}\` Name : \`${message.channel.name}\``,true)
            .addField(`Erreur message :`,`\`\`\`js\n${e.message}\`\`\``,false)
            .addField(`Erreur complète :`,`\`\`\`js\n${e.stack}\`\`\``,false)
            .setColor('#0099ff')
            .setTimestamp()
            .setFooter('BOT ID : 689210215488684044');
            webhookClient.send(`<@${client.config.owner.id}>`,{
            embeds: [embed],
            });
        }
    }
    if(args[0].toLowerCase() === 'delete' || args[0].toLowerCase() === 'rem' ){
        if(!args[1]){
            const commandDeleteDescription = new MessageEmbed()
            .setTitle(`Sous commande : ${settings.prefix}command delete`)
            .setColor(client.config.color.EMBEDCOLOR)
            .setDescription(`**Module :** Manangement\n**Description :** Permet de supprimer une commande\n**Usage : ** ${settings.prefix}commande delete [nom]\n**Exemples :** \n ${settings.prefix}commande delete invite`)
            .setFooter('BOT ID : 689210215488684044')
            .setTimestamp()
            return message.channel.send(commandDeleteDescription)
        }
        if(settings.commandes){
            if (args.length == 2 && args[1] == 'all') {
                settings.commandes.splice(0, settings.commandes.length);
                settings.save();
                return message.channel.send(`${client.config.emojis.success} Toutes les commandes personalisées de ce serveur ont bien été supprimés.`);
            } else {
                const title = args[1].toLowerCase()
                let customCommand = settings.commandes.find(e => e.nom == title)
                if(customCommand){
                    client.updateGuild(message.guild, {$pull:{ commandes: {nom: title} }});
                    message.channel.send(`${client.config.emojis.success} J'ai bien supprimer cette commande.`)
                } 
                else return message.channel.send(`${client.config.emojis.error} Je n'ai pas trouver cette commande.`)
            }
        } else {
            return message.channel.send(`${client.config.emojis.error} Il n'y a aucune commande personalisée sur ce serveur.`)
        }
    }
    if(args[0].toLowerCase() == 'liste'){
        if(settings.commandes){
            const embed = new MessageEmbed()
            .setAuthor(`Liste des commandes personalisées de ce serveur`, client.user.displayAvatarURL())
            .setColor(`${client.config.color.EMBEDCOLOR}`)
            if (message.guild.iconURL()) embed.setThumbnail(`${message.guild.iconURL()}`)
            let commandes = settings.commandes.forEach(element => {
                embed.addField(`\u200b`,`Commande : \`${element.nom}\``,false)
            });
            message.channel.send(embed)
        }else{
            return message.channel.send(`${client.config.emojis.error} Il n'y a aucune commande personalisée sur ce serveur.`)
        }

    }
};
module.exports.help = {
    
    name: "commande",
    aliases: ['commande','commandes'],
    category: 'administration',
    description: "Gère les commandes personalisées.",
    cooldown: 10,
    usage: '<action> <valeur>',
    exemple :[''],
    isUserAdmin: false,
    permissions: true,
    args: false,
    sousCommdandes : ["commande liste","commande create","commande delete"]
}