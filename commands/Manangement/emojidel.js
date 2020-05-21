const color = require('../../util/constants')
const { MessageEmbed } = require("discord.js") 

module.exports.run = async (client, message, args) => {
    if(message.member.hasPermission('MANAGE_EMOJIS')){

    let emo = client.emojis.cache.find(emoji => emoji.name === args[0])
    if(emo){
        //emoji-nom
        const embed = new MessageEmbed()
        .setTitle('Emoji delete')
        .setThumbnail(emo.url)
        .setColor(0x00FF00)
        .addFields(
         { name: 'Nom :', value: `${args[0]}`, inline: true },
         )
        .setTimestamp()
        .setFooter('BOT ID : 689210215488684044', `${message.guild.iconURL()}`);
        message.channel.send(embed)
        emo.delete()
    }else if(args[0].includes('>','<')){
        //emoji-taper
        let emoo = args[0]
        let emoji_string = emoo.replace(/<.*:/, '').slice(0, -1);
        console.log(emoji_string)
        const embed = new MessageEmbed()
        .setTitle('Emoji delete')
        .setThumbnail(message.guild.emojis.cache.get(emoji_string).url)
        .setColor(0x00FF00)
        .addFields(
         { name: 'URL : :', value: `${message.guild.emojis.cache.get(emoji_string).url}`, inline: true })
        .setTimestamp()
        .setFooter('BOT ID : 689210215488684044', `${message.guild.iconURL()}`);
    message.channel.send(embed)
    message.guild.emojis.cache.get(emoji_string).delete()
    }else{
        message.channel.send('Je n\'ai pas trouver cet emot...\nEssayez de le coller :wink:')
    }
    }else{
        return message.channel.send('Vous devez avoir la permission de gérer les emojis pour utiliser cette commande !')

    }
}
module.exports.help = {
    
    name : 'emoji-delete',
    aliases : ['emoji-del'],
    category : 'manangement',
    description : 'Supprimer un emoji',
    cooldown : 5,
    usage : '',
    exemple :["emojidel name_emot"],
    permissions : false,
    isUserAdmin: false,
    args : false
}
