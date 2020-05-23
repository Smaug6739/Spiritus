const { MessageEmbed } = require("discord.js") 
module.exports.run = async (client, message, args) => {
    let { FALSE } = require('../../configstyle');

 if(message.member.hasPermission('MANAGE_EMOJIS')){

    let emo = client.emojis.cache.find(emoji => emoji.name === args[0])

    if(emo){
        let emoticon = client.emojis.cache.find(emoji => emoji.name === args[0])
        //emoji-nom
        const embed = new MessageEmbed()
        .setTitle('Emoji update')
        .setThumbnail(emo.url)
        .setColor(0x00FF00)
        .addFields(
        { name: 'Ancien nom :', value: `${args[0]}`, inline: true },
        { name: 'Nouveau nom', value: `${args[1]}`, inline: true },
        { name: 'Emoji', value: `${emo.url}`, inline: true }

        )
        .setTimestamp()
        .setFooter('BOT ID : 689210215488684044', `${message.guild.iconURL()}`);
    await emoticon.edit({ name: args[1] })
    message.channel.send(embed)
    }else if(args[0].includes('>','<')){
    //emoji-taper
        let emoo = args[0]
        let emoji_string = emoo.replace(/<.*:/, '').slice(0, -1);
        console.log(emoji_string)
        const embed = new MessageEmbed()
        .setTitle('Emoji update')
        .setThumbnail(message.guild.emojis.cache.get(emoji_string).url)
        .setColor(0x00FF00)
        .addFields(
        { name: 'Serveur :', value: `${message.guild.name}`, inline: true },
        { name: 'Emoji :', value: `${args[0]}`, inline: true },
        { name: 'Nouveau nom', value: `${args[1]}`, inline: true },
        { name: 'URL : :', value: `${message.guild.emojis.cache.get(emoji_string).url}`, inline: true })
        .setTimestamp()
        .setFooter('BOT ID : 689210215488684044', `${message.guild.iconURL()}`);
        message.guild.emojis.cache.get(emoji_string).edit({ name: args[1] })
        message.channel.send(embed)
     }else{
        return message.channel.send(`${FALSE}Une erreur s\'est produite... Verifiez que vous avez la permission de gérer les emojis ou que l\'emoji est correctement orthographier`)

     }

 }else{
    return message.channel.send(`${FALSE}Vous devez avoir la permission de gérer les emojis pour utiliser cette commande !`)
}
}
module.exports.help = {
    
    name : 'emoji-update',
    aliases : ['emoji-up'],
    category : 'manangement',
    description : 'Mettre a jour le nom d\'un emoji',
    cooldown : 5,
    usage : '',
    exemple :["emojiup name_emot new_name"],
    permissions : false,
    isUserAdmin: false,
    args : true
}
