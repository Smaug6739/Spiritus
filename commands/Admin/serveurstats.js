const { MESSAGES } = require("../../util/constants");

module.exports.run = async (client, message, args, settings) => {
   
            let serverstats ;
            if(settings.serveurstats == true) serverstats = false;
            else serverstats = true;
            //if(newSetting){
                await client.updateGuild(message.guild, {serveurstats : serverstats});
                 message.channel.send(`Système de serveur stats du serveur mis a jour : \`${settings.serveurstats }\` ->\`${serverstats}\``)

                    const logs = await message.guild.channels.cache.find(c => c.name.startsWith("All Members :"))

                    if(!logs && serverstats == true){

                    await message.guild.channels.create(`All Members : ${message.guild.memberCount}`, {type : "voice"})

                    }else if(logs && serverstats == false){

                        message.guild.channels.cache.find(c => c.name.startsWith("All Members :")).delete()

                    }
                  
                
                 
            //}
           
        
     
    }

module.exports.help = {
    
    name: "serveur-stats",
    aliases: ['serveur-stats'],
    category: 'admin',
    description: "Active le système d'experience sur le serveur.",
    cooldown: 0.1,
    usage: '',
    exemple :[],
    isUserAdmin: false,
    permissions: true,
    args: false,
    sousCommdandes : []

}