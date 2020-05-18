const Discord = require("discord.js");
const { RichEmbed } = require("discord.js");
const config = require("../../config.js")

module.exports.run = async (client, message, args) =>{
console.log("Redemarage")
process.exit();


    
}


module.exports.help = {
    
    name : 'test',
    aliases : ['test'],
    category : 'misc',
    description : 'Commandes pour les tests',
    cooldown : 5,
    usage : '',
   // exemple :["ping"],
    permissions : false,
    isUserAdmin: false,
    args : false
}
