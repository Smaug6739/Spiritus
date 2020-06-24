const { MessageEmbed } = require("discord.js") 
module.exports.run = async(client, message, args) => {
    let { TRUE,FALSE,FLECHE } = require('../../configstyle');
    if(!message.guild.me.hasPermission('MANAGE_ROLES')) return message.channel.send(`${FALSE}Je n'ai pas la permission de modifier les roles.`);
    if(!args[0]){
        const embed = new MessageEmbed()
        .setTitle('Commande role')
        .setDescription('La commande `roles` permet de gérer les roles du serveur graces aux sous commandes suivantes :')
        .addFields(
            { name: '\u200b', value: `${FLECHE}\`role liste\` donne la liste des roles du serveur.`, inline: false },
            { name: '\u200b', value: `${FLECHE}\`role create\` permet de crée un role.`, inline: false },
            { name: '\u200b', value: `${FLECHE}\`role update\` permet de mettre a jour le nom d\`un role.`, inline: false },
            { name: '\u200b', value: `${FLECHE}\`role delete\` permet de supprimer un role.`, inline: false },
            { name: '\u200b', value: `${FLECHE}\`role add\` permet de donner un role a une personne.`, inline: false },
            { name: '\u200b', value: `${FLECHE}\`role rem\` permet de retirer le role d\`une personne.`, inline: false })
        .setTimestamp()
        .setFooter('BOT ID : 689210215488684044')
        message.channel.send(embed)
    }
    if(args[0].toLowerCase() === 'liste'){
        const embed = new MessageEmbed()
        .setTitle('Commande role liste')
        .setThumbnail(`${message.guild.iconURL()}`)
        .setDescription('Voici la liste de tous les roles du serveur :')
        .addFields({ name: '\u200b', value: `${message.guild.roles.cache.map(r => r.toString()).join('')}`, inline: false })
        .setTimestamp()
        .setFooter('BOT ID : 689210215488684044')
        message.channel.send(embed)
    //---------------------------------------------ROLES-CREATE----------------------------------------------------------
    }else if(args[0].toLowerCase() === 'create'){
        let role_name = (args.splice(1).join(' ') || 'new role');
        if(role_name.length > 99) return message.channel.send(`${FALSE}Le nom du role doit etre inferieur à 100 caractères.`);
        message.guild.roles.create({
            data: {
            name: role_name
            }
        })
        .then(role => message.channel.send(`${TRUE}J'ai bien crée le role ${role}`))
        .catch(console.error);
    //---------------------------------------------ROLES-DELETE----------------------------------------------------------
    }else if(args[0].toLowerCase() === 'delete'){
        let role = message.guild.roles.cache.find(r => r.name === args.slice(1).join(" ").toString()) || message.mentions.roles.first()
        if(role){    
                message.channel.send(`${TRUE}J'ai bien supprimer le role \`${role.name}\``).then(
                    role.delete())
        }else{
            message.channel.send(`${FALSE}Je n\'ai pas trouver ce role... Essayez de le mentionner`)
        }
    }else if(args[0].toLowerCase() === 'update'){
        if(!args[1]) return message.channel.send(`${FALSE}Merci d'indiquer en premier argument le nom ou la mention du role a changer`)
        let role = message.guild.roles.cache.find(r => r.name === args.slice(1).toString()) || message.mentions.roles.first()
        if(role){
                let roleName = args.slice(2).join(" ") || 'new role'
                if(roleName.length > 99) return message.channel.send(`${FALSE}Le nom du role doit etre inferieur a 100 caractères.`);
                await role.edit({ name: `${roleName}` }).then(
                    message.channel.send(`${TRUE}J'ai bien mis a jour le role \`${role.name}\` par \`${roleName}\``))
        }else{
            message.channel.send(`${FALSE}Je n\'ai pas trouver ce role... Essayez de le mentionner`)
        }
    }else if(args[0].toLowerCase() === 'add'){
        let  role = message.mentions.roles.first()
        let utilisateur = message.mentions.members.first() || message.member
        if (role) {
            if(message.guild.me.roles.highest.comparePositionTo(role) <= 0) return message.channel.send(`${FALSE}Je n'ai pas un role sufisant pour vous attribuer ce role`)
            if(message.member.roles.highest.comparePositionTo(role) <= 0){
            return message.channel.send(`${FALSE}Vous ne pouvez pas ajouter un role superieur a votre role le plus haut.`);
            }else{
                if (utilisateur.roles.cache.has(role.id)) return message.channel.send(`${FALSE}L'utilisateur pocède déja ce role.`);
                //if (role.permissions.has('KICK_MEMBERS')) return message.channel.send("Vous ne pouvez pas avoir ce rôle!");
                utilisateur.roles.add(role)
                .then(m => message.channel.send(`${TRUE}J'ai bien ajouter le role ${role} a ${utilisateur}.`))
                .catch(e => console.log(e));
                //console.log('Le role est ajoutable')
            }
        }else{
            message.channel.send(`${FALSE}Le rôle n'existe pas...`);
        }
    }else if(args[0].toLowerCase() === 'rem'){
            let  role = message.mentions.roles.first()
            let utilisateur = message.mentions.members.first() || message.member
        if (role){
            if(message.guild.me.roles.highest.comparePositionTo(role) <= 0) return message.channel.send(`${FALSE}Je n'ai pas un role sufisant pour vous supprimer ce role`)
            if(message.member.roles.highest.comparePositionTo(role) <= 0){
                return message.channel.send(`${FALSE}Vous ne pouvez pas supprimer un role au superieur ou égale a votre plus haut role.`);
            }else{
                if (!utilisateur.roles.cache.has(role.id)) return message.channel.send(`${FALSE}L'utilisateur ne possède pas ce role.`);
                //if (role.permissions.has('KICK_MEMBERS')) return message.channel.send("Vous ne pouvez pas avoir ce rôle!");
                utilisateur.roles.remove(role)
                .then(m => message.channel.send(`${TRUE}J'ai bien supprimer le role ${role} de ${utilisateur}.`))
                .catch(e => console.log(e));
                //console.log('Le role est ajoutable')
            }
        }else{
            message.channel.send(`${FALSE}Le rôle n'existe pas...`);
        }
    }
  
  }
  module.exports.help = { 
      name : 'roles',
      aliases : ['roles','role'],
      category : 'manangement',
      description : 'Permet de gérer et add/rem les roles du serveur.',
      cooldown : 5,
      usage : '<action> <args>',
      exemple :["roles create Admin"],
      permissions : true,
      isUserAdmin: false,
      args : false,
      sousCommdandes : ["roles create","roles update","roles delete","roles add","roles rem"]
  }
  