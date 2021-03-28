const { MessageEmbed } = require("discord.js");
module.exports.run = async (client, message, args, settings) => {
  if (!args[0]) {
    const embed = new MessageEmbed()
      .setTitle('Commande ignore')
      .setDescription(`La commande __filter__ permet de gérer les mots interdits du serveur graces aux sous commandes suivantes :\n\n${client.config.emojis.fleche}__filter add__ permet d'ajouter un mots a la liste des mots interdits du le serveur.\n${client.config.emojis.fleche}__filter rem__ permet de supprimer un mots a la liste des mots interdits du le serveur.\n${client.config.emojis.fleche}__filter liste__ permet de voir la liste des mots interdits du serveur.`)
      .setColor(`${client.config.color.EMBEDCOLOR}`)
      .setTimestamp()
      .setFooter(`BOR ID : ${client.user.id}`)
    return message.channel.send(embed)
  }
  if (args[0].toLowerCase() === 'add') {
    if (!message.member.permissions.has('MANAGE_GUILD')) return message.channel.send(`${client.config.emojis.error}Vous devez avoir la permission de gérer le serveur pour utiliser cette commande.`);
    const query = args[1]
    if (!query) return message.channel.send(`${client.config.emojis.error}Merci d'indiquer un mot à ajouter sur la liste.`)
    settings.filter.push(query);
    await settings.save();
    return message.channel.send(`${client.config.emojis.success}Ce mot est maintanant interdit sur le serveur.`);

  }
  if (args[0].toLowerCase() === 'rem') {
    if (!message.member.permissions.has('MANAGE_GUILD')) return message.channel.send(`${client.config.emojis.error}Vous devez avoir la permission de gérer le serveur pour utiliser cette commande.`);
    const query = args[1]
    if (!args[1]) return message.channel.send(`${client.config.emojis.error}Merci d'indiquer le mot a supprimer de la liste.`)
    if (!settings.filter.includes(query)) return message.channel.send(`${client.config.emojis.error}Ce mot n'est pas filtré.`);
    const index = settings.filter.indexOf(query);
    settings.filter.splice(index, 1);
    await settings.save();
    return message.channel.send(`${client.config.emojis.success}Le mot \`${query}\` est maintanant autorisé.`);
  }
  if (args[0].toLowerCase() === 'liste') {
    if (!settings.filter || settings.filter.length < 1) return message.channel.send(`${client.config.emojis.error}Il n'y a aucun mot interdit pour ce serveur. Pour en ajouter utilisez la commande \`${settings.prefix}filter add <mot>\``)
    if (!message.member.permissions.has('MANAGE_GUILD')) return message.channel.send(`${client.config.emojis.error}Vous devez avoir la permission de gérer le serveur pour utiliser cette commande.`);
    let embed = {
      title: `Liste des mots interdits pour le serveur **${message.guild.name}** | ${settings.filter.length} au totale`,
      thumbnail: {
        url: `${message.guild.iconURL()}`,
      },
      color: `${client.config.color.EMBEDCOLOR}`,
      description: null,
      fields: []
    };
    embed.description = `${settings.filter.join(', ')}`;//'<#'+settings.filter.join('')+'>';
    return message.channel.send({ embed });
  }
};

module.exports.help = {
  name: "filter",
  aliases: ['filter'],
  category: 'moderation',
  description: "Interdit certains mots sur le serveur.",
  cooldown: 10,
  usage: '<mot_a_interdir>',
  exemple: ["filter fck"],
  isUserAdmin: false,
  permissions: true,
  args: false,
  sousCommdandes: []
};



