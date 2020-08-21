const {MessageEmbed}= require('discord.js');
module.exports.run = async (client, message, args,settings) => {
    if(!args[0]){
        const embed = new MessageEmbed()
        .setTitle('Commande modroles')
        .setDescription(`La commande __modroles__ permet de gérer les roles modérateurs du serveur graces aux sous commandes suivantes :\n\n${client.config.emojis.fleche}__modroles add__ permet d'ajouter un role comme modérateur pour le serveur.\n${client.config.emojis.fleche}__modroles rem__ permet de supprimer un role des modérateur pour du serveur.\n${client.config.emojis.fleche}__modroles liste__ permet de voir la liste des roles modérateurs du serveur.`)
        .setColor(`${client.config.color.EMBEDCOLOR}`)
        .setTimestamp()
        .setFooter(`BOR ID : ${client.user.id}`)
        return message.channel.send(embed)
      }
    if(args[0].toLowerCase() === 'add'){
        if(!message.member.hasPermission('ADMINISTRATOR'))return message.channel.send(`${client.config.emojis.error}Vous devez avoir la permission d'admin pour utiliser cette commande.`);
        const role = client.resolveRole(message.guild, args[1]);
        if (!role) return message.channel.send(`${client.config.emojis.error}Je n'ai pas trouver ce role`);
        if (settings.modRoles.includes(role.id)) return message.channel.send(`${client.config.emojis.error}Ce role est déja modérateur sur le serveur.`);
        else{
            settings.modRoles.push(role.id);
            await settings.save();
            return message.channel.send(`${client.config.emojis.success}Ce role est maintanant modérateur.`);
        }        
    }
    if(args[0].toLowerCase() === 'rem'){
        if(!message.member.hasPermission('ADMINISTRATOR'))return message.channel.send(`${client.config.emojis.error}Vous devez avoir la permission d'admin pour utiliser cette commande.`);
        const role = client.resolveRole(message.guild, args[1]);
            if (!role)return message.channel.send(`${client.config.emojis.error}Je n'ai pas trouver ce role.`);
            if (!settings.modRoles.includes(role.id)) return message.channel.send(`${client.config.emojis.error}Ce role n'est pas modérateur.`);
            const index = settings.modRoles.indexOf(role.id);
            settings.modRoles.splice(index, 1);
            await settings.save();
            return message.channel.send(`${client.config.emojis.success}Le role ${role.name} n'est plus modérateur.`);
    }
    if(args[0].toLowerCase() === 'liste'){
        if(!settings.modRoles || settings.modRoles.length < 1)return message.channel.send(`${client.config.emojis.error}Il n'y a aucun roles modérateurs pour ce serveur. Pour en ajouter utilisez la commande \`${settings.prefix}modroles add @role\``)
        if(!message.member.hasPermission('ADMINISTRATOR'))return message.channel.send(`${client.config.emojis.error}Vous devez avoir la permission d'admin pour utiliser cette commande.`);
        let embed = {
            title: `Liste des roles modérateurs pour le serveur **${message.guild.name}** | ${settings.modRoles.length} au totale`,
            thumbnail: {
                url: `${message.guild.iconURL()}`,
            },
            color: `${client.config.color.EMBEDCOLOR}`,
            description: null,
            fields: []   
        };
        embed.description = '<@&'+settings.modRoles.join('>, <@&') + '>';
        return message.channel.send({embed});
    }
}
module.exports.help = {
    name : 'modroles',
    aliases : ['modroles','moderators-roles'],
    category : 'administration',
    description : 'Permet de gérer les modérateurs du serveur.',
    cooldown : 5,
    usage : '<action> <args>',
    exemple :["modroles add @Moderateur"],
    permissions : false,
    isUserAdmin: false,
    args : false,
    sousCommdandes : ["modroles add","modroles rem","modroles liste"]
}
