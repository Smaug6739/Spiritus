const color = require('../util/constants')
const { MessageEmbed } = require("discord.js") 
module.exports.run = async (client, message, args) => {
    let { FALSE } = require('../configstyle');
    if(!message.guild.me.hasPermission('MANAGE_EMOJIS')) return message.channel.send(`${FALSE}Je n'ai pas la permission de gérer les emojis.`);

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
        try{
            message.channel.send(embed)
            emo.delete()

        }catch(err){
            //message.channel.send(`${FALSE}Une erreur s'est produite merci de réessayer`);
            client.channels.cache.get('716377260751454210').send(`Une erreur sur la commande \`channel-delete\` s'est produite sur le serveur : ${message.guild.name}.\n\`ERREUR :\`\n\`\`\`xl\n${err}\`\`\``);
            return;
        };
        
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
         { name: 'URL :', value: `${message.guild.emojis.cache.get(emoji_string).url}`, inline: true })
        .setTimestamp()
        .setFooter('BOT ID : 689210215488684044', `${message.guild.iconURL()}`);
        try{
            message.channel.send(embed)
            message.guild.emojis.cache.get(emoji_string).delete()

        }catch(err){
            //message.channel.send(`${FALSE}Une erreur s'est produite merci de réessayer`);
            client.channels.cache.get('716377260751454210').send(`Une erreur sur la commande \`channel-delete\` s'est produite sur le serveur : ${message.guild.name}.\n\`ERREUR :\`\n\`\`\`xl\n${err}\`\`\``);
            return;
        };
        
    }else{
        message.channel.send(`${FALSE}Je n\'ai pas trouver cet emoji... Essayez vérifiez son orthographe et qu'il est bien sur le serveur`)
    }
 }else{
    return message.channel.send(`${FALSE}Vous devez avoir la permission de gérer les emojis pour utiliser cette commande !`)

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
    args : true
}
