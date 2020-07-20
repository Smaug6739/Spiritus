const { MessageEmbed } = require("discord.js")
const axios = require('axios');
module.exports.run = async (client, message, args,settings) => {
  
    if(!args[0]){
      const embed = new MessageEmbed()
      .setTitle('Commande emoji')
      .setDescription(`La commande __emoji__ permet de gérer les emojis du serveur graces aux sous commandes suivantes :\n\n${client.config.emojis.FLECHE}__emoji liste__ permet voir les emojis du serveur.\n${client.config.emojis.FLECHE}__emoji create__ permet de crée un emoji.\n${client.config.emojis.FLECHE}__emoji update__ permet de mettre a jour le nom d'un emoji.\n${client.config.emojis.FLECHE}__emoji delete__ permet de supprimer un emoji.`)
      .setColor(`${client.config.color.EMBEDCOLOR}`)
      /*.addFields(
          { name: '\u200b', value: `${client.config.emojis.FLECHE}\`emoji liste\` permet voir les emojis du serveur.`, inline: false },
          { name: '\u200b', value: `${client.config.emojis.FLECHE}\`emoji create\` permet de crée un emoji.`, inline: false },
          { name: '\u200b', value: `${client.config.emojis.FLECHE}\`emoji update\` permet de mettre a jour le nom d\`un emoji.`, inline: false },
          { name: '\u200b', value: `${client.config.emojis.FLECHE}\`emoji delete\` permet de supprimer un emoji.`, inline: false })*/
      .setTimestamp()
      .setFooter('BOT ID : 689210215488684044')
      return message.channel.send(embed)
    }
    if(args[0].toLowerCase() === 'liste'){
        const emojisList = message.channel.guild.emojis.cache.map(emote => `<${emote.animated ? 'a' : ''}:${emote.name}:${emote.id}>`);
        let embed = {
            title: `Liste des emojis pour le serveur **${message.guild.name}** | ${emojisList.length} total`,
            color: `${client.config.color.EMBEDCOLOR}`,
            description: null,
            fields: []
        };
        if (emojisList.join(' ').length > 2048) {
            let i = '';
            // eslint-disable-next-line guard-for-in
            emojisList.forEach(emote => {
                if (i.length <= 1024 && i.length + emote.length > 1024) embed.fields.push({name: '\u200b', value: i, inline: true});
                i = i.concat(' ', emote);
            });
        } else {
            embed.description = emojisList.join(' ');
        }
        return message.channel.send({embed});
                
     
    //--------------------------------------EMOJIS-CREATE------------------------------------------------------
    }else if(args[0].toLowerCase() === 'create'){
        if(!message.member.hasPermission('MANAGE_EMOJIS'))return message.channel.send(`${client.config.emojis.FALSE}Vous devez avoir la permission de gérer les emojis pour utiliser cette commande.`);
        if(!message.guild.me.hasPermission('MANAGE_EMOJIS')) return message.channel.send(`${client.config.emojis.FALSE}Je n'ai pas la permission de gérer les emojis.`);
        if (args.length < 3 && !message.attachments.first()) {
          const emojiCreateDescription = new MessageEmbed()
            .setTitle(`Sous commande : ${settings.prefix}emoji create`)
            .setColor(client.config.color.EMBEDCOLOR)
            .setDescription(`**Module :** Manangement\n**Description :** Permet de crée un emoji sur le serveur\n**Usage : **${settings.prefix}emoji create [nom] (URL/Attachement)\n**Exemples :** \n ${settings.prefix}emoji create Spiritus https://cdn.discordapp.com/emojis/713121641701572698.png`)
            .setFooter('BOT ID : 689210215488684044')
            .setTimestamp()
            return message.channel.send(emojiCreateDescription)
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
            }).catch(() => {return});
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
        name = args[1]
        if(name.includes(':'))return message.channel.send(`${client.config.emojis.FALSE}Nom de l'emoji *(${name})* est invalide.`)
        try{
            emote = await message.channel.guild.emojis.create(base64Image,name);
        }catch(err){
            if(err.message.match('String value did not match validation regex'))return message.channel.send(`${client.config.emojis.FALSE}Le nom de l'emoji n'est pas valide.`);
            else{
                message.channel.send(`${client.config.emojis.FALSE}Une erreur s'est produite. Merci de réessayer.`)
                return client.channels.cache.get('725251200660013136').send(`Une erreur sur la commande \`emoji-create\` s'est produite sur le serveur : ${message.guild.name}.\nContenu du message : \`${message.content}\`\n\`ERREUR :\`\n\`\`\`xl\n${err}\`\`\``);
            }
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
    //--------------------------------------EMOJIS-UPDATE------------------------------------------------------
    }else if(args[0].toLowerCase() === 'update'){
        if(!message.member.hasPermission('MANAGE_EMOJIS'))return message.channel.send(`${client.config.emojis.FALSE}Vous devez avoir la permission de gérer les emojis pour utiliser cette commande.`);
        if(!message.guild.me.hasPermission('MANAGE_EMOJIS')) return message.channel.send(`${client.config.emojis.FALSE}Je n'ai pas la permission de gérer les emojis.`);
      const emojiUpdateDescription = new MessageEmbed()
            .setTitle(`Sous commande : ${settings.prefix}emoji update`)
            .setColor(client.config.color.VERT)
            .setDescription(`**Module :** Manangement\n**Description :** Permet de modifier le nom d'un emoji sur le serveur\n**Usage : **${settings.prefix}emoji update [nom] (Nouveau nom)\n**Exemples :** \n ${settings.prefix}emoji update BOT Spiritus`)
            .setFooter('BOT ID : 689210215488684044')
            .setTimestamp()
            if(!args[1])return message.channel.send(emojiUpdateDescription)
            if(!args[2]) return message.channel.send(`${client.config.emojis.FALSE}Veuillez donner un nom au nouvel emoji`);
            if(args[2].includes('-')||args[2].includes('/')||args[2].includes('/')||args[2].includes('+')||args[2].includes('*')||args[2].includes('(')||args[2].includes(')')||args[2].includes('[')||args[2].includes(']')||args[2].includes('{')||args[2].includes('}')||args[2].includes('#')||args[2].includes('~')||args[2].includes('@')||args[2].includes('&')||args[2].includes('^')||args[2].includes('$')||args[2].includes('€')||args[2].includes('°')||args[2].includes('%')||args[2].includes('£')||args[2].includes(',')||args[2].includes('<')||args[2].includes('>')) return message.channel.send(`${client.config.emojis.FALSE}Le nom de l'emoji n'est pas valide`);
            let emo = client.emojis.cache.find(emoji => emoji.name === args[1]);
            if(emo){
               let emoticon = client.emojis.cache.find(emoji => emoji.name === args[1]);
               let newNameEmot = args[2];
               if(newNameEmot.length < 2) return message.channel.send(`${client.config.emojis.FALSE}Le nom de l'emoji doit contenir au moins 2 caractères`);
               const embed = new MessageEmbed()
               .setTitle('Emoji update')
               .setThumbnail(emo.url)
               .setColor(client.config.color.VERT)
               .addFields({ name: 'Ancien nom :', value: `${args[1]}`, inline: true },
               { name: 'Nouveau nom', value: `${newNameEmot}`, inline: true })
               .setTimestamp()
               .setFooter('BOT ID : 689210215488684044', `${message.guild.iconURL()}`);
               try{
                   await emoticon.edit({ name: newNameEmot})
                   await message.channel.send(embed)
               }catch(err){
                   message.channel.send(`${client.config.emojis.FALSE}Une erreur s'est produite merci de ressayer`)
                   client.channels.cache.get('725251200660013136').send(`Une erreur sur la commande \`emoji-update\` s'est produite sur le serveur : ${message.guild.name}.\n\`ERREUR :\`\n\`\`\`xl\n${err}\`\`\``)
               }
             }else if(args[1].includes('>','<')){
               let newNameEmot = args.slice(2).join("_")
               if(newNameEmot.length < 2) return message.channel.send(`${client.config.emojis.FALSE}Le nom de l'emoji doit contenir au moins 2 caractères`);
               let emoo = args[1]
               let emojiString = emoo.replace(/<.*:/, '').slice(0, -1);
               const embed = new MessageEmbed()
               .setTitle('Emoji update')
               .setThumbnail(message.guild.emojis.cache.get(emojiString).url)
               .setColor(client.config.color.VERT)
               .addFields(
               { name: 'Emoji :', value: `${args[1]}`, inline: true },
               { name: 'Nouveau nom', value: `${newNameEmot}`, inline: true })
               .setTimestamp()
               .setFooter('BOT ID : 689210215488684044', `${message.guild.iconURL()}`);
               try{
                   message.guild.emojis.cache.get(emojiString).edit({ name: newNameEmot });
                   message.channel.send(embed);
               }catch(err){
                   message.channel.send(`${client.config.emojis.FALSE}Une erreur s'est produite merci de ressayer`)
                   client.channels.cache.get('725251200660013136').send(`Une erreur sur la commande \`emoji-update\` s'est produite sur le serveur : ${message.guild.name}.\n\`ERREUR :\`\n\`\`\`xl\n${err}\`\`\``);
                   return;
               }
               
             }else{
               return message.channel.send(`${client.config.emojis.FALSE}Une erreur s\'est produite... Verifiez que l\'emoji est correctement orthographier.`);
             }
      
    //-------------------------------------------EMOJIS-DELETE----------------------------------------------------
    }else if(args[0].toLowerCase() === 'delete'){
        if(!message.member.hasPermission('MANAGE_EMOJIS'))return message.channel.send(`${client.config.emojis.FALSE}Vous devez avoir la permission de gérer les emojis pour utiliser cette commande.`);
        if(!message.guild.me.hasPermission('MANAGE_EMOJIS')) return message.channel.send(`${client.config.emojis.FALSE}Je n'ai pas la permission de gérer les emojis.`);
      const emojiDeleteDescription = new MessageEmbed()
          .setTitle(`Sous commande : ${settings.prefix}emoji delete`)
          .setColor(client.config.color.EMBEDCOLOR)
          .setDescription(`**Module :** Manangement\n**Description :** Permet de supprimer un emoji sur le serveur\n**Usage : **${settings.prefix}emoji delete [nom]\n**Exemples :** \n ${settings.prefix}emoji delete Spiritus`)
          .setFooter('BOT ID : 689210215488684044')
          .setTimestamp()
          if(!args[1])return message.channel.send(emojiDeleteDescription)
        let emo = client.emojis.cache.find(emoji => emoji.name === args[1])
        if(emo){
            //emoji-nom
            const embed = new MessageEmbed()
            .setTitle('Emoji delete')
            .setThumbnail(emo.url)
            .setColor(client.config.color.VERT)
            .addFields(
            { name: 'Nom :', value: `${args[1]}`, inline: true })
            .setTimestamp()
            .setFooter('BOT ID : 689210215488684044', `${message.guild.iconURL()}`);
            try{
                message.channel.send(embed)
                emo.delete()
            }catch(err){
                //message.channel.send(`${client.config.emojis.FALSE}Une erreur s'est produite merci de réessayer`);
                client.channels.cache.get('725251200660013136').send(`Une erreur sur la commande \`emoji-delete\` s'est produite sur le serveur : ${message.guild.name}.\n\`ERREUR :\`\n\`\`\`xl\n${err}\`\`\``);
                return;
            };
            }else if(args[1].includes('>','<')){
                let emoo = args[1]
                let emojiString = emoo.replace(/<.*:/, '').slice(0, -1);
                const embed = new MessageEmbed()
                .setTitle('Emoji delete')
                .setThumbnail(message.guild.emojis.cache.get(emojiString).url)
                .setColor(client.config.color.VERT)
                .addFields(
                { name: 'Emoji :', value: `${message.guild.emojis.cache.get(emojiString)}`, inline: true })
                .setTimestamp()
                .setFooter('BOT ID : 689210215488684044', `${message.guild.iconURL()}`);
                try{
                    message.channel.send(embed)
                    message.guild.emojis.cache.get(emojiString).delete()
                }catch(err){
                    //message.channel.send(`${client.config.emojis.FALSE}Une erreur s'est produite merci de réessayer`);
                    client.channels.cache.get('725251200660013136').send(`Une erreur sur la commande \`emoji-delete\` s'est produite sur le serveur : ${message.guild.name}.\n\`ERREUR :\`\n\`\`\`xl\n${err}\`\`\``);
                    return;
                }; 
        }else{
            message.channel.send(`${client.config.emojis.FALSE}Je n\'ai pas trouver cet emoji... Essayez vérifiez son orthographe et qu'il est bien sur le serveur`)
        }
    }else{
        const emoteID = await args[0].trim().replace('<:', '').replace('<a:', '').replace('>', '').split(':')[1];
        if (!emoteID) return message.channel.send(`${client.config.emojis.FALSE}Je n'ai pas trouver cet emoji.`);
        const emoteURL = `https://cdn.discordapp.com/emojis/${emoteID}${args[0].startsWith('<a:') ? '.gif' : '.png'}`;
        const embed = new MessageEmbed()
        .setTitle('Emoji view')
        .setColor(`${client.config.color.EMBEDCOLOR}`)
        .setImage(emoteURL)
        .setTimestamp()
        .setFooter('BOT ID : 689210215488684044')
        message.channel.send(embed)
    }
}
module.exports.help = {
    name : 'emojis',
    aliases : ['emojis','emoji','emots'],
    category : 'administration',
    description : 'Permet de gérer les emojis.',
    cooldown : 5,
    usage : '<action> <args>',
    exemple :["emoji create lien Spiritus "],
    permissions : false,
    isUserAdmin: false,
    args : false,
    sousCommdandes : ["emojis liste","emojis create","emojis update","emoji delete"]

}
