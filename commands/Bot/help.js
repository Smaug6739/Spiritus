const { MessageEmbed } = require("discord.js");
const { readdirSync } = require("fs");
const categoryList = readdirSync('./commands');
module.exports.run = (client, message, args, settings) => {
  if (!args.length) {
    const embed = new MessageEmbed()
      .setColor(`${client.config.color.EMBEDCOLOR}`)
      .setAuthor('Liste  des commandes :', `${client.user.avatarURL()}`)
      .addField("Liste des commandes", `Une liste de toutes les sous-catégories disponibles et leurs commandes.\nPour plus d'informations sur une commande, executez \`${settings.prefix}help <command_name>\`.`)
      .setTimestamp()
    if (message.guild.iconURL()) embed.setFooter(`BOT ID : ${client.user.id}`, `${message.guild.iconURL()}`);
    else embed.setFooter(`BOT ID : ${client.user.id}`);
    for (const category of categoryList.slice(1)) {
      embed.addField(
        `${category}`,
        `${client.commands.filter(cat => cat.help.category === category.toLowerCase())
          .map(cmd => '__' + `${settings.prefix}` + cmd.help.name + ' __ - ' + cmd.help.description).join(`\r\n`)}`
      );
    };
    return message.channel.send(embed);
  } else {
    const command = client.commands.get(args[0]) || client.commands.find(cmd => cmd.help.aliases && cmd.help.aliases.includes(args[0]));
    if (!command) return message.channel.send(`${client.config.emojis.FALSE} Je n'ai pas trouver cette commande.`);
    const embed = new MessageEmbed()

      .setColor(`${client.config.color.EMBEDCOLOR}`)
      .setAuthor(`Commande : ${settings.prefix}${command.help.name}`, `${client.user.avatarURL()}`)
      .addField("**__Description :__**", `${command.help.description} (cd: ${command.help.cooldown}secs)`)
      .addField("**__Utilisation :__**", command.help.usage ? `${settings.prefix}${command.help.name} ${command.help.usage}` : `${settings.prefix}${command.help.name}`, true)
      .setTimestamp()
    if (message.guild.iconURL()) embed.setFooter(`BOT ID : ${client.user.id}`, `${message.guild.iconURL()}`);
    else embed.setFooter(`BOT ID : ${client.user.id}`);
    if (command.help.aliases.length > 1) embed.addField("**__Alias :__**", `${command.help.aliases.join(`, `)}`);
    if (command.help.exemple && command.help.exemple.length > 0) embed.addField("**__Exemples :__**", `${settings.prefix}${command.help.exemple.join(`\r\n${settings.prefix}`)}`);
    if (command.help.subcommands && command.help.subcommands.length > 0) embed.addField("**__Sous commandes :__**", `${settings.prefix}${command.help.subcommands.join(`\r\n${settings.prefix}`)}`);
    return message.channel.send(embed);
  }
};

module.exports.help = {
  name: "help",
  aliases: ['help', 'cmds'],
  category: 'bot',
  description: "Liste des commandes du bot.",
  cooldown: 3,
  usage: '<command_name>',
  exemple: ["help", "help ping"],
  isUserAdmin: false,
  permissions: false,
  args: false,
  subcommands: ["help <command>"]
};