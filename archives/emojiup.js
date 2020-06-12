const { MessageEmbed } = require("discord.js") 
module.exports.run = async (client, message, args) => {
    let { FALSE } = require('../configstyle');
    if(!message.guild.me.hasPermission('MANAGE_EMOJIS')) return message.channel.send(`${FALSE}Je n'ai pas la permission de gérer les emojis.`);

 if(message.member.hasPermission('MANAGE_EMOJIS')){
     if(!args[1]) return message.channel.send(`${FALSE}Veuillez donner un nom au nouvel emoj`);
     if(args[1].includes('-')||args[1].includes('/')||args[1].includes('/')||args[1].includes('+')||args[1].includes('*')||args[1].includes('(')||args[1].includes(')')||args[1].includes('[')||args[1].includes(']')||args[1].includes('{')||args[1].includes('}')||args[1].includes('#')||args[1].includes('~')||args[1].includes('@')||args[1].includes('&')||args[1].includes('^')||args[1].includes('$')||args[1].includes('€')||args[1].includes('°')||args[1].includes('%')||args[1].includes('£')||args[1].includes(',')||args[1].includes('<')||args[1].includes('>')) return message.channel.send(`${FALSE}Le nom de l'emoji n'est pas valide`);
     let emo = client.emojis.cache.find(emoji => emoji.name === args[0]);
     if(emo){
        let emoticon = client.emojis.cache.find(emoji => emoji.name === args[0]);
        let nom_emoji_nouveau = args[1];
        if(nom_emoji_nouveau.length < 2) return message.channel.send(`${FALSE}Le nom de l'emoji doit contenir au moins 2 caractères`);
        const embed = new MessageEmbed()
        .setTitle('Emoji update')
        .setThumbnail(emo.url)
        .setColor(0x00FF00)
        .addFields({ name: 'Ancien nom :', value: `${args[0]}`, inline: true },
        { name: 'Nouveau nom', value: `${nom_emoji_nouveau}`, inline: true },
        { name: 'Emoji', value: `${emo.url}`, inline: true })
        .setTimestamp()
        .setFooter('BOT ID : 689210215488684044', `${message.guild.iconURL()}`);
        try{
            await emoticon.edit({ name: nom_emoji_nouveau})
            await message.channel.send(embed)
        }catch(err){
            message.channel.send(`${FALSE}Une erreur s'est produite merci de ressayer`)
            client.channels.cache.get('716382691712303167').send(`Une erreur sur la commande \`emoji-update\` s'est produite sur le serveur : ${message.guild.name}.\n\`ERREUR :\`\n\`\`\`xl\n${err}\`\`\``)
        }

      }else if(args[0].includes('>','<')){
        let nom_emoji_nouveau = args[1]
        if(nom_emoji_nouveau.length < 2) return message.channel.send(`${FALSE}Le nom de l'emoji doit contenir au moins 2 caractères`);
        let emoo = args[0]
        let emoji_string = emoo.replace(/<.*:/, '').slice(0, -1);
        
        //console.log(emoji_string)
        const embed = new MessageEmbed()
        .setTitle('Emoji update')
        .setThumbnail(message.guild.emojis.cache.get(emoji_string).url)
        .setColor(0x00FF00)
        .addFields(
        { name: 'Serveur :', value: `${message.guild.name}`, inline: true },
        { name: 'Emoji :', value: `${args[0]}`, inline: true },
        { name: 'Nouveau nom', value: `${nom_emoji_nouveau}`, inline: true },
        { name: 'URL : :', value: `${message.guild.emojis.cache.get(emoji_string).url}`, inline: true })
        .setTimestamp()
        .setFooter('BOT ID : 689210215488684044', `${message.guild.iconURL()}`);
        try{
            message.guild.emojis.cache.get(emoji_string).edit({ name: nom_emoji_nouveau });
            message.channel.send(embed);
        }catch(err){
            message.channel.send(`${FALSE}Une erreur s'est produite merci de ressayer`)
            client.channels.cache.get('716382691712303167').send(`Une erreur sur la commande \`emoji-update\` s'est produite sur le serveur : ${message.guild.name}.\n\`ERREUR :\`\n\`\`\`xl\n${err}\`\`\``);
            return;
        }
        
      }else{
        return message.channel.send(`${FALSE}Une erreur s\'est produite... Verifiez que vous avez la permission de gérer les emojis ou que l\'emoji est correctement orthographier`);
      }

 }else{
    return message.channel.send(`${FALSE}Vous devez avoir la permission de gérer les emojis pour utiliser cette commande .`);
 }
}

module.exports.help = {

    name : 'emoji-update',
    aliases : ['emoji-up'],
    category : 'manangement',
    description : 'Mettre a jour le nom d\'un emoji',
    cooldown : 5,
    usage : '<emoji> <nouveau_nom>',
    exemple :["emojiup name_emot new_name"],
    permissions : false,
    isUserAdmin: false,
    args : true
}
