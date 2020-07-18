const { MessageEmbed } = require("discord.js") 
module.exports.run = async(client, message, args,settings) => {
    if(!args[0]){
        const embed = new MessageEmbed()
        .setTitle('Commande role')
        .setColor(client.config.color.EMBEDCOLOR)
        .setDescription(`La commande __roles__ permet de gérer les roles du serveur graces aux sous commandes suivantes :\n\n${client.config.emojis.FLECHE}__role liste__ donne la liste des roles du serveur.\n${client.config.emojis.FLECHE}__role create__ permet de crée un role.\n${client.config.emojis.FLECHE}__role update__ permet de mettre a jour le nom d'un role.\n${client.config.emojis.FLECHE}__role delete__ permet de supprimer un role.\n${client.config.emojis.FLECHE}__role add__ permet de donner un role a une personne.\n${client.config.emojis.FLECHE}__role rem__ permet de retirer le role d'une personne.`)
        /*.addFields(
            { name: '\u200b', value: `${client.config.emojis.FLECHE}\`role liste\` donne la liste des roles du serveur.`, inline: false },
            { name: '\u200b', value: `${client.config.emojis.FLECHE}\`role create\` permet de crée un role.`, inline: false },
            { name: '\u200b', value: `${client.config.emojis.FLECHE}\`role update\` permet de mettre a jour le nom d\`un role.`, inline: false },
            { name: '\u200b', value: `${client.config.emojis.FLECHE}\`role delete\` permet de supprimer un role.`, inline: false },
            { name: '\u200b', value: `${client.config.emojis.FLECHE}\`role add\` permet de donner un role a une personne.`, inline: false },
            { name: '\u200b', value: `${client.config.emojis.FLECHE}\`role rem\` permet de retirer le role d\`une personne.`, inline: false })*/
        .setTimestamp()
        .setFooter('BOT ID : 689210215488684044')
        return message.channel.send(embed)
    }
    if(args[0].toLowerCase() === 'liste'){
       /* const embed = new MessageEmbed()
        .setTitle('Commande role liste')
        .setColor(client.config.color.EMBEDCOLOR)
        .setThumbnail(`${message.guild.iconURL()}`)
        .setDescription('Voici la liste de tous les roles du serveur :')
        .addFields({ name: '\u200b', value: `${message.guild.roles.cache.map(r => r.toString()).join('')}`, inline: false })
        .setTimestamp()
        .setFooter('BOT ID : 689210215488684044')
        message.channel.send(embed)*/
        const rolesListe = message.channel.guild.roles.cache.map(role => role.toString() );
        let embed = {
            title: `Liste des roles pour le serveur **${message.guild.name}** | ${rolesListe.length} au totale`,
            thumbnail: {
                url: `${message.guild.iconURL()}`,
            },
            color: `${client.config.color.EMBEDCOLOR}`,
            description: null,
            fields: []
            
        };
        if (rolesListe.join(' ').length > 2048) {
            let i = '';
            // eslint-disable-next-line guard-for-in
            rolesListe.forEach(role => {
                if (i.length <= 1024 && i.length + role.length > 1024) embed.fields.push({name: '\u200b', value: i, inline: true});
                i = i.concat(' ', role);
            });
        } else {
            embed.description = rolesListe.join(' ');
        }
        return message.channel.send({embed});
    }
    //---------------------------------------------ROLES-CREATE----------------------------------------------------------
    
    if(args[0].toLowerCase() === 'create'){
        if(!message.member.hasPermission('MANAGE_ROLES'))return message.channel.send(`${client.config.emojis.FALSE}Vous devez avoir la permission de gérer les roles pour utiliser cette commande.`)
        if(!message.guild.me.hasPermission('MANAGE_ROLES')) return message.channel.send(`${client.config.emojis.FALSE}Je n'ai pas la permission de modifier les roles.`);
        const roleCreateDescription = new MessageEmbed()
            .setTitle(`Sous commande : ${settings.prefix}role create`)
            .setColor(client.config.color.EMBEDCOLOR)
            .setDescription(`**Module :** Manangement\n**Description :** Permet de crée un role sur le serveur\n**Usage : **${settings.prefix}role create [nom]\n**Exemples :** \n ${settings.prefix}role create Spiritus`)
            .setFooter('BOT ID : 689210215488684044')
            .setTimestamp()
            if(!args[1])return message.channel.send(roleCreateDescription)
        let role_name = (args.splice(1).join(' ') || 'new role');
        if(role_name.length > 99) return message.channel.send(`${client.config.emojis.FALSE}Le nom du role doit etre inferieur à 100 caractères.`);
        message.guild.roles.create({
            data: {
            name: role_name
            }
        })
        .then(role => message.channel.send(`${client.config.emojis.TRUE}J'ai bien crée le role ${role}`))
        .catch(console.error);
    //---------------------------------------------ROLES-DELETE----------------------------------------------------------
    }
    if(args[0].toLowerCase() === 'delete'){
        if(!message.member.hasPermission('MANAGE_ROLES'))return message.channel.send(`${client.config.emojis.FALSE}Vous devez avoir la permission de gérer les roles pour utiliser cette commande.`)
        if(!message.guild.me.hasPermission('MANAGE_ROLES')) return message.channel.send(`${client.config.emojis.FALSE}Je n'ai pas la permission de modifier les roles.`);
        const roleDeleteDescription = new MessageEmbed()
        .setTitle(`Sous commande : ${settings.prefix}role delete`)
        .setColor(client.config.color.EMBEDCOLOR)
        .setDescription(`**Module :** Manangement\n**Description :** Permet de supprimer un role sur le serveur\n**Usage : ** ${settings.prefix}role delete [nom/id/mention]\n**Exemples :** \n ${settings.prefix}role delete Spiritus`)
        .setFooter('BOT ID : 689210215488684044')
        .setTimestamp()
        if(!args[1])return message.channel.send(roleDeleteDescription)
        let role = client.resolveRole(message.guild, args[1])
        if(role == undefined) return message.channel.send(`${client.config.emojis.FALSE}Je n'ai pas trouver ce role`)
         
            message.channel.send(`${client.config.emojis.TRUE}J'ai bien supprimer le role \`${role.name}\``).then(
                role.delete())
        
    }
    if(args[0].toLowerCase() === 'update'){
        if(!message.member.hasPermission('MANAGE_ROLES'))return message.channel.send(`${client.config.emojis.FALSE}Vous devez avoir la permission de gérer les roles pour utiliser cette commande.`)
        if(!message.guild.me.hasPermission('MANAGE_ROLES')) return message.channel.send(`${client.config.emojis.FALSE}Je n'ai pas la permission de modifier les roles.`);
        const roleUpdateDescription = new MessageEmbed()
        .setTitle(`Sous commande : ${settings.prefix}role update`)
        .setColor(client.config.color.EMBEDCOLOR)
        .setDescription(`**Module :** Manangement\n**Description :** Permet de modifier un role sur le serveur\n**Usage : ** ${settings.prefix}role update [nom/id/mention] (Nouveau nom)\n**Exemples :** \n ${settings.prefix}role update BOT Spiritus`)
        .setFooter('BOT ID : 689210215488684044')
        .setTimestamp()
        if(!args[1])return message.channel.send(roleUpdateDescription)
        if(!args[1]) return message.channel.send(`${client.config.emojis.FALSE}Merci d'indiquer en premier argument le nom ou la mention du role a changer`)
        let role = client.resolveRole(message.guild, args[1])
        if(role == undefined) return message.channel.send(`${client.config.emojis.FALSE}Je n'ai pas trouver ce role`)
        
            let roleName = args.slice(2).join(" ") || 'new role'
            if(roleName.length > 99) return message.channel.send(`${client.config.emojis.FALSE}Le nom du role doit etre inferieur a 100 caractères.`);
            await role.edit({ name: `${roleName}` }).then(
            message.channel.send(`${client.config.emojis.TRUE}J'ai bien mis a jour le role \`${role.name}\` par \`${roleName}\``))
    }
     if(args[0].toLowerCase() === 'position'){
        if(!message.member.hasPermission('MANAGE_ROLES'))return message.channel.send(`${client.config.emojis.FALSE}Vous devez avoir la permission de gérer les roles pour utiliser cette commande.`)
        if(!message.guild.me.hasPermission('MANAGE_ROLES')) return message.channel.send(`${client.config.emojis.FALSE}Je n'ai pas la permission de modifier les roles.`);
        const rolePositionDescription = new MessageEmbed()
        .setTitle(`Sous commande : ${settings.prefix}role position`)
        .setColor(client.config.color.EMBEDCOLOR)
        .setDescription(`**Module :** Manangement\n**Description :** Permet de modifier la position un role sur le serveur\n**Usage : ** ${settings.prefix}role position [nom/id/mention] (Position)\n**Exemples :** \n ${settings.prefix}role position Spiritus 5`)
        .setFooter('BOT ID : 689210215488684044')
        .setTimestamp()
        if(!args[1])return message.channel.send(rolePositionDescription)
        let role = client.resolveRole(message.guild, args[1])
        if(role == undefined) return message.channel.send(`${client.config.emojis.FALSE}Je n'ai pas trouver ce role`)
        let newPosition = args.slice(1).join('')
        newPosition = newPosition.split(role)
        newPosition = newPosition.join(' ')
        newPosition = Number(newPosition) 
        console.log(newPosition)
        if(message.guild.me.roles.highest.comparePositionTo(role) <= 0) return message.channel.send(`${client.config.emojis.FALSE}Je n'ai pas un role sufisant pour modifier ce role.`)
        if(message.guild.me.roles.highest.rawPosition <= newPosition) return message.channel.send(`${client.config.emojis.FALSE}Je n'ai pas un role sufisant pour mettre ce role si haut.`)
        if(message.member.roles.highest.comparePositionTo(role) <= 0) return message.channel.send(`${client.config.emojis.FALSE}Tu n'a pas un role sufisant pour modifier ce role.`)
        if(isNaN(newPosition))return message.channel.send(`${client.config.emojis.FALSE}Merci d'indiquer la nouvelle position du role sous forme d'un nombre.`)
        message.guild.setRolePositions([{ role: role, position: newPosition}]).then(message.channel.send(`${client.config.emojis.TRUE}J'ai bien mis à jour la position du role \`${role.name}\``))

    
    }
    if(args[0].toLowerCase() === 'add'){
        if(!message.member.hasPermission('MANAGE_ROLES'))return message.channel.send(`${client.config.emojis.FALSE}Vous devez avoir la permission de gérer les roles pour utiliser cette commande.`)
        if(!message.guild.me.hasPermission('MANAGE_ROLES')) return message.channel.send(`${client.config.emojis.FALSE}Je n'ai pas la permission de modifier les roles.`);
        const roleAddDescription = new MessageEmbed()
        .setTitle(`Sous commande : ${settings.prefix}role add`)
        .setColor(client.config.color.EMBEDCOLOR)
        .setDescription(`**Module :** Manangement\n**Description :** Permet d'ajouter un role a une personne du serveur\n**Usage : **${settings.prefix}role add [nom/id/mention] (@User)\n**Exemples :** \n ${settings.prefix}role add @Smaug @Spiritus`)
        .setFooter('BOT ID : 689210215488684044')
        .setTimestamp()
        if(!args[1])return message.channel.send(roleAddDescription)
        let role = client.resolveRole(message.guild, args[2])|| message.mentions.roles.first()
        if(role == undefined) return message.channel.send(`${client.config.emojis.FALSE}Je n'ai pas trouver ce role`)
        let utilisateur = message.mentions.members.first() || message.member
        if (role) {
            if(message.guild.me.roles.highest.comparePositionTo(role) <= 0) return message.channel.send(`${client.config.emojis.FALSE}Je n'ai pas un role sufisant pour vous attribuer ce role`)
            if(message.member.roles.highest.comparePositionTo(role) <= 0){
            return message.channel.send(`${client.config.emojis.FALSE}Vous ne pouvez pas ajouter un role superieur a votre role le plus haut.`);
            }else{
                if (utilisateur.roles.cache.has(role.id)) return message.channel.send(`${client.config.emojis.FALSE}L'utilisateur pocède déja ce role.`);
                utilisateur.roles.add(role)
                .then(m => message.channel.send(`${client.config.emojis.TRUE}J'ai bien ajouter le role ${role} a ${utilisateur}.`))
                .catch(e => console.log(e));
            }
        }else{
            message.channel.send(`${client.config.emojis.FALSE}Le rôle n'existe pas...`);
        }
    }
    if(args[0].toLowerCase() === 'rem'){
        if(!message.member.hasPermission('MANAGE_ROLES'))return message.channel.send(`${client.config.emojis.FALSE}Vous devez avoir la permission de gérer les roles pour utiliser cette commande.`)
        if(!message.guild.me.hasPermission('MANAGE_ROLES')) return message.channel.send(`${client.config.emojis.FALSE}Je n'ai pas la permission de modifier les roles.`);
        const roleRemDescription = new MessageEmbed()
        .setTitle(`Sous commande : ${settings.prefix}role rem`)
        .setColor(client.config.color.EMBEDCOLOR)
        .setDescription(`**Module :** Manangement\n**Description :** Permet d'enlever un role à une personne du serveur\n**Usage : **${settings.prefix}role rem [nom/id/mention] (@User)\n**Exemples :** \n ${settings.prefix}role rem @Smaug @Spiritus`)
        .setFooter('BOT ID : 689210215488684044')
        .setTimestamp()
        if(!args[1])return message.channel.send(roleRemDescription)
        let role = client.resolveRole(message.guild, args[2]) || message.mentions.roles.first()
        if(role == undefined) return message.channel.send(`${client.config.emojis.FALSE}Je n'ai pas trouver ce role`)
        let utilisateur = message.mentions.members.first() || message.member
        if (role){
            if(message.guild.me.roles.highest.comparePositionTo(role) <= 0) return message.channel.send(`${client.config.emojis.FALSE}Je n'ai pas un role sufisant pour vous supprimer ce role`)
            if(message.member.roles.highest.comparePositionTo(role) <= 0){
                return message.channel.send(`${client.config.emojis.FALSE}Vous ne pouvez pas supprimer un role au superieur ou égale à votre plus haut role.`);
            }else{
                if (!utilisateur.roles.cache.has(role.id)) return message.channel.send(`${client.config.emojis.FALSE}L'utilisateur ne possède pas ce role.`);
                //if (role.permissions.has('KICK_MEMBERS')) return message.channel.send("Vous ne pouvez pas avoir ce rôle!");
                utilisateur.roles.remove(role)
                .then(m => message.channel.send(`${client.config.emojis.TRUE}J'ai bien supprimer le role ${role} de ${utilisateur}.`))
                .catch(e => console.log(e));
                //console.log('Le role est ajoutable')
            }
        }else{
            message.channel.send(`${client.config.emojis.FALSE}Le rôle n'existe pas...`);
        }
    }
  
  }
  module.exports.help = { 
    name : 'roles',
    aliases : ['roles','role'],
    category : 'administration',
    description : 'Permet de gérer, add/rem les roles.',
    cooldown : 5,
    usage : '<action> <args>',
    exemple :["roles create Admin"],
    permissions : false,
    isUserAdmin: false,
    args : false,
    sousCommdandes : ["roles liste","roles create","roles update","roles delete","roles add","roles rem"]
  }
  