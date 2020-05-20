const { MessageEmbed } = require("discord.js");
const { readdirSync } = require("fs");
const categoryList = readdirSync('./commands');
module.exports.run = (client, message, args) => {
    
    if (!args.length) {
      const embed = new MessageEmbed()
        .setColor("#62b02e")
        
        .addField("Liste des commandes", `Une liste de toutes les sous-catégories disponibles et leurs commandes.\nPour plus d'informations sur une commande, tapez \`${client.config.PREFIX}help <command_name>\`.`)
        .setTimestamp()
        .setFooter('BOT ID : 689210215488684044', `${message.guild.iconURL()}`);
      //for (const category of categoryList) {
          const category = "misc"
        embed.addField(
          `${category}`,
          `${client.commands.filter(cat => cat.help.category === category.toLowerCase())
            .map(cmd => '**'+`${client.config.PREFIX}`+cmd.help.name +' ** - '+ cmd.help.description).join(`\r\n`)}`
        );
      //};
      return message.channel.send(embed);
    }
  };
  
  module.exports.help = {
    name: "helpmisc",
    aliases: ['helpmisc','cmdsmisc'],
    category: 'help',
    description: "Renvoie une liste de commandes ou les informations sur une seule!",
    cooldown: 3,
    usage: '<command_name>',
    exemple :["help","help prune"],
    isUserAdmin: false,
    permissions: false,
    args: false
  };