const { MessageEmbed} = require("discord.js");
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
            if(settings.premium == true){
                let uexp ;
                if(settings.expsysteme == true) uexp = false;
                else uexp = true;
                    await client.updateGuild(message.guild, {expsysteme : uexp});
                    message.channel.send(`Système d'experience du serveur mis à jour : \`${settings.expsysteme }\` ->\`${uexp}\``)
            }else{
                return message.channel.send(`${client.config.emojis.FALSE}Votre serveur n'est pas un serveur partenaire/VIP. Si vous souhaitez débloquer cette commande vous pouvez rejoindre le serveur support.`)
            }
            break;
        }
        case  'admin-invites' : {
                let invit ;
                if(settings.invitations == true) invit = false;
                else invit = true;
                    await client.updateGuild(message.guild, {invitations : invit});
                    message.channel.send(`Système d'anti-invits du serveur mis à jour : \`${settings.invitations }\` ->\`${invit}\``)
            break;
        }
        case  'rankcard' : {
            if(settings.premium == true){
                if(newSetting){
                    if(args[1].includes('png') || args[1].includes('PNG')|| args[1].includes('JPG')|| args[1].includes('jpg')|| args[1].includes('JPEG')|| args[1].includes('jpeg')|| args[1].includes('GIF')|| args[1].includes('gif')){
                        await client.updateGuild(message.guild, {rankcard : newSetting});
                        return message.channel.send(`rank-card mis a jour : \`${settings.rankcard }\` ->\`${newSetting}\``)
                    }else return message.channel.send(`${client.config.emojis.FALSE}Le fichier n'est pas a un format valide. Les formats valides sont : png, jpg, jpeg et gif`)
                }
                message.channel.send(`rank-card actuel : \`${settings.rankcard}\``);
            }else{
                return message.channel.send(`${client.config.emojis.FALSE}Votre serveur n'est pas un serveur partenaire/VIP. Si vous souhaitez débloquer cette commande vous pouvez rejoindre le serveur support.`)
            }
            break;
        }
        case 'serveurstats' :{
            let serverstats ;
            if(settings.serveurstats == true) serverstats = false;
            else serverstats = true;
                await client.updateGuild(message.guild, {serveurstats : serverstats});
                    message.channel.send(`Système de serveur stats du serveur mis a jour : \`${settings.serveurstats }\` ->\`${serverstats}\``)
                    const logs = await message.guild.channels.cache.find(c => c.name.startsWith("All Members :"))
                    if(!logs && serverstats == true){
                    await message.guild.channels.create(`All Members : ${message.guild.memberCount}`, {type : "voice"})
                    }else if(logs && serverstats == false){
                        message.guild.channels.cache.find(c => c.name.startsWith("All Members :")).delete()
                    }
            }
        default : {
            const config = new MessageEmbed()
            .setTitle(`Commande config`)
            .setColor(client.config.color.EMBEDCOLOR)
            .setDescription(`**Module :** Admin\n**Description :** Permet de configurer le bot sur votre serveur.\n**Usage :** [action] (valeur)\n**Exemples :** \n ${settings.prefix}config prefix // \n ${settings.prefix}config serveurstats`)
            .setFooter('BOT ID : 689210215488684044')
            .setTimestamp()
            message.channel.send(config)
        }
    }
};
module.exports.help = {
    
    name: "config",
    aliases: ['config'],
    category: 'administration',
    description: "Modiffier la base de donnée",
    cooldown: 10,
    usage: '[paramètre] (valeur)',
    exemple :[],
    isUserAdmin: false,
    permissions: true,
    args: true,
    sousCommdandes : ["config prefix","config logChannel","config welcomeMessage","config experience","config admin-invites","config rankcard","config serveurstats"]
}