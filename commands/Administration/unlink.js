const { MessageEmbed } = require('discord.js');
module.exports.run = async (client, message, args,settings) => {
    const helpEmbed = new MessageEmbed()
    .setTitle(`Commande : \`unlink\``)
    .setColor(client.config.color.EMBEDCOLOR)
    .setDescription(`**Module :** Manangement\n**Description :** Permet de supprimer un suivis des conversations entre 2 channels ou serveurs.\n**Usage : **${settings.prefix}unlink [guild] [channel]\n**Exemples :** \n ${settings.prefix}unlink 625034894527168513 736846676299612160`)
    .setFooter('BOT ID : 689210215488684044')
    .setTimestamp()
    if(args.length < 2) return message.channel.send(helpEmbed)
        try{
            if(!message.member.hasPermission('MANAGE_WEBHOOKS'))return message.channel.send(`${client.config.emojis.error}Vous devez avoir la permission de gérer les webhooks sur ce serveur pour utiliser cette commande.`)
            if(!message.guild.me.hasPermission('MANAGE_WEBHOOKS')) return message.channel.send(`${client.config.emojis.error}Je n'ai pas la permission de modifier les webhooks.`);
            if(!settings.links)return message.channel.send(`${client.config.emojis.error} Il n'y a pas de canaux liés entre ces 2 serveurs.`)
            const otherGuild = client.resolveGuild(args[0]);
            if (!otherGuild) return message.channel.send(`${client.config.emojis.error}Je n'ai pas trouver ce serveur.`);
            const botMember = otherGuild.members.cache.get(client.user.id);
            if (!botMember) return message.channel.send(`${client.config.emojis.error}Le bot n'est pas sur ce serveur.`);
            if(otherGuild.id === message.guild.id)return message.channel.send(`${client.config.emojis.error}Vous ne pouvez pas unlink un channel sur la meme guild.`)
            const otherChannel = client.resolveChannel(otherGuild, args[1]);
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
module.exports.help = {
    name : 'unlink',
    aliases : ['unlink'],
    category : 'administration',
    description : 'Permet de supprimer une liaiso.',
    cooldown : 10,
    usage : '<action> <args>',
    exemple :["unlink 710759353472516176 736846611438895186"],
    permissions : false,
    isUserAdmin: false,
    args : false,
    sousCommdandes : [""]
}