const { Guild } = require("../../models/index");
const util = require('util');
const child_process = require('child_process');
const exec = util.promisify(child_process.exec);
const { MessageEmbed} = require("discord.js");
module.exports.run = async (client, message, args) =>{
    if(!client.config.ADMIN.includes(message.author.id)) return message.channel.send(`${client.config.emojis.FALSE}Tu n'est pas admin du BOT `)
    //---------------------------------------PREMIUM-ADD---------------------------------------------------
    if(args[0] === 'add'){
        const guild = {
            id : `${args[1]}`
        }
        await client.updateGuild(guild, {premium : true});
            message.channel.send(`${client.config.emojis.TRUE}Guild premium mise à jour avec succès.`)
    }
    //---------------------------------------PREMIUM-REM---------------------------------------------------
    if(args[0] === 'rem'){
        const guild = {
            id : `${args[1]}`
        }
        await client.updateGuild(guild, {premium : false});
            message.channel.send(`${client.config.emojis.TRUE}Guild premium mise à jour avec succès.`)
    }
}
module.exports.help = {
        
    name : 'premium',
    aliases : ['premium'],
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
    