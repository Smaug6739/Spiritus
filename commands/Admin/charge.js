const { Guild } = require("../../models/index");

module.exports.run = async (client, message, args) =>{
    if (message.author.id !== '611468402263064577') return message.channel.send('Vous n\'avez pas la permission d\'utiliser cette commande');
    let sleep = ms => new Promise(resolve => setTimeout(resolve, ms));
    let OK = client.emojis.cache.find(emoji => emoji.name === "61100464854223562974");

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

  message.channel.send(`${OK}Recharge lancée`)
}
module.exports.help = {
        
    name : 'charge',
    aliases : ['charge'],
    category : 'admin',
    description : 'Commandes pour la charge des guilds',
    cooldown : 5,
    usage : '',
   // exemple :["ping"],
    permissions : true,
    isUserAdmin: false,
    args : false
}    
    