const {Guild} = require('../../models/index');
const { MessageEmbed } = require('discord.js');
module.exports.run = async (client, message, args,settings) => {
    if(!args[0]){
        const embed = new MessageEmbed()
        .setTitle('Commande interserver')
        .setDescription(`La commande __interserver__ permet de gérer les liaisons du serveur grâce aux sous commandes suivantes :\n\n${client.config.emojis.fleche}__interserver add__ permet d'ajouter un lien entre 2 canaux.\n${client.config.emojis.fleche}__interserver rem__ permet de supprimer une liaison entre 2 salons.`)
        .setColor(`${client.config.color.EMBEDCOLOR}`)
        .setTimestamp()
        .setFooter('BOT ID : 689210215488684044')
        return message.channel.send(embed)
    }
    if(args[0].toLowerCase() === 'add'){
        const helpEmbed = new MessageEmbed()
        .setTitle(`Commande : \`interserver add\``)
        .setColor(client.config.color.EMBEDCOLOR)
        .setDescription(`**Module :** Manangement\n**Description :** Permet de crée un suivis des conversations entre 2 channels ou serveurs.\n**Usage : **${settings.prefix}interserver add [guild] [channel]\n**Exemples :** \n ${settings.prefix}interserver add 625034894527168513 736846676299612160`)
        .setFooter('BOT ID : 689210215488684044')
        .setTimestamp()
        if(args.length < 3) return message.channel.send(helpEmbed)
        try{
            if(!message.member.hasPermission('MANAGE_WEBHOOKS'))return message.channel.send(`${client.config.emojis.error}Vous devez avoir la permission de gérer les webhooks sur ce serveur pour utiliser cette commande.`)
            if(!message.guild.me.hasPermission('MANAGE_WEBHOOKS')) return message.channel.send(`${client.config.emojis.error}Je n'ai pas la permission de modifier les webhooks.`);
            if(settings.links.length > 2) return message.channel.send(`${client.config.emojis.error}Votre serveur à atteint la limite des liens (3).`);
            if(message.channel.rateLimitPerUser < 5) return message.channel.send(`${client.config.emojis.error}Le 1er salon doit avoir un cooldown de minimum 5s pour utiliser la liaison`)
            const otherGuild = client.resolveGuild(args[1]);
            if (!otherGuild) return message.channel.send(`${client.config.emojis.error}Je n'ai pas trouver ce serveur.`);
            if(otherGuild.id === message.guild.id)return message.channel.send(`${client.config.emojis.error}Vous ne pouvez pas lié 2 channels sur la meme guild.`)
            const botMember = otherGuild.members.cache.get(client.user.id);
            if (!botMember) return message.channel.send(`${client.config.emojis.error}Le bot n'est pas sur ce serveur.`);
            const otherChannel = await client.resolveChannel(otherGuild, args[2]);
            if(otherChannel.rateLimitPerUser < 5) return message.channel.send(`${client.config.emojis.error}Le 2eme salon doit avoir un cooldown de minimum 5s pour utiliser la liaison`)
            if (!otherChannel || otherChannel.type != 'text') return message.channel.send(`${client.config.emojis.error}Je n'ai pas trouver ce channel`);
            const otherGuildMember = await otherGuild.members.fetch(message.author.id)
            if (!otherGuildMember.hasPermission('MANAGE_GUILD')) return message.channel.send(`${client.config.emojis.error}Vous devez avoir la permission de gérer l'autre serveur pour utiliser cette commande.`);
            if (!botMember.hasPermission('MANAGE_WEBHOOKS')) return message.channel.send(`${client.config.emojis.error}J'ai besoin de la permission de gérer les webhooks sur l'autre serveur.`);
            const messageLoading = await message.channel.send(`${client.config.emojis.loading} Chargement...`);
            let otherGuildDB = await Guild.findOne({guildID: otherGuild.id});
            if (!otherGuildDB) return messageLoading.edit(`${client.config.emojis.error}Impossible de lié ces 2 serveurs.`)
            if(settings.links.length > 2) return messageLoading.edit(`${client.config.emojis.error}L'autre serveur à atteint la limite maximale des liens (3).`)
            const webhook1 = await message.channel.createWebhook('Spiritus', {reason: 'Link commande'});
            const webhook2 = await otherChannel.createWebhook('Spiritus', {reason: 'Link commande'});
            otherGuildDB.links.push([webhook1.id, webhook2.id]);
            settings.links.push([webhook1.id, webhook2.id]);
            await otherGuildDB.save();
            await settings.save();
            const embed = new MessageEmbed()
                .setColor(client.config.color.VERT)
                .setTitle( `${client.config.emojis.success} Création du lien.`)
                .setAuthor(`${message.author.username}#${message.author.discriminator}`, message.author.displayAvatarURL())
                .addField('Autre serveur :',`${otherGuild.name}`,true)
                .addField('Autre channel :',`${otherChannel.name}`,true)
                .setThumbnail(otherGuild.iconURL())
                .setTimestamp()
                .setFooter(`BOT ID : ${client.user.id}`)
            return messageLoading.edit({content: '', embed: embed
            });
        }catch(e){
            message.channel.bulkDelete(1)
            if(e.message.match('Maximum number of webhooks reached'))return message.channel.send(`${client.config.emojis.error}Le nombre maximum de webhoks à été atteint dans un channel (10).`)
            else {
                message.channel.send(`${client.config.emojis.error}Une erreur s'est produite. Merci de vérifier les paramètres.`)
                client.channels.cache.get(client.config.CHANNELCONSOLE).send(`<@${client.config.owner.id}> __**Rapport d'erreur sur le fichier**__ \`link.js\` \n __Arguments :__ ${args.join(' ')}\n Erreur : ${e.stack} `)
            }
        }
    }

    if(args[0].toLowerCase() === 'rem'){
    const helpEmbed = new MessageEmbed()
        .setTitle(`Commande : \`interserver rem\``)
        .setColor(client.config.color.EMBEDCOLOR)
        .setDescription(`**Module :** Manangement\n**Description :** Permet de supprimer un suivis des conversations entre 2 channels ou serveurs.\n**Usage : **${settings.prefix}unlink [guild] [channel]\n**Exemples :** \n ${settings.prefix}unlink 625034894527168513 736846676299612160`)
        .setFooter('BOT ID : 689210215488684044')
        .setTimestamp()
    if(args.length < 3) return message.channel.send(helpEmbed)
        try{
            if(!message.member.hasPermission('MANAGE_WEBHOOKS'))return message.channel.send(`${client.config.emojis.error}Vous devez avoir la permission de gérer les webhooks sur ce serveur pour utiliser cette commande.`)
            if(!message.guild.me.hasPermission('MANAGE_WEBHOOKS')) return message.channel.send(`${client.config.emojis.error}Je n'ai pas la permission de modifier les webhooks.`);
            if(!settings.links)return message.channel.send(`${client.config.emojis.error} Il n'y a pas de canaux liés entre ces 2 serveurs.`)
            const otherGuild = client.resolveGuild(args[1]);
            if (!otherGuild) return message.channel.send(`${client.config.emojis.error}Je n'ai pas trouver ce serveur.`);
            const botMember = otherGuild.members.cache.get(client.user.id);
            if (!botMember) return message.channel.send(`${client.config.emojis.error}Le bot n'est pas sur ce serveur.`);
            if(otherGuild.id === message.guild.id)return message.channel.send(`${client.config.emojis.error}Vous ne pouvez pas unlink un channel sur la meme guild.`)
            const otherChannel = client.resolveChannel(otherGuild, args[2]);
            if (!otherChannel || otherChannel.type != 'text') return message.channel.send(`${client.config.emojis.error}Je n'ai pas trouver ce channel`);
            const otherGuildMember = await otherGuild.members.fetch(message.author.id)
            if (!otherGuildMember.hasPermission('MANAGE_GUILD')) return message.channel.send(`${client.config.emojis.error}Vous devez avoir la permission de gérer l'autre serveur pour utiliser cette commande.`);
            if (!botMember.hasPermission('MANAGE_WEBHOOKS')) return message.channel.send(`${client.config.emojis.error}J'ai besoin de la permission de gérer les webhooks sur l'autre serveur.`);
            const messageLoading = await message.channel.send(`${client.config.emojis.loading} Chargement...`);
            let webhooks = await message.channel.fetchWebhooks();
            webhooks = webhooks.map(w => w.id);
            const firstWebhookID = settings.links.find(a => a.find(w => webhooks.includes(w))).find(b => webhooks.includes(b));
            if (!firstWebhookID) return messageLoading.edit({content: `${client.config.emojis.error} Je n'ai trouver aucun lien pour l'autre channel.`});
            let otherWebhooks = await message.channel.fetchWebhooks();
            otherWebhooks = otherWebhooks.map(w => w.id);
            const otherWebhookID = settings.links.find(a => a.find(w => otherWebhooks.includes(w))).find(b => webhooks.includes(b));
            if (!otherWebhookID) return messageLoading.edit({content: `${client.config.emojis.error} Je n'ai trouver aucun lien pour ce channel.`});
            const doc = settings.links.find(a => a.includes(firstWebhookID) && a.includes(otherWebhookID));
            if (!doc) return messageLoading.edit({content: `${client.config.emojis.error} Je n'ai trouver aucun lien pour ce channel.`});
            const otherGuildDoc = await client.getGuild(otherGuild)
            const otherDoc = otherGuildDoc.links.find(a => a.includes(firstWebhookID) && a.includes(otherWebhookID));
            const otherIndex = await otherGuildDoc.links.indexOf(otherDoc);
            if (otherIndex === -1) return messageLoading.edit({content: `${client.config.emojis.error}Je n'ai trouver aucun lien entre ces 2 channels.`});
            const index = settings.links.indexOf(doc);
            settings.links.splice(index, 1);
            otherGuildDoc.links.splice(otherIndex, 1);
            await settings.save();
            await otherGuildDoc.save();
            return messageLoading.edit(`${client.config.emojis.success} Le suivis des conversations à bien été désactiver.`);
        }catch(e){
            message.channel.bulkDelete(1)
            if(e.message.match("Cannot read property 'find' of undefined"))return message.channel.send(`${client.config.emojis.error}Ces channels ne sont pas lié.`)
            else {
                client.channels.cache.get(client.config.CHANNELCONSOLE).send(`<@${client.config.owner.id}> __**Rapport d'erreur sur le fichier**__ \`unlink.js\` \n __Arguments :__ ${args.join(' ')}\n Erreur : ${e.stack} `)
                message.channel.send(`${client.config.emojis.error}Une erreur s'est produite. Merci de vérifier les paramètres.`)
            }
        }
    }
    
    
}
module.exports.help = {
    name : 'interserver',
    aliases : ['interserver'],
    category : 'administration',
    description : 'Permet de lié les salons de 2 serveurs.',
    cooldown : 10,
    usage : '<action> <args>',
    exemple :["interserver add 710759353472516176 736846611438895186"],
    permissions : false,
    isUserAdmin: false,
    args : false,
    sousCommdandes : ["interserver add","interserver rem"]
}