const { Guild } = require("../../models/index");
const util = require('util');
const child_process = require('child_process');
const exec = util.promisify(child_process.exec);
const { MessageEmbed} = require("discord.js");
module.exports.run = async (client, message, args) =>{
    if(!client.config.ADMIN.includes(message.author.id)) return message.channel.send(`${client.config.emojis.FALSE}Tu n'est pas admin du BOT `)
        console.log("Redemarage")
        await message.channel.send(`${client.config.emojis.TRUE}OK .`)
        process.exit()
    
}
module.exports.help = {
        
    name : 'restart',
    aliases : ['restart'],
    category : 'admin',
    description : 'Lance une recherge de toutes les guilds du bot.',
    cooldown : 5,
    usage : '',
    exemple :[],
    permissions : true,
    isUserAdmin: false,
    args : false,
    sousCommdandes : [""]

}    
    