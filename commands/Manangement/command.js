const {MessageEmbed} = require('discord.js')
module.exports.run =async(client, message, args) => {
    const {TRUE,FALSE,EMBED,FLECHE} = require('../../configstyle')
    if(!args[0]){
        const embed = new MessageEmbed()
        .setTitle('Commande message')
        .setDescription('La commande `message` permet d\'envoyer un message a une personne ou dans un channel grace aux sous commandes suivantes :')
        .addFields(
            { name: '\u200b', value: `${FLECHE}\`command create\` permet de crée une commande personalisée pour le serveur.`, inline: false },
            { name: '\u200b', value: `${FLECHE}\`command liste\` donne la liste des commandes personalisées du serveur`, inline: false },
            { name: '\u200b', value: `${FLECHE}\`command update\` met a jour le contenu d'une commande personalisée`, inline: false },
            { name: '\u200b', value: `${FLECHE}\`command delete\` supprime une commandes personalisées du serveur`, inline: false },
        )
        .setTimestamp()
        .setFooter('BOT ID : 689210215488684044')
        message.channel.send(embed)      
    }
    if(args[0] === 'create'){
            client.getCmds(message.guild).then(async p =>{
            //console.log(p)
            if(p.length > 5) return message.channel.send(`${FALSE}Vous etes limité a 5 commandes personalisées par serveur`)
            const nomCommande = args[1];
            const comd = await client.getCmd(args[1], message.guild)
            if(comd && comd.nom)return message.channel.send(`${FALSE}Cette commande existe déja`)
            const contenu = args.slice(2).join(" ")
            if(nomCommande.length > 30) return message.channel.send(`${FALSE} Le nom de la commande ne peut pas éxéder 30 caractères`)
            if(contenu.length > 1800) return message.channel.send(`${FALSE} Le contenu de la commande ne peut pas éxéder 1800 caractères`)
            await client.createCmd({
            guildID: message.guild.id,
            guildName: message.guild.name,
            nom: nomCommande,
            contenu: contenu
        }).then(
            message.channel.send(`${TRUE}J'ai bien crée la commande avec comme nom \`${args[1]}\` `)
        )
        })
    }else if(args[0] === 'liste'){
        const embed = new MessageEmbed()
        .setTitle('Commandes personalisées du serveur :')
        .setColor(EMBED)
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
    }else if(args[0] === 'update'){
        if(!args[2])return message.channel.send(`${FALSE}Merci d'indiquet le nouveau contenu de la commande.`)
        const newContenu = args.slice(2).join(" ")
        const nameCommand = args[1]
        const comd = await client.getCmd(nameCommand, message.guild)
        if(!comd)return message.channel.send(`${FALSE}La commande n'existe pas...`)
        if(newContenu.length > 1800) return message.channel.send(`${FALSE}Le nouveau contenu ne peut pas éxéder 1800 caractès`);
        client.updateCmd(nameCommand,message.guild,{contenu: newContenu}).then(message.channel.send(`${TRUE}J'ai bien mis à jour le contenu de la commande \`${nameCommand}\``))

    }else if(args[0] === 'delete'){
        const comd = await client.getCmd(args[1], message.guild)
        if(!comd)return message.channel.send(`${FALSE}La commande n'existe pas...`)
        client.deleteCmd(args[1], message.guild).then(message.channel.send(`${TRUE}J'ai bien supprimer la commande \`${args[1]}\``));
    }
    
}
module.exports.help = {
    name : 'command',
    aliases : ['command','commands','cmd','cmds'],
    category : 'manangement',
    description : 'Permet de gérer les commandes personalisées du serveur.',
    cooldown : 10,
    usage : '<action> <valeur>',
    exemple :['command create spiritus-support https://discord.gg/TC7Qjfs'],
    permissions : true,
    isUserAdmin: false,
    args : false,
    sousCommdandes : ['command liste','command create','command update','command delete']
}