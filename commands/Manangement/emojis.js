const { MessageEmbed } = require("discord.js") 
module.exports.run = async (client, message, args) => {
    let { FALSE,FLECHE } = require('../../configstyle');
    if(!message.guild.me.hasPermission('MANAGE_EMOJIS')) return message.channel.send(`${FALSE}Je n'ai pas la permission de gérer les emojis.`);
    if(!message.member.hasPermission('MANAGE_EMOJIS'))return message.channel.send(`${FALSE}Vous devez avoir la permission de gérer les emojis pour utiliser cette commande !`)
    if(!args[0]){
      const embed = new MessageEmbed()
      .setTitle('Commande emoji')
      .setDescription('La commande `emoji` permet de gérer les emojis du serveur graces aux sous commandes suivantes :')
      .addFields(
          { name: '\u200b', value: `${FLECHE}\`emoji liste\` permet voir les emojis du serveur.`, inline: false },
          { name: '\u200b', value: `${FLECHE}\`emoji create\` permet de crée un emoji.`, inline: false },
          { name: '\u200b', value: `${FLECHE}\`emoji update\` permet de mettre a jour le nom d\`un emoji.`, inline: false },
          { name: '\u200b', value: `${FLECHE}\`emoji delete\` permet de supprimer un emoji.`, inline: false }
      )
      .setTimestamp()
      .setFooter('BOT ID : 689210215488684044')
     return message.channel.send(embed)
  }
    if(args[0].toLowerCase() === 'liste'){
      const emojiList = message.guild.emojis.cache.map(e=>e.toString()).join(" ");
      const embed = new MessageEmbed()
       .setTitle('Liste des emojis du serveur')
       .setDescription(emojiList)
       .setTimestamp()
       .setFooter('BOT ID : 689210215488684044')
      message.channel.send(embed)
    //--------------------------------------EMOJIS-CREATE------------------------------------------------------
    }else if(args[0].toLowerCase() === 'create'){
            if(!args[1]) return message.channel.send(`${FALSE}Merci de d'incure le nom du nouvel emoji et son nom.`)
            if(args[1].includes('-')||args[1].includes('/')||args[1].includes('/')||args[1].includes('+')||args[1].includes('*')||args[1].includes('(')||args[1].includes(')')||args[1].includes('[')||args[1].includes(']')||args[1].includes('{')||args[1].includes('}')||args[1].includes('#')||args[1].includes('~')||args[1].includes('@')||args[1].includes('&')||args[1].includes('^')||args[1].includes('$')||args[1].includes('€')||args[1].includes('°')||args[1].includes('%')||args[1].includes('£')||args[1].includes(',')||args[1].includes('<')||args[1].includes('>')) return message.channel.send(`${FALSE}Le nom de l'emoji n'est pas valide`);
            let nom_emoji = args[1]
            let emoji = '';
            if(message.attachments.first()){
              emoji = message.attachments.first().url
            }else{
              emoji = args[2]
            }
            if(!message.attachments.first() && !args[2]) return message.channel.send(`${FALSE}Une erreur s'est produite.Verifiez que vous utiliser correctement la commande.`);
            if(!message.attachments.first() && !args[2].includes('http'||'https'&&'.png'||'.gif'||'.jpg'||'jpeg'))return message.channel.send(`${FALSE}Le lien n'est pas valide.Merci de spécifier le lien d'une image`);
            if(nom_emoji.length < 2) return message.channel.send(`${FALSE}Le nom de l'emoji doit contenir au moins 2 caractères`);
            const embed = new MessageEmbed()
            embed.setTitle('Emoji create')
            embed.setThumbnail(emoji)
            embed.setColor(0x00FF00)
            embed.addFields({ name: 'Nom :', value: `${nom_emoji}`, inline: true },
            { name: 'Emoji URL :', value: `${emoji}`, inline: true })
            embed.setTimestamp()
            embed.setFooter('BOT ID : 689210215488684044', `${message.guild.iconURL()}`);
            //-------------------------------------CREATION EMOJI -----------------------------------------
            try{            
              await  message.guild.emojis.create(emoji, nom_emoji)
              .then(message.channel.send(embed));
              //.catch(console.error);
        
            }catch(err){
              message.channel.send(`${FALSE}Une erreur s'est produite merci de ressayer`);
              client.channels.cache.get('725251200660013136').send(`Une erreur sur la commande \`emoji-create\` s'est produite sur le serveur : ${message.guild.name}.\n\`ERREUR :\`\n\`\`\`xl\n${err}\`\`\``);
            }
    //--------------------------------------EMOJIS-UPDATE------------------------------------------------------
    }else if(args[0].toLowerCase() === 'update'){
            if(!args[1]) return message.channel.send(`${FALSE}Merci d'inclure l'emoji a modifier puis son nom.`)
            if(!args[2]) return message.channel.send(`${FALSE}Veuillez donner un nom au nouvel emoji`);
            if(args[2].includes('-')||args[2].includes('/')||args[2].includes('/')||args[2].includes('+')||args[2].includes('*')||args[2].includes('(')||args[2].includes(')')||args[2].includes('[')||args[2].includes(']')||args[2].includes('{')||args[2].includes('}')||args[2].includes('#')||args[2].includes('~')||args[2].includes('@')||args[2].includes('&')||args[2].includes('^')||args[2].includes('$')||args[2].includes('€')||args[2].includes('°')||args[2].includes('%')||args[2].includes('£')||args[2].includes(',')||args[2].includes('<')||args[2].includes('>')) return message.channel.send(`${FALSE}Le nom de l'emoji n'est pas valide`);
            let emo = client.emojis.cache.find(emoji => emoji.name === args[1]);
            if(emo){
               let emoticon = client.emojis.cache.find(emoji => emoji.name === args[1]);
               let nom_emoji_nouveau = args[2];
               if(nom_emoji_nouveau.length < 2) return message.channel.send(`${FALSE}Le nom de l'emoji doit contenir au moins 2 caractères`);
               const embed = new MessageEmbed()
               .setTitle('Emoji update')
               .setThumbnail(emo.url)
               .setColor(0x00FF00)
               .addFields({ name: 'Ancien nom :', value: `${args[1]}`, inline: true },
               { name: 'Nouveau nom', value: `${nom_emoji_nouveau}`, inline: true },
               { name: 'Emoji', value: `${emo.url}`, inline: true })
               .setTimestamp()
               .setFooter('BOT ID : 689210215488684044', `${message.guild.iconURL()}`);
               try{
                   await emoticon.edit({ name: nom_emoji_nouveau})
                   await message.channel.send(embed)
               }catch(err){
                   message.channel.send(`${FALSE}Une erreur s'est produite merci de ressayer`)
                   client.channels.cache.get('725251200660013136').send(`Une erreur sur la commande \`emoji-update\` s'est produite sur le serveur : ${message.guild.name}.\n\`ERREUR :\`\n\`\`\`xl\n${err}\`\`\``)
               }
       
             }else if(args[1].includes('>','<')){
               let nom_emoji_nouveau = args[2]
               if(nom_emoji_nouveau.length < 2) return message.channel.send(`${FALSE}Le nom de l'emoji doit contenir au moins 2 caractères`);
               let emoo = args[1]
               let emoji_string = emoo.replace(/<.*:/, '').slice(0, -1);
               
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
                   client.channels.cache.get('725251200660013136').send(`Une erreur sur la commande \`emoji-update\` s'est produite sur le serveur : ${message.guild.name}.\n\`ERREUR :\`\n\`\`\`xl\n${err}\`\`\``);
                   return;
               }
               
             }else{
               return message.channel.send(`${FALSE}Une erreur s\'est produite... Verifiez que l\'emoji est correctement orthographier.`);
             }

    //-------------------------------------------EMOJIS-DELETE----------------------------------------------------
    }else if(args[0].toLowerCase() === 'delete'){
      if(!args[1]) return message.channel.send(`${FALSE}Merci d'inclure l'emoji a supprimer.`)
        let emo = client.emojis.cache.find(emoji => emoji.name === args[1])
        if(emo){
            //emoji-nom
            const embed = new MessageEmbed()
            .setTitle('Emoji delete')
            .setThumbnail(emo.url)
            .setColor(0x00FF00)
            .addFields(
            { name: 'Nom :', value: `${args[1]}`, inline: true },
            )
            .setTimestamp()
            .setFooter('BOT ID : 689210215488684044', `${message.guild.iconURL()}`);
            try{
                message.channel.send(embed)
                emo.delete()

            }catch(err){
                //message.channel.send(`${FALSE}Une erreur s'est produite merci de réessayer`);
                client.channels.cache.get('725251200660013136').send(`Une erreur sur la commande \`emoji-delete\` s'est produite sur le serveur : ${message.guild.name}.\n\`ERREUR :\`\n\`\`\`xl\n${err}\`\`\``);
                return;
            };
            
            }else if(args[1].includes('>','<')){
                //emoji-taper
                let emoo = args[1]
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
                    client.channels.cache.get('725251200660013136').send(`Une erreur sur la commande \`emoji-delete\` s'est produite sur le serveur : ${message.guild.name}.\n\`ERREUR :\`\n\`\`\`xl\n${err}\`\`\``);
                    return;
                };
            
        }else{
            message.channel.send(`${FALSE}Je n\'ai pas trouver cet emoji... Essayez vérifiez son orthographe et qu'il est bien sur le serveur`)
        }
    }//Commande 1 (delete)
}
module.exports.help = {
    
    name : 'emojis',
    aliases : ['emojis','emoji','emots'],
    category : 'manangement',
    description : 'Permet de gérer les emojis du serveur.',
    cooldown : 5,
    usage : '<action> <args>',
    exemple :["emoji create lien Spiritus "],
    permissions : false,
    isUserAdmin: false,
    args : false,
    sousCommdandes : ["emojis liste","emojis create","emojis update","emoji delete"]

}
