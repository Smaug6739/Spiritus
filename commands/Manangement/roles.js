module.exports.run = (client, message, args) => {
    let { TRUE,FALSE } = require('../../configstyle');
    if(!message.guild.me.hasPermission('MANAGE_ROLES')) return message.channel.send(`${FALSE}Je n'ai pas la permission de modifier les roles.`);

        //---------------------------------------------ROLES-CREATE----------------------------------------------------------
        if(args[0] === 'create'){
            if(args[1].includes('BLUE')||args[1].includes('BLACK')||args[1].includes('GREEN')||args[1].includes('RED')||args[1].includes('YELLOW')){
            let role_name = (args.splice(2).join(' ') || 'new role');
            if(role_name.length > 99) return message.channel.send(`${FALSE}Le nom du role doit etre inferieur a 100 caractères.`);
            message.guild.roles.create({
              data: {
                name: role_name,
                color: args[1],
              },
            })
            .then(message.channel.send(`${TRUE}J'ai bien crée le role ${role_name}`))
            .catch(console.error);
            
            }else{
            let role_name = (args.splice(1).join(' ') || 'new role');
            if(role_name.length > 99) return message.channel.send(`${FALSE}Le nom du role doit etre inferieur a 100 caractères.`);
            message.guild.roles.create({
              data: {
                name: role_name,
              },
            })
            .then(message.channel.send(`${TRUE}J'ai bien crée le role ${role_name}`))
            .catch(console.error);
            
            }
        //---------------------------------------------ROLES-DELETE----------------------------------------------------------
        }else if(args[0] === 'delete'){
            let role = message.guild.roles.cache.find(r => r.name === args.slice(1).toString()) || message.mentions.roles.first()
            if(role){
                try{
                    message.channel.send(`J'ai bien supprimer le role ${role.name}`)
                    role.delete()

                }catch(err){
                    client.channels.cache.get('716570229802663997').send(`Une erreur sur la commande \`role-delete\` s'est produite sur le serveur : ${message.guild.name}.\n\`ERREUR :\`\n\`\`\`xl\n${err}\`\`\``);

                }
            }else{
                message.channel.send(`${FALSE}Je n\'ai pas trouver ce role... Essayez de le mentionner`)
            }
    

        }else if(args[0] === 'update'){
            console.log("Commande en dev")
        }else if(args[0] === 'add'){
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
        }else if(args[0] === 'rem'){
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
      exemple :["roles create BLUE Admin"],
      permissions : true,
      isUserAdmin: false,
      args : true,
      sousCommdandes : ["roles create","roles update","roles delete","roles add","roles rem"]
  }
  