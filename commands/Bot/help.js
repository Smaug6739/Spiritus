const { MessageEmbed } = require("discord.js");
const { readdirSync } = require("fs");
const categoryList = readdirSync('./commands');
module.exports.run = (client, message, args, settings) => {
  if (!args.length) {
    const embed = new MessageEmbed()
      .setColor(`${client.config.color.EMBEDCOLOR}`)
      .setAuthor('Liste  of commands :', `${client.user.avatarURL()}`)
      .addField("List of commands", `A list of all available subcategories and their commands.\nFor more information on an order, run \`${settings.prefix}help <command_name>\`.`)
      .setTimestamp()
      .setFooter(`Command module: Bot`, `${message.guild.iconURL() ? message.guild.iconURL() : ''}`);
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
    if (!command) return message.channel.sendErrorMessage(`Command not found.`);
    const embed = new MessageEmbed()

      .setColor(`${client.config.color.EMBEDCOLOR}`)
      .setAuthor(`Command : ${settings.prefix}${command.help.name}`, `${client.user.avatarURL()}`)
      .addField("**__Description :__**", `${command.help.description} (cd: ${command.help.cooldown}secs)`)
      .addField("**__Usage :__**", command.help.usage ? `${settings.prefix}${command.help.name} ${command.help.usage}` : `${settings.prefix}${command.help.name}`, true)
      .setTimestamp()
      .setFooter(`Command module: Bot`, `${message.guild.iconURL() ? message.guild.iconURL() : ''}`);
    if (command.help.aliases.length > 1) embed.addField("**__Alias :__**", `${command.help.aliases.join(`, `)}`);
    if (command.help.exemple && command.help.exemple.length > 0) embed.addField("**__Exemples :__**", `${settings.prefix}${command.help.exemple.join(`\r\n${settings.prefix}`)}`);
    if (command.help.subcommands && command.help.subcommands.length > 0) embed.addField("**__Subcommands :__**", command.help.subcommands.map(cmd => `${settings.prefix}${command.help.name} ${cmd.name} ${cmd.description} (\`${cmd.usage}\`)`));
    return message.channel.send(embed);
  }
};

module.exports.help = {
  name: "help",
  aliases: ['help', 'cmds'],
  category: 'bot',
  description: "List of bot commands.",
  cooldown: 3,
  usage: '<command_name>',
  exemple: ["help", "help ping"],
  isUserAdmin: false,
  moderator: false,
  args: false,
  userPermissions: [],
  botPermissions: [],
  subcommands: []
};