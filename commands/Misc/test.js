const Discord = require("discord.js");
const { RichEmbed } = require("discord.js");
const config = require("../../config.js")

module.exports.run = async (client, message, args) =>{
console.log("test")
message.guild.members.fetch().then(fetchedMembers => {     
    const totalOnline = fetchedMembers.filter(member => member.presence.status === 'online').size;
    message.channel.send("nombre de membres connecté : " + totalOnline)});

    const channel = message.guild.channels.cache.filter(channel => channel.type === "text").size
    message.channel.send("Nombre de channels sur le serveur : " + channel);

    
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
