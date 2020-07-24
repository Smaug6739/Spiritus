const { Guild } = require("../../models/index");
module.exports.run = async (client, message, args) =>{
    if(!client.config.ADMIN.includes(message.author.id)) return message.channel.send(`${client.config.emojis.error}Tu n'est pas admin du BOT `)
    //---------------------------------------CHARGE-DES-GUILDS--------------------------------------------------
    async function verifierguild(){
        client.guilds.cache.forEach(async guild  => {
            const data = await Guild.findOne({ guildID: guild.id });
            if (!data){ 
                const newGuild = {
                guildID: guild.id,
                guildName: guild.name
                
                };
                await client.createGuild(newGuild)
            }
            console.log(guild.id)
        })
      }  
      verifierguild()
      message.channel.send(`${client.config.emojis.success}Recharge de toutes les guilds lancée.`)
}
module.exports.help = {
        
    name : 'charge',
    aliases : ['charge'],
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
    