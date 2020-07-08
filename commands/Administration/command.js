const {MessageEmbed} = require('discord.js')
module.exports.run =async(client, message, args,settings) => {
    if(!args[0]){
        const embed = new MessageEmbed()
        .setTitle('Commande message')
        .setDescription('La commande `message` permet d\'envoyer un message a une personne ou dans un channel grace aux sous commandes suivantes :')
        .addFields(
            { name: '\u200b', value: `${client.config.emojis.FLECHE}\`command create\` permet de crée une commande personalisée pour le serveur.`, inline: false },
            { name: '\u200b', value: `${client.config.emojis.FLECHE}\`command liste\` donne la liste des commandes personalisées du serveur`, inline: false },
            { name: '\u200b', value: `${client.config.emojis.FLECHE}\`command update\` met a jour le contenu d'une commande personalisée`, inline: false },
            { name: '\u200b', value: `${client.config.emojis.FLECHE}\`command delete\` supprime une commandes personalisées du serveur`, inline: false },
        )
        .setTimestamp()
        .setFooter('BOT ID : 689210215488684044')
       return  message.channel.send(embed)      
    }
    if(args[0].toLowerCase() === 'create'){
        const commandCreateDescription = new MessageEmbed()
            .setTitle(`Sous commande : ${settings.prefix}command create`)
            .setColor(client.config.color.EMBEDCOLOR)
            .setDescription(`**Module :** Manangement\n**Description :** Permet de crée une commande\n**Usage :** [nom] [Contenu de la commande]\n**Exemples :** \n ${settings.prefix}command create invite https://discord.gg/TC7Qjfs`)
            .setFooter('BOT ID : 689210215488684044')
            .setTimestamp()
            if(!args[1])return message.channel.send(commandCreateDescription)
            client.getCmds(message.guild).then(async p =>{
            //console.log(p)
            if(p.length > 5) return message.channel.send(`${client.config.emojis.FALSE}Vous etes limité a 5 commandes personalisées par serveur`)
            const nomCommande = args[1];
            const comd = await client.getCmd(args[1], message.guild)
            if(comd && comd.nom)return message.channel.send(`${client.config.emojis.FALSE}Cette commande existe déja`)
            const contenu = args.slice(2).join(" ")
            if(nomCommande.length > 30) return message.channel.send(`${client.config.emojis.FALSE} Le nom de la commande ne peut pas éxéder 30 caractères`)
            if(contenu.length > 1800) return message.channel.send(`${client.config.emojis.FALSE} Le contenu de la commande ne peut pas éxéder 1800 caractères`)
            await client.createCmd({
            guildID: message.guild.id,
            guildName: message.guild.name,
            nom: nomCommande,
            contenu: contenu
        }).then(
            message.channel.send(`${client.config.emojis.TRUE}J'ai bien crée la commande avec comme nom \`${args[1]}\` `)
        )
        })
    }
     if(args[0].toLowerCase() === 'liste'){
        const embed = new MessageEmbed()
        .setTitle('Commandes personalisées du serveur :')
        .setColor(client.config.color.EMBEDCOLOR)
        .setThumbnail(`${message.guild.iconURL()}`)
        .setTimestamp()
        .setFooter('BOT ID : 689210215488684044')

        await client.getCmds(message.guild).then(p =>{
            //console.log(p)
           p.splice(0, 20).forEach(e =>{
               embed.addField(/*e.nom*/'\u200b', `Commande : \`${e.nom/*e.contenu.splice(0, 100)*/}\``)
           })
        })
        message.channel.send(embed)
    }
     if(args[0].toLowerCase() === 'update'){
        const commandUpdateDescription = new MessageEmbed()
        .setTitle(`Sous commande : ${settings.prefix}command update`)
        .setColor(client.config.color.EMBEDCOLOR)
        .setDescription(`**Module :** Manangement\n**Description :** Permet de modifier une commande\n**Usage :** [nom] [Nouveau contenu de la commande]\n**Exemples :** \n ${settings.prefix}command update invite Le lien vers le serveur support est : https://discord.gg/TC7Qjfs`)
        .setFooter('BOT ID : 689210215488684044')
        .setTimestamp()
        if(!args[1])return message.channel.send(commandUpdateDescription)
        if(!args[2])return message.channel.send(`${client.config.emojis.FALSE}Merci d'indiquet le nouveau contenu de la commande.`)
        const newContenu = args.slice(2).join(" ")
        const nameCommand = args[1]
        const comd = await client.getCmd(nameCommand, message.guild)
        if(!comd)return message.channel.send(`${client.config.emojis.FALSE}La commande n'existe pas...`)
        if(newContenu.length > 1800) return message.channel.send(`${client.config.emojis.FALSE}Le nouveau contenu ne peut pas éxéder 1800 caractès`);
        client.updateCmd(nameCommand,message.guild,{contenu: newContenu}).then(message.channel.send(`${client.config.emojis.TRUE}J'ai bien mis à jour le contenu de la commande \`${nameCommand}\``))

    }else if(args[0].toLowerCase() === 'delete'){
        const commandDeleteDescription = new MessageEmbed()
        .setTitle(`Sous commande : ${settings.prefix}command delete`)
        .setColor(client.config.color.EMBEDCOLOR)
        .setDescription(`**Module :** Manangement\n**Description :** Permet de supprimer une commande\n**Usage :** [nom]\n**Exemples :** \n ${settings.prefix}command delete invite`)
        .setFooter('BOT ID : 689210215488684044')
        .setTimestamp()
        if(!args[1])return message.channel.send(commandDeleteDescription)
        const comd = await client.getCmd(args[1], message.guild)
        if(!comd)return message.channel.send(`${client.config.emojis.FALSE}La commande n'existe pas...`)
        client.deleteCmd(args[1], message.guild).then(message.channel.send(`${client.config.emojis.TRUE}J'ai bien supprimer la commande \`${args[1]}\``));
    }
    
}
module.exports.help = {
    name : 'command',
    aliases : ['command','commands','cmd','cmds'],
    category : 'administration',
    description : 'Permet de gérer les commandes personalisées du serveur.',
    cooldown : 10,
    usage : '<action> <valeur>',
    exemple :['command create spiritus-support https://discord.gg/TC7Qjfs'],
    permissions : true,
    isUserAdmin: false,
    args : false,
    sousCommdandes : ['command liste','command create','command update','command delete']
}