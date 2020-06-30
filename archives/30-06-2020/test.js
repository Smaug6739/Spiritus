const {MessageEmbed} = require('discord.js')
const axios = require('axios');
module.exports.run =async(client, message, args) => {
    if(args[0].toLowerCase() === 'create'){
        if (args.length < 3 && !message.attachments.first()) {
            message.channel.send("La commande aide")   
        }
        if (args[1].length < 2 ) return message.channel.send(`${client.config.emojis.FALSE}Le nom de l'emoji doit contenir au moins 2 caractères `);
        if ((/\u00a9|\u00ae|[\u2000-\u3300]|\ud83c[\ud000-\udfff]|\ud83d[\ud000-\udfff]|\ud83e[\ud000-\udfff]/).test(args[2])) return message.channel.send(`${client.config.emojis.FALSE}Vous ne pouvez pas crée un emojis présent sur discord`);
        let base64Image;
        if (args[2] && (/<a?:([a-z0-9-_]+):(\d+)>/gi).test(args[2])) {
            let extension = args[1].startsWith('<a:') ? '.gif' : '.png';
            let emoteLink = `https://cdn.discordapp.com/emojis/${args[2].replace('<:', '').replace('<a:', '').replace('>', '').split(':')[1]}${extension}`;
            const query = await axios({
                url: emoteLink,
                responseType: 'arraybuffer'
            }).catch(() => message.channel.send('Je n\'ai pas trouver cet emot'));
            let data = Buffer.from(query.data, 'binary');
            base64Image = `data:image/${extension.slice(1)};base64,` + data.toString('base64');
        }
        if (args[2] && (args[2].startsWith('https://') || args[2].startsWith('http://'))) {
            let extension = args[2].includes('.gif') ? 'gif' : 'png';
            const query = await axios({
                url: args[2],
                responseType: 'arraybuffer'
            }).catch( _ =>{return message.channel.send(`${client.config.emojis.FALSE}URL invalide`)})
            base64Image = args[2];
        }
        if (!args[2] && message.attachments.first()) {
            let extension = message.attachments.first().url.endsWith('.gif') ? 'gif' : 'png';
            const query = await axios({
                url: message.attachments.first().url,
                responseType: 'arraybuffer',
            });
            base64Image = message.attachments.first().url
        }
        try{
            emote = await message.channel.guild.emojis.create(base64Image,args[1]);
        }catch(err){
            console.log(err)
            return;
        }
        const embed = new MessageEmbed()
        .setTitle(`${client.config.emojis.TRUE} Emoji created`)
        .setColor(client.config.color.VERT)
        .setThumbnail(`https://cdn.discordapp.com/emojis/${emote.id}${emote.animated ? '.gif' : '.png'}`)
        .addField(`Nom :`,`${emote.name}`,true)
        .addField(`Emoji :`,`<${emote.animated ? 'a' : ''}:${emote.name}:${emote.id}>`,true)
        .setTimestamp()
        .setFooter('BOT ID : 689210215488684044')
        return message.channel.send(embed);
    }
}


module.exports.help = {
    
    name : 'test',
    aliases : ['test'],
    category : 'misc',
    description : 'Ping le bot et donne son temps de réaction',
    cooldown : 3,
    usage : '',
    exemple :['ping'],
    permissions : false,
    isUserAdmin: false,
    args : false,
    sousCommdandes : []
}