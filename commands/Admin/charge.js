const { Guild } = require("../../models/index");

module.exports.run = async (client, message, args) =>{
    let {ADMIN,TRUE,FALSE} = require('./../../configstyle')
    if(!ADMIN.includes(message.author.id)) return message.channel.send(`${FALSE}Tu n'est pas admin du BOT `)


    //---------------------------------------CHARGE-DES-GUILDS--------------------------------------------------
    if(args[0] === 'charge'){

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
    //---------------------------------------RESTART--------------------------------------------------
    }else if(args[0] === 'restart'){
        console.log("Redemarage")
        await message.channel.send(`${TRUE}OK .`)
        process.exit()
    //---------------------------------------PULL-REPO--------------------------------------------------
    }else if(args[0] === 'pull'){
        let loading = '<a:loading:688692468195262475>'
        console.log("Pull")
        message.channel.send(`${loading} Commande en cour d'execution...`).then(async msg =>{
        try {
            await exec('git pull');
            msg.edit(`${TRUE} Updated.`);
        } catch (err) {
            msg.edit(`${FALSE} An error occured:\n\`\`\`${err}\n\`\`\``);
        }
    })
    }
    //------------------------------------------------------------------------------------------------------------------
}
module.exports.help = {
        
    name : 'admin',
    aliases : ['admin'],
    category : 'admin',
    description : 'Commandes pour la charge les guilds',
    cooldown : 5,
    usage : '',
   // exemple :["ping"],
    permissions : true,
    isUserAdmin: false,
    args : false
}    
    