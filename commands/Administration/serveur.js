const {MessageEmbed} = require('discord.js')
module.exports.run =(client, message, args,settings) => {
    if(!args[0]){
        const embed = new MessageEmbed()
        .setTitle('Commande serveur')
        .setColor(`${client.config.color.EMBEDCOLOR}`)
        .setDescription(`La commande __serveur__ permet de gérer le serveur graces aux sous commandes suivantes :\n\n${client.config.emojis.fleche}__serveur icon__ permet de changer l'icon du serveur.\n${client.config.emojis.fleche}__serveur name__ permet de changer le nom du serveur\n${client.config.emojis.fleche}__serveur region__ permet de gérer la région du servur.\n${client.config.emojis.fleche}__serveur moderation__ permet de gérer le niveau de moderation du serveur.\n${client.config.emojis.fleche}__serveur invite-create__ permet de crée une invitation.\n${client.config.emojis.fleche}__serveur webhook-create__ permet de crée un webhook.`)
        .setTimestamp()
        .setFooter('BOT ID : 689210215488684044')
        return message.channel.send(embed)
    }
    
    if(args[0].toLowerCase() === 'icon'){
        if(!message.member.hasPermission('MANAGE_GUILD'))return message.channel.send(`${client.config.emojis.error}Vous devez avoir la permission de gérer le serveur pour utiliser cette commande.`)
        if(!message.guild.me.hasPermission('MANAGE_GUILD')) return message.channel.send(`${client.config.emojis.error}Je n'ai pas la permission de modifier le serveur.`);
        if(message.attachments.first()){
            icon = message.attachments.first().url
            message.guild.setIcon(icon)
            .then(message.channel.send(`${client.config.emojis.success}L'icon du serveur a bien été changé.`))
            .catch(`${client.config.emojis.error}Une erreur s'est produite. Merci de vérifier la taille du fichier et de réessayer`)
        }else{
            const serveurIconDescription = new MessageEmbed()
            .setTitle(`Sous commande : ${settings.prefix}serveur icon`)
            .setColor(client.config.color.EMBEDCOLOR)
            .setDescription(`**Module :** Manangement\n**Description :** Permet de changer l'icon du serveur\n**Usage : **${settings.prefix}serveur icon [Aucun]\n**Exemples :** \n ${settings.prefix}serveur icon (attachement)`)
            .setFooter('BOT ID : 689210215488684044')
            .setTimestamp()
            return message.channel.send(serveurIconDescription)
        }
    }
    if(args[0].toLowerCase() === 'name'){
        if(!message.member.hasPermission('MANAGE_GUILD'))return message.channel.send(`${client.config.emojis.error}Vous devez avoir la permission de gérer le serveur pour utiliser cette commande.`)
        if(!message.guild.me.hasPermission('MANAGE_GUILD')) return message.channel.send(`${client.config.emojis.error}Je n'ai pas la permission de modifier le serveur.`);
        const serveurNameDescription = new MessageEmbed()
            .setTitle(`Sous commande : ${settings.prefix}serveur name`)
            .setColor(client.config.color.EMBEDCOLOR)
            .setDescription(`**Module :** Manangement\n**Description :** Permet de changer le nom du serveur\n**Usage : ** ${settings.prefix}serveur name [new_name]\n**Exemples :** \n ${settings.prefix}serveur name Spiritus support`)
            .setFooter('BOT ID : 689210215488684044')
            .setTimestamp()
            if(!args[1])return message.channel.send(serveurNameDescription)
        let newName = args.slice(1).join(" ")
        if(newName.length < 2) return message.channel.send(`${client.config.emojis.error}Le nom doit comporter au moins 2 caractères.`)
        message.guild.setName(newName)
        .then(message.channel.send(`${client.config.emojis.success}J'ai bien mis a jour le nom du serveur avec \`${newName}\``))
    }
    if(args[0].toLowerCase() === 'region'){
        if(!message.member.hasPermission('MANAGE_GUILD'))return message.channel.send(`${client.config.emojis.error}Vous devez avoir la permission de gérer le serveur pour utiliser cette commande.`)
        if(!message.guild.me.hasPermission('MANAGE_GUILD')) return message.channel.send(`${client.config.emojis.error}Je n'ai pas la permission de modifier le serveur.`);
        const serveurRegionDescription = new MessageEmbed()
        .setTitle(`Sous commande : ${settings.prefix}serveur region`)
        .setColor(client.config.color.EMBEDCOLOR)
        .setDescription(`**Module :** Manangement\n**Description :** Permet de changer la région du serveur\n**Usage : **${settings.prefix}serveur region [region]\n**Exemples :** \n ${settings.prefix}serveur region singapore`)
        .setFooter('BOT ID : 689210215488684044')
        .setTimestamp()
        if(!args[1])return message.channel.send(serveurRegionDescription)
        //let region = ['us-south'||'russia'||'japan'||'dubai'||'us-west'||'brazil'||'hongkong'||'singapore'||'us-central'||'india'||'europe'||'eu-west'||'us-east'||'london'||'frankfurt'||'eu-central'||'sydney'||'southafrica'||'south-korea'||'amsterdam']
        if(args[1] === 'us-south'||args[1] ==='russia'||args[1] ==='japan'||args[1] ==='dubai'||args[1] ==='us-west'||args[1] ==='brazil'||args[1] ==='hongkong'||args[1] ==='singapore'||args[1] ==='us-central'||args[1] ==='india'||args[1] ==='europe'||args[1] ==='eu-west'||args[1] ==='us-east'||args[1] ==='london'||args[1] ==='frankfurt'||args[1] ==='eu-central'||args[1] ==='sydney'||args[1] ==='southafrica'||args[1] ==='south-korea'||args[1] ==='amsterdam'){
        message.guild.setRegion(args[1]).then(
            message.channel.send(`${client.config.emojis.success}J'ai bien mis a jour la région du serveur avec \`${args[1]}\``)
        )
        }else{
            return message.channel.send(`${client.config.emojis.error}Merci de choisir une valeur valide (\`south-korea\`, \`dubai\`, \`london\`, \`us-central\`, \`eu-west\`, \`brazil\`, \`japan\`, \`southafrica\`, \`frankfurt\`, \`sydney\`, \`india\`, \`us-south\`, \`europe\`, \`us-east\`, \`hongkong\`, \`eu-central\`, \`singapore\`, \`russia\`, \`us-west\`, \`amsterdam\`). `)
        }
    }
    if(args[0].toLowerCase() === 'moderation'){
        if(!message.member.hasPermission('MANAGE_GUILD'))return message.channel.send(`${client.config.emojis.error}Vous devez avoir la permission de gérer le serveur pour utiliser cette commande.`)
        if(!message.guild.me.hasPermission('MANAGE_GUILD')) return message.channel.send(`${client.config.emojis.error}Je n'ai pas la permission de modifier le serveur.`);
        const serveurModerationDescription = new MessageEmbed()
        .setTitle(`Sous commande : ${settings.prefix}serveur moderation`)
        .setColor(client.config.color.EMBEDCOLOR)
        .setDescription(`**Module :** Manangement\n**Description :** Permet de changer le niveau de modération du serveur\n**Usage : **${settings.prefix}serveur moderation [Niveau modération]\n**Exemples :** \n ${settings.prefix}serveur moderation 3`)
        .setFooter('BOT ID : 689210215488684044')
        .setTimestamp()
        if(!args[1])return message.channel.send(serveurModerationDescription)
        let newLevel = args[1];
        let levelEdit = '';
        if(args[1] != 1 && args[1] != 2 && args[1] != 3 && args[1] != 4 && args[1] != 5 ) return message.channel.send(`${client.config.emojis.error} Merci d'indiquer une valeur entre 1 et 5`)
        if(newLevel === '1') levelEdit = 'NONE'
        if(newLevel === '2') levelEdit = 'LOW'
        if(newLevel === '3') levelEdit = 'MEDIUM'
        if(newLevel === '4') levelEdit = 'HIGH'
        if(newLevel === '5') levelEdit = 'VERY_HIGH'
        message.guild.edit({verificationLevel: levelEdit})
        .then(message.channel.send(`${client.config.emojis.success}J'ai bien mis a jour le niveau de moderation du serveur par \`${newLevel}\``))
    }
    if(args[0].toLowerCase() === 'invite-create'){
        if(!message.member.hasPermission('CREATE_INSTANT_INVITE'))return message.channel.send(`${client.config.emojis.error}Vous devez avoir la permission de crée une invitation.`)
        if(!message.guild.me.hasPermission('CREATE_INSTANT_INVITE')) return message.channel.send(`${client.config.emojis.error}Je n'ai pas la permission de crée une invitation.`);
        message.channel.createInvite().then(invite =>    
        invite.channel.send( new MessageEmbed()
        .setAuthor('Création d\'une invitation')
        .setColor(client.config.color.EMBEDCOLOR)
        .setDescription(`Une invitation à été crée avec le code \`${invite.code}\``)
        .addFields({name:'\u200b',value:`https://discord.gg/${invite.code}`,inline:false})
        .setTimestamp())
        ).catch(console.error);
    }
    if(args[0].toLowerCase() === 'webhook-create'){
        if(!message.member.hasPermission('MANAGE_WEBHOOKS'))return message.channel.send(`${client.config.emojis.error}Vous devez avoir la permission de gérer les webhooks.`)
        if(!message.guild.me.hasPermission('MANAGE_WEBHOOKS')) return message.channel.send(`${client.config.emojis.error}Je n'ai pas la permission de gérer les webhooks.`);
        message.channel.createWebhook('Webhook', {
            reason: 'Création d\'un webhook'}).then(webhook =>
            client.channels.cache.get(webhook.channelID).send(new MessageEmbed()
            .setAuthor('Création d\'un webhook')
            .setColor(client.config.color.EMBEDCOLOR)
            .setThumbnail(message.guild.iconURL())
            .setDescription(`__Name :__ ${webhook.name}\n__ID :__ ${webhook.id}\n__Type :__ ${webhook.type}\n__Guild :__ ${webhook.guildID}\n__Channel :__ ${webhook.channelID}`))
            ).catch(console.error);
    }
   
}
module.exports.help = {  
    name : 'serveur',
    aliases : ['serveur'],
    category : 'administration',
    description : 'Permet de gérer le serveur.',
    cooldown : 5,
    usage : '<action> <value>',
    exemple :['serveur name Spiritus'],
    permissions : false,
    isUserAdmin: false,
    args : false,
    sousCommdandes : ['serveur icon','serveur name','serveur region','serveur moderation','serveur invite-create','serveur webhook-create']
}

