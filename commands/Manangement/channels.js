const {MessageEmbed} = require('discord.js')
module.exports.run = async(client, message, args) => {
    let { TRUE,FALSE,FLECHE } = require('../../configstyle');
    if(!message.guild.me.hasPermission('MANAGE_CHANNELS')) return message.channel.send(`${FALSE}Je n'ai pas la permission de modifier ce channel.`);
    
    if(!args[0]){
        const embed = new MessageEmbed()
        .setTitle('Commande channel')
        .setDescription('La commande `channel` permet de gérer les channels du serveur graces aux sous commandes suivantes :')
        .addFields(
            { name: '\u200b', value: `${FLECHE}\`channel clone\` permet de cloner facilement n\`importe quel channel.`, inline: false },
            { name: '\u200b', value: `${FLECHE}\`channel position\` change la position de n'importe quel channel.`, inline: false },
            { name: '\u200b', value: `${FLECHE}\`channel parent\` change la categorie de n'importe quel channel.`, inline: false },
            { name: '\u200b', value: `${FLECHE}\`channel synchro\` permet de synchroniser les permission d\`un channel.`, inline: false },
            { name: '\u200b', value: `${FLECHE}\`channel topic\` permet de choisir le channel d\`un channel.`, inline: false },
            { name: '\u200b', value: `${FLECHE}\`channel create\` permet de crée un channel.`, inline: false },
            { name: '\u200b', value: `${FLECHE}\`channel update\` permet de mettre a jour le nom d\`un channel.`, inline: false },
            { name: '\u200b', value: `${FLECHE}\`channel delete\` permet de supprimer un channel.`, inline: false },
            { name: '\u200b', value: `${FLECHE}\`channel pin\` permet de pin un message avec son id.`, inline: false },
            { name: '\u200b', value: `${FLECHE}\`channel unpin\` permet de unpin un message avec son id.`, inline: false },
        )
        .setTimestamp()
        .setFooter('BOT ID : 689210215488684044')
        message.channel.send(embed)
    }
    if(args[0] === 'clone'){
        if(!args[1]){
            try{
                message.channel.clone()
                .then(message.channel.send(`${TRUE}J'ai bien cloner le channel ${message.channel.name}`))
                .catch(`${FALSE}Une erreur s'est produite merci de ressayer`)
        
            }catch(err){
                message.channel.send(`${FALSE}Une erreur s'est produite merci de ressayer`)
                client.channels.cache.get('716325736675410000').send(`Une erreur sur la commande \`channel-clone\` s'est produite sur le serveur : ${message.guild.name}.\n\`ERREUR :\`\n\`\`\`xl\n${err}\`\`\``)
            }
        }else{
            let channelname = message.guild.channels.cache.find(r => r.name === args.toString())
            let liensalon = message.guild.channels.cache.find(r => r.id === args[1].replace(/<.*#/, '').slice(0, -1));
            if(liensalon){
                let nomname = liensalon.name
                try{
                message.guild.channels.cache.get(liensalon.id).clone()
                .then(message.channel.send(`${TRUE}J'ai bien cloner le channel ${nomname}`))
                .catch(`${FALSE}Une erreur s'est produite. Merci de réessayer.`)
                }catch(err){
                    message.channel.send(`${FALSE}Une erreur s'est produite merci de ressayer`)
                    client.channels.cache.get('716325736675410000').send(`Une erreur sur la commande \`channel-clone\` s'est produite sur le serveur : ${message.guild.name}.\n\`ERREUR :\`\n\`\`\`xl\n${err}\`\`\``)
                }
        
            }else if(channelname){
                try{
                channelname.clone()
                .then(message.channel.send(`${TRUE}J'ai bien cloner le channel ${args[1]}`))
                //.catch(message.channel.send`${FALSE} Une erreur s'est produite. Merci de réessayer.`)
                }catch(err){
                    message.channel.send(`${FALSE}Une erreur s'est produite merci de réessayer`);
                    client.channels.cache.get('716371683526836312').send(`Une erreur sur la commande \`channel-delete\` s'est produite sur le serveur : ${message.guild.name}.\n\`ERREUR :\`\n\`\`\`xl\n${err}\`\`\``);
                    return;
                };
            
            }else{
                return message.channel.send(`${FALSE}Le channel a cloner est introuvable...`)
            }
        }

    }else if(args[0] === 'synchro'){
        if(!message.channel.parent) return message.channel.send(`${FALSE}Le salon n'est dans aucune catégorie`)

        try{
          message.channel.lockPermissions()
          .then(message.channel.send(`${TRUE}J'ai bien synchroniser les permissions du channel ${message.channel.name} avec les permissions de la catégorie ${message.channel.parent.name}`))
        }catch(err){
          message.channel.send(`${FALSE}Une erreur s'est produite merci de ressayer`)
          client.channels.cache.get('716571613348495420').send(`Une erreur sur la commande \`channel-synchro\` s'est produite sur le serveur : ${message.guild.name}.\n\`ERREUR :\`\n\`\`\`xl\n${err}\`\`\``);
        }

    }else if(args[0] === 'create'){
        var category = message.channel.parentID
        if(!args[1]) return message.channel.send(`${FALSE}Veuillez donner en premier argument une valeur valide (\`text\` ou \`voice\` ou \`category\`)`)
        if(args[1] == 'text' || args[1] == 'voice') {
            try{
                let name_salon = args.splice(2).join('-')
                if(!name_salon)return message.channel.send(`${FALSE}Merci de préciser un nom au channel.`);
                if(name_salon.length > 99) return message.channel.send(`${FALSE}Le nom de la categorie doit etre inferieur a 100 caractères.`);

                message.guild.channels.create(`${name_salon}`, {
                    type: `${args[1]}`,
                        
                    }).then(chan => {
                    chan.setParent(category).then(e => { // On met le nouveau channel dans la bonne catégorie
                
                  }).then(message.channel.send(`${TRUE}J'ai bien crée le salon ${name_salon}`))
                  .catch(console.error);
                })
                .catch(console.error);

            }catch(err){
                message.channel.send(`${FALSE}Une erreur s'est produite merci de réessayer`);
                client.channels.cache.get('716376021292679320').send(`Une erreur sur la commande \`channel-create\` s'est produite sur le serveur : ${message.guild.name}.\n\`ERREUR :\`\n\`\`\`xl\n${err}\`\`\``);
                return;
            };

        }else if(args[1] == 'category'){
            let nom_category = args.splice(2).join(' ')
            if(nom_category.length > 99) return message.channel.send(`${FALSE}Le nom de la categorie doit etre inferieur a 100 caractères.`);
            message.guild.channels.create(`${nom_category}`, {
                type: `${'category'}`,
                
                }).then(message.channel.send(`${TRUE}J'ai bien crée la catégorie ${nom_category}`))
                .catch(console.error)

        }else{
            return message.channel.send(`${FALSE}Veuillez donner en premier argument une valeur valide (\`text\` ou \`voice\` ou \`category\`)`)
        }

    }else if(args[0] === 'update'){
        if(!args[1]) return message.channel.send(`${FALSE} de spécifier le nom du channel a modifier`)
        if(!args[2]) return message.channel.send(`${FALSE}Merci de spécifier le nouveau nom du channel a modifier`)
        let channel = message.guild.channels.cache.find(r => r.name === args[1].toString()) //|| message.mentions.roles.first()
        if(channel){
            try{
                
               await channel.edit({ name: args[2] }).then(
                    message.channel.send(`${TRUE}J'ai bien mis a jour le channel ${channel.name}`)
                )//.catch(message.channel.send(`Une erreur s'est produite. Merci de réessayer`))

            }catch(err){
                client.channels.cache.get('721041152635175073').send(`Une erreur sur la commande \`channel-update\` s'est produite sur le serveur : ${message.guild.name}.\n\`ERREUR :\`\n\`\`\`xl\n${err}\`\`\``);
            }
        }else{
            message.channel.send(`Je n\'ai pas trouver ce channel...`)
        }
    }else if(args[0] === 'delete'){
        if(!args[1]) return message.channel.send(`${FALSE}Merci d'indiquer le channel à supprimer`)
        let channelname = message.guild.channels.cache.find(r => r.name === args.slice(1).toString()) //|| args[0].replace(/<.*#/, '').slice(0, -1);
        let nom = message.guild.channels.cache.find(r => r.id === args[1].replace(/<.*#/, '').slice(0, -1));
        let id = args[1]
        if(nom){
            let nomname = nom.name
            //console.log(nom)
            try{
            message.guild.channels.cache.get(nom.id).delete()
            .then(message.channel.send(`${TRUE}J'ai bien supprimer le channel ${nomname}`))
            .catch(`${FALSE} Une erreur s'est produite. Merci de réessayer.`)
            }catch(err){
                message.channel.send(`${FALSE}Une erreur s'est produite merci de réessayer`);
                client.channels.cache.get('716371683526836312').send(`Une erreur sur la commande \`channel-delete\` s'est produite sur le serveur : ${message.guild.name}.\n\`ERREUR :\`\n\`\`\`xl\n${err}\`\`\``);
                return;
            }
    
        }else if(channelname){
            try{
            channelname.delete()
            .then(message.channel.send(`${TRUE}J'ai bien supprimer le channel ${args[1]}`))
            //.catch(message.channel.send`${FALSE} Une erreur s'est produite. Merci de réessayer.`)
            }catch(err){
                message.channel.send(`${FALSE}Une erreur s'est produite merci de réessayer`);
                client.channels.cache.get('716371683526836312').send(`Une erreur sur la commande \`channel-delete\` s'est produite sur le serveur : ${message.guild.name}.\n\`ERREUR :\`\n\`\`\`xl\n${err}\`\`\``);
                return;
            };
            
        }else{
            try {
             message.guild.channels.cache.get(id).delete()
              .then(message.channel.send(`${TRUE}J'ai bien supprimer le channel ${message.guild.channels.cache.get(id).name}`))
    
              } catch (err) {
                message.channel.send(`${FALSE}Je n'ai pas trouver ce channel...`)
                //message.channel.send(`${FALSE}\`ERREUR :\`${err} `)
    
              };
        }


    }else if(args[0] === 'position'){
        if(!args[1]) return message.channel.send(`${FALSE}Merci de spécifier le nom du channel a modifier`)
        if(!args[2]) return message.channel.send(`${FALSE}Merci de spécifier la nouvelle position du channel`)
        let channel = message.guild.channels.cache.find(r => r.name === args[1].toString()) //|| message.mentions.roles.first()
        let nom = message.guild.channels.cache.find(r => r.id === args[1].replace(/<.*#/, '').slice(0, -1));
        let positionNew = args[2]
        if(isNaN(positionNew)) return message.channel.send(`${FALSE}Merci de rentrer un nombre valide pour la position du channel`)
        if(channel){
            try{
               await channel.setPosition(positionNew-1).then(message.channel.send(`${TRUE}J'ai bien mis a jour la position du channel \`${channel.name}\``))
            }catch(err){
                client.channels.cache.get('721041152635175073').send(`Une erreur sur la commande \`channel-update-position\` s'est produite sur le serveur : ${message.guild.name}.\n\`ERREUR :\`\n\`\`\`xl\n${err}\`\`\``);
            }
        }else if(nom){
            try{
                await nom.setPosition(positionNew -1).then(message.channel.send(`${TRUE}J'ai bien mis a jour la position du channel \`${nom}\``))
             }catch(err){
                 client.channels.cache.get('721041152635175073').send(`Une erreur sur la commande \`channel-update-position\` s'est produite sur le serveur : ${message.guild.name}.\n\`ERREUR :\`\n\`\`\`xl\n${err}\`\`\``);
             }
        }else{
            try{
                message.guild.channels.cache.get(args[1]).setPosition(args[2]-1).then(message.channel.send(`${TRUE}J'ai bien mis a jour la position du channel \`${message.guild.channels.cache.get(args[1]).name}\``))
            }catch{
                message.channel.send(`${FALSE}Je n\'ai pas trouver ce channel...`)

            }
        }
    
    }else if(args[0] === 'parent'){
        if(!args[1]) return message.channel.send(`${FALSE}Merci de spécifier le nom du channel a modifier`)
        if(!args[2]) return message.channel.send(`${FALSE}Merci de spécifier la nouvelle position du channel`)
        let channel = message.guild.channels.cache.find(r => r.name === args[1].toString()) //|| message.mentions.roles.first()
        let nom = message.guild.channels.cache.find(r => r.id === args[1].replace(/<.*#/, '').slice(0, -1));
        let positionNew = args[2]
        if(isNaN(positionNew)) return message.channel.send(`${FALSE}Merci de rentrer un ID valide pour la nouvelle categorie du salon`)
        if(channel){
            try{
               await channel.setParent(positionNew).then(message.channel.send(`${TRUE}J'ai bien mis a jour la position du channel \`${channel.name}\``))
            }catch(err){
                client.channels.cache.get('721041152635175073').send(`Une erreur sur la commande \`channel-update-position\` s'est produite sur le serveur : ${message.guild.name}.\n\`ERREUR :\`\n\`\`\`xl\n${err}\`\`\``);
            }
        }else if(nom){
            try{
                await nom.setParent(positionNew).then(message.channel.send(`${TRUE}J'ai bien mis a jour la position du channel \`${nom}\``))
             }catch(err){
                 client.channels.cache.get('721041152635175073').send(`Une erreur sur la commande \`channel-update-position-categorie\` s'est produite sur le serveur : ${message.guild.name}.\n\`ERREUR :\`\n\`\`\`xl\n${err}\`\`\``);
             }
        }else{
            try{
                message.guild.channels.cache.get(args[1]).setParent(args[2]).then(message.channel.send(`${TRUE}J'ai bien mis a jour la position du channel \`${message.guild.channels.cache.get(args[1]).name}\``))
            }catch{
                message.channel.send(`${FALSE}Je n\'ai pas trouver ce channel...`)

            }
        }
    
    }else if(args[0] === 'topic'){
        if(!args[1]) return message.channel.send(`${FALSE}Merci de spécifier le nom du channel a modifier`)
        if(!args[2]) return message.channel.send(`${FALSE}Merci de spécifier le nouveau topic`)
        let channel = message.guild.channels.cache.find(r => r.name === args[1].toString()) //|| message.mentions.roles.first()
        let nomMention = message.guild.channels.cache.find(r => r.id === args[1].replace(/<.*#/, '').slice(0, -1));
        let newTopic = args.slice(2).join(" ")
        //console.log(newTopic.length)
        if(newTopic.length > 1020)return message.channel.send(`${FALSE}Vous ne pouvez pas crée un topic de plus de 1024 caractères !`)
        if(channel){
            try{
               await channel.setTopic(newTopic).then(message.channel.send(`${TRUE}J'ai bien mis a jour le topic du channel \`${channel.name}\``))
            }catch(err){
                client.channels.cache.get('721041152635175073').send(`Une erreur sur la commande \`channel-update-position\` s'est produite sur le serveur : ${message.guild.name}.\n\`ERREUR :\`\n\`\`\`xl\n${err}\`\`\``);
            }
        }else if(nomMention){
            try{
                await nomMention.setTopic(newTopic).then(message.channel.send(`${TRUE}J'ai bien mis a jour le topic du channel \`${nomMention}\``))
             }catch(err){
                 client.channels.cache.get('721041152635175073').send(`Une erreur sur la commande \`channel-topic\` s'est produite sur le serveur : ${message.guild.name}.\n\`ERREUR :\`\n\`\`\`xl\n${err}\`\`\``);
             }
        }else{
            try{
                message.guild.channels.cache.get(args[1]).setTopic(newTopic).then(message.channel.send(`${TRUE}J'ai bien mis a jour le topic du channel \`${message.guild.channels.cache.get(args[1]).name}\``))
            }catch{
                message.channel.send(`Je n\'ai pas trouver ce channel...`)

            }
        }
    
    }else if(args[0] === 'pin'){
        try{
            if(isNaN(args[1])) return message.channel.send(`${FALSE}Merci de rentrer un id de message valide.`)
            message.channel.messages.cache.get(args[1]).pin().then(message.channel.send(`${TRUE}J'ai bien épingler le message \`${args[1]}\``))

        }catch{
            message.channel.send(`${FALSE}Une erreur s'est produite merci de réessayer avec un id de message valide ou vérifiez que le message n'est pas déja épingler`)
        }
    }else if(args[0] === 'unpin'){
        try{
            if(isNaN(args[1])) return message.channel.send(`${FALSE}Merci de rentrer un id de message valide.`)
            message.channel.messages.cache.get(args[1]).unpin().then(message.channel.send(`${TRUE}J'ai bien retirer le message \`${args[1]}\` des messages épinglés`))

        }catch{
            message.channel.send(`${FALSE}Je n'ai pas trouver ce message`)
        }
    }
    
    
}
module.exports.help = {
    name: "channel",
    aliases: ['channel','channels'],
    category : 'manangement',
    description: "Permet de gérer les channels du serveur",
    cooldown: 5,
    usage: '<action> <args>',
    exemple :[],
    isUserAdmin: false,
    permissions: true,
    args: false,
    sousCommdandes : ["channel clone","channel position","channel parent","channel synchro","channel topic","channel create","channel update","channel delete","channel pin","channel unpin"]
  };