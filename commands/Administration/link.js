const {Guild} = require('../../models/index');
const { MessageEmbed } = require('discord.js');
module.exports.run = async (client, message, args,settings) => {
    const helpEmbed = new MessageEmbed()
    .setTitle(`Commande : \`link\``)
    .setColor(client.config.color.EMBEDCOLOR)
    .setDescription(`**Module :** Manangement\n**Description :** Permet de crée un suivis des conversations entre 2 channels ou serveurs.\n**Usage : **${settings.prefix}link [guild] [channel]\n**Exemples :** \n ${settings.prefix}link 625034894527168513 736846676299612160`)
    .setFooter('BOT ID : 689210215488684044')
    .setTimestamp()
    if(args.length < 2) return message.channel.send(helpEmbed)
    try{
        if(!message.member.hasPermission('MANAGE_WEBHOOKS'))return message.channel.send(`${client.config.emojis.error}Vous devez avoir la permission de gérer les webhooks sur ce serveur pour utiliser cette commande.`)
        if(!message.guild.me.hasPermission('MANAGE_WEBHOOKS')) return message.channel.send(`${client.config.emojis.error}Je n'ai pas la permission de modifier les webhooks.`);
        if(settings.links.length > 2) return message.channel.send(`${client.config.emojis.error}Votre serveur à atteint la limite des links (3).`)
        const otherGuild = client.resolveGuild(args[0]);
        if (!otherGuild) return message.channel.send(`${client.config.emojis.error}Je n'ai pas trouver ce serveur.`);
        const botMember = otherGuild.members.cache.get(client.user.id);
        if (!botMember) return message.channel.send(`${client.config.emojis.error}Le bot n'est pas sur ce serveur.`);
        const otherChannel = client.resolveChannel(otherGuild, args[1]);
        if(otherChannel.id === message.channel.id) return message.channel.send(`${client.config.emojis.error}Vous ne pouvez pas lié le meme channel.`)
        if (!otherChannel || otherChannel.type != 'text') return message.channel.send(`${client.config.emojis.error}Je n'ai pas trouver ce channel`);
        const otherGuildMember = await otherGuild.members.fetch(message.author.id)
        if (!otherGuildMember.hasPermission('MANAGE_GUILD')) return message.channel.send(`${client.config.emojis.error}Vous devez avoir la permission de gérer l'autre serveur pour utiliser cette commande.`);
        if (!botMember.hasPermission('MANAGE_WEBHOOKS')) return message.channel.send(`${client.config.emojis.error}J'ai besoin de la permission de gérer les webhooks sur l'autre serveur.`);
        const messageLoading = await message.channel.send(`${client.config.emojis.loading}Loading...`);
        let otherGuildDB = await Guild.findOne({guildID: otherGuild.id});
        if (!otherGuildDB) return messageLoading.edit(`${client.config.emojis.error}Impossible de lié ces 2 serveurs.`)
        if(settings.links.length > 2) return messageLoading.edit(`${client.config.emojis.error}L'autre serveur à atteint la limite maximale des links (3).`)
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
        if(e.message.match('Maximum number of webhooks reached (10)'))return message.channel.send(`${client.config.emojis.error}Le nombre maximum de webhoks à été atteint dans un channel (10).`)
        else {
            message.channel.send(`${client.config.emojis.error}Une erreur s'est produite. Merci de vérifier les paramètres.`)
            client.channels.cache.get(client.config.CHANNELCONSOLE).send(`<@${client.config.owner.id}> __**Rapport d'erreur sur le fichier**__ \`link.js\` \n __Arguments :__ ${args.join(' ')}\n Erreur : ${e.stack} `)
        }
    }
    
}
module.exports.help = {
    name : 'link',
    aliases : ['link'],
    category : 'administration',
    description : 'Permet de gérer les liens.',
    cooldown : 5,
    usage : '<action> <args>',
    exemple :[""],
    permissions : false,
    isUserAdmin: false,
    args : false,
    sousCommdandes : [""]
}