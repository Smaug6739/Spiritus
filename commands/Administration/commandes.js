const { MessageEmbed,WebhookClient} = require("discord.js");
module.exports.run = async (client, message, args, settings) => {
    if(args[0].toLowerCase() === 'add'){
        try{
            const title = args[1].toLowerCase()
            if(settings.commandes){
                if(settings.commandes.length > 19) return message.channel.send(`${client.config.emojis.FALSE}Vous avez atteint le nombre maximal de commandes personalisées pour ce serveur`)
                let customCommand = settings.commandes.find(e => e.nom == title)
                if(customCommand) return message.channel.send(`${client.config.emojis.FALSE}Une commande portant ce nom existe déja sur ce serveur.`)
            }
            const contenu = args.slice(2).join(' ')
            if(contenu.length > 1800)return message.channel.send(`${client.config.emojis.FALSE} Le contenu de la commande est trop long. `)
            if(!title)return message.channel.send(`${client.config.emojis.FALSE}Merci de d'indiquer un nom à la commande.`)
            if(!contenu)return message.channel.send(`${client.config.emojis.FALSE}Merci de d'indiquer le contenu de la commande.`)
            let tableau = []
            tableau = settings.commandes
            tableau.push({nom: title, contenu: contenu })
            await client.updateGuild(message.guild, { commandes: tableau});
            message.channel.send(`${client.config.emojis.TRUE}J'ai bien crée cette commande.`);
        }catch(e){
            message.channel.send(`${client.config.emojis.FALSE}Une erreur est survenue merci de réessayer.`)
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
    if(args[0].toLowerCase() === 'rem'){
        if(settings.commandes){
            if (args.length == 2 && args[1] == 'all') {
                settings.commandes.splice(0, settings.commandes.length);
                guild.save();
                return message.channel.send(`${client.config.emojis.TRUE} Toutes les commandes personalisées de ce serveur ont bien été supprimés.`);
            } else {
                const title = args[1].toLowerCase()
                if(!title)return message.channel.send(`${client.config.emojis.FALSE} Merci de d'indiquer le nom de la commande a supprimer.`)
                let customCommand = settings.commandes.find(e => e.nom == title)
                if(customCommand){
                    client.updateGuild(message.guild, {$pull:{ commandes: {nom: title} }});
                    message.channel.send(`${client.config.emojis.TRUE} J'ai bien supprimer cette commande cette commande.`)
                } 
                else return message.channel.send(`${client.config.emojis.FALSE} Je n'ai pas trouver cette commande.`)
            }
        } else {
            return message.channel.send(`${client.config.emojis.FALSE} Il n'y a aucune commande personalisée sur ce serveur.`)
        }
    }
    if(args[0].toLowerCase() == 'liste'){
        if(settings.commandes){
            const embed = new MessageEmbed()
            .setAuthor(`Liste des commandes personalisées de ce serveur`, client.user.displayAvatarURL())
            .setColor(`${client.config.color.EMBEDCOLOR}`)
            .setThumbnail(message.guild.iconURL())
            let commandes = settings.commandes.forEach(element => {
                embed.addField(`\u200b`,`Commande : \`${element.nom}\``,false)
            });
            message.channel.send(embed)
        }else{
            return message.channel.send(`${client.config.emojis.FALSE} Il n'y a aucune commande personalisée sur ce serveur.`)
        }

    }
};
module.exports.help = {
    
    name: "commandes",
    aliases: ['commandes'],
    category: 'administration',
    description: "Gère les commandes personalisées.",
    cooldown: 10,
    usage: '',
    exemple :[''],
    isUserAdmin: false,
    permissions: true,
    args: false,
    sousCommdandes : [""]
}