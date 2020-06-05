const { Guild } = require("../../models/index");

module.exports.run = async (client, message, args) =>{
    let {ADMIN,TRUE,FALSE} = require('./../../configstyle')

    if(!ADMIN.includes(message.author.id)) return message.channel.send(`${FALSE}Tu n'est pas admin du BOT `)
    let sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

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

  message.channel.send(`${TRUE}Recharge de toutes les guilds lancée.`)
}
module.exports.help = {
        
    name : 'charge',
    aliases : ['charge'],
    category : 'admin',
    description : 'Commandes pour la charge les guilds',
    cooldown : 5,
    usage : '',
   // exemple :["ping"],
    permissions : true,
    isUserAdmin: false,
    args : false
}    
    