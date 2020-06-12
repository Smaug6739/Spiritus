const { MESSAGES } = require("../../util/constants");

module.exports.run = async (client, message, args, settings) => {
   
            let uexp ;
            if(settings.expsysteme == true) uexp = false;
            else uexp = true;
            //if(newSetting){
                await client.updateGuild(message.guild, {expsysteme : uexp});
                 message.channel.send(`Système d'experience du serveur mis a jour : \`${settings.expsysteme }\` ->\`${uexp}\``)
            //}
           
        
     
    }

module.exports.help = {
    
    name: "experience",
    aliases: ['experience'],
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