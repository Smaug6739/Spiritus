const {MessageEmbed} = require('discord.js')
module.exports.run = async(client, message, args) => {
    let { TRUE,FALSE,FLECHE } = require('../../configstyle');
    if(!message.guild.me.hasPermission('MANAGE_CHANNELS')) return message.channel.send(`${FALSE}Je n'ai pas la permission de modifier ce channel.`);
    
    if(!args[0]){
        const embed = new MessageEmbed()
        .setTitle('Commande channel')
        .setDescription('La commande `channel` permet de gérer les channels du serveur graces aux sous commandes suivantes :')
        .addFields(
            { name: '\u200b', value: `${FLECHE}\`channel clone\` permet de cloner facilement n\`importe quel channel`, inline: false },
            { name: '\u200b', value: `${FLECHE}\`channel synchro\` permet de synchroniser les permission d\`un channel`, inline: false },
            { name: '\u200b', value: `${FLECHE}\`channel create\` permet de crée un channel`, inline: false },
            { name: '\u200b', value: `${FLECHE}\`channel update\` permet de mettre a jour le nom d\`un channel`, inline: false },
            { name: '\u200b', value: `${FLECHE}\`channel delete\` permet de supprimer un channel`, inline: false },
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
                .catch(`${FALSE} Une erreur s'est produite. Merci de réessayer.`)
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
        if(!args[1]) return message.channel.send('Merci de spécifier le nom du channel a modifier')
        if(!args[2]) return message.channel.send('Merci de spécifier le nouveau nom du channel a modifier')
        let channel = message.guild.channels.cache.find(r => r.name === args[1].toString()) //|| message.mentions.roles.first()
        if(channel){
            try{
                
               await channel.edit({ name: args[2] }).then(
                    message.channel.send(`J'ai bien mis a jour le channel ${channel.name}`)
                )//.catch(message.channel.send(`Une erreur s'est produite. Merci de réessayer`))

            }catch(err){
                client.channels.cache.get('721041152635175073').send(`Une erreur sur la commande \`channel-update\` s'est produite sur le serveur : ${message.guild.name}.\n\`ERREUR :\`\n\`\`\`xl\n${err}\`\`\``);
            }
        }else{
            message.channel.send(`Je n\'ai pas trouver ce channel...`)
        }
    }else if(args[0] === 'delete'){
        let channelname = message.guild.channels.cache.find(r => r.name === args.toString()) //|| args[0].replace(/<.*#/, '').slice(0, -1);
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
    sousCommdandes : ["channel clone","channel synchro","channel create","channel update","channel delete"]
  };