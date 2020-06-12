const { MESSAGES } = require("../../util/constants");

module.exports.run = async (client, message, args, settings) => {
    const getSetting = args[0];
    const newSetting = args.slice(1).join(" ");
    switch(getSetting){
        case  'prefix' : {
            if(newSetting){
                await client.updateGuild(message.guild, {prefix : newSetting});
                return message.channel.send(`Prefix mis a jour : \`${settings.prefix }\` ->\`${newSetting}\``)
            }
            message.channel.send(`Prefix actuel : \`${settings.prefix}\``);
            break;
        }
        case  'logChannel' : {
            if(newSetting){
                await client.updateGuild(message.guild, {logChannel : newSetting});
                return message.channel.send(`logChannel mis a jour : \`${settings.logChannel }\` ->\`${newSetting}\``)
            }
            message.channel.send(`logChannel actuel : \`${settings.logChannel}\``);
            break;
        }
        case  'welcomeMessage' : {
            if(newSetting){
                await client.updateGuild(message.guild, {welcomeMessage : newSetting});
                return message.channel.send(`welcomeMessage mis a jour : \`${settings.welcomeMessage }\` ->\`${newSetting}\``)
            }
            message.channel.send(`welcomeMessage actuel : \`${settings.welcomeMessage}\``);
            break;
        }
        case  'experience' : {
            let uexp ;
            if(settings.expsysteme == true) uexp = false;
            else uexp = true;
            //if(newSetting){
                await client.updateGuild(message.guild, {expsysteme : uexp});
                 message.channel.send(`Système d'experience du serveur mis a jour : \`${settings.expsysteme }\` ->\`${uexp}\``)
            //}
           
            break;
        }
     
    }
};
module.exports.help = {
    
    name: "config",
    aliases: ['config'],
    category: 'admin',
    description: "Modiffier la base de donnée",
    cooldown: 0.1,
    usage: '<key_to_modify> <value>',
    exemple :[],
    isUserAdmin: false,
    permissions: true,
    args: true,
    sousCommdandes : ["config prefix","config logChannel","config welcomeMessage","config experience"]
}