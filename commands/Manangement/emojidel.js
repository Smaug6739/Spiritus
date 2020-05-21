const color = require('../../util/constants')
const { MessageEmbed } = require("discord.js") 

module.exports.run = async (client, message, args) => {
    
    //const emojiList = message.guild.emojis.cache.map(e=>e.toString()).join(" ");
    //message.channel.send(emojiList);
    /*
    const emojiList = message.guild.emojis.cache.map((e, x) => ( e.toString() + x + ' = ' + e) + ' | ' +e.name ).join('\n');
    message.channel.send(emojiList);
    */
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
    }else{
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
    }

}
module.exports.help = {
    
    name : 'emoji-delete',
    aliases : ['emoji-del'],
    category : 'misc',
    description : 'Supprimer un emoji',
    cooldown : 5,
    usage : '',
    exemple :["emojidel name_emot"],
    permissions : false,
    isUserAdmin: false,
    args : false
}
