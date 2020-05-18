const { MessageEmbed } = require("discord.js");
const { PREFIX } = require("../../config");
const { readdirSync } = require("fs");
const categoryList = readdirSync('./commands');
module.exports.run = (client, message, args) => {
    
    if (!args.length) {
      const embed = new MessageEmbed()
        .setColor("#62b02e")
        .setTitle(`<:15896389126821:711223108866015242> **Liste  des commandes :** `)

        .addField("Liste des commandes", `Une liste de toutes les sous-catégories disponibles et leurs commandes.\nPour plus d'informations sur une commande, tapez \`${PREFIX}help <command_name>\`.`)
        .setTimestamp()
        .setFooter('BOT ID : 689210215488684044', `${message.guild.iconURL()}`);
      for (const category of categoryList) {
        //console.log('Catégories chargées :'+category)

        embed.addField(
          `${category}`,
          `${client.commands.filter(cat => cat.help.category === category.toLowerCase())
            .map(cmd => '**'+`${PREFIX}`+cmd.help.name +' ** - '+ cmd.help.description).join(`\r\n`)}`
        );
      };
      return message.channel.send(embed);
    } else {
      const command = client.commands.get(args[0]) || client.commands.find(cmd => cmd.help.aliases && cmd.help.aliases.includes(args[0]));
      console.log(command);
      if (!command) return message.reply("cette commande n'existe pas!");
      const logo = '<:15896389126821:711223108866015242>';
      const embed = new MessageEmbed()
      
        .setColor("#62b02e")
        //.setTitle(`\`${PREFIX}${command.help.name}\``)
        .setTitle(`${logo} **Commande :** ${PREFIX}${command.help.name}`)
        .addField("Description :", `${command.help.description} (cd: ${command.help.cooldown}secs)`)
        .addField("Utilisation :", command.help.usage ? `${PREFIX}${command.help.name} ${command.help.usage}` : `${PREFIX}${command.help.name}`, true)
        .setTimestamp()
        .setFooter('BOT ID : 689210215488684044', `${message.guild.iconURL()}`);
      if (command.help.aliases.length > 1) embed.addField("Alias :", `${PREFIX}${command.help.aliases.join(`\r\n${PREFIX}`)}`);
      if (command.help.exemple && command.help.exemple.length > 0) embed.addField("Exemples :", `${PREFIX}${command.help.exemple.join(`\r\n${PREFIX}`)}`);

      return message.channel.send(embed);
    }
  };
  
  module.exports.help = {
    name: "help",
    aliases: ['help','commandes'],
    category: 'misc',
    description: "Renvoie une liste de commandes ou les informations sur une seule!",
    cooldown: 3,
    usage: '<command_name>',
    exemple :["help","help ping"],
    isUserAdmin: false,
    permissions: false,
    args: false
  };