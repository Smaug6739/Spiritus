module.exports.run =(client, message, args) => {
    let { FALSE,TRUE } = require('../../configstyle');
    if(!message.guild.me.hasPermission('MANAGE_CHANNELS')) return message.channel.send(`${FALSE}Je n'ai pas la permission de crée ce channel.`);

    var category = message.channel.parentID

    
    if(!args[0]) return message.channel.send(`${FALSE}Veuillez donner en premier argument une valeur valide (\`text\` ou \`voice\ ou \`category\`)`)
        if(args[0] == 'text' || args[0] == 'voice') {
            try{
                let name_salon = args.splice(1).join('-')
                if(!name_salon)return message.channel.send(`${FALSE}Merci de préciser un nom au channel.`);
                if(name_salon.length > 99) return message.channel.send(`${FALSE}Le nom de la categorie doit etre inferieur a 100 caractères.`);

                message.guild.channels.create(`${name_salon}`, {
                    type: `${args[0]}`,
                        
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
        

            

        }else if(args[0] == 'category'){
            let nom_category = args.splice(1).join(' ')
            if(nom_category.length > 99) return message.channel.send(`${FALSE}Le nom de la categorie doit etre inferieur a 100 caractères.`);
            message.guild.channels.create(`${nom_category}`, {
                type: `${args[0]}`,
                
                }).then(message.channel.send(`${TRUE}J'ai bien crée la catégorie ${nom_category}`))
                .catch(console.error)

        }else{
            return message.channel.send(`${FALSE}Veuillez donner en premier argument une valeur valide (\`text\` ou \`voice\` ou \`category\`)`)
        }

    
   



}
module.exports.help = {
    
    name : 'channel-create',
    aliases : ['channel-cre'],
    category : 'manangement',
    description : 'Permet de crée un channel ou une catégorie.',
    cooldown : 5,
    usage : '<type_channel> <name_channel>',
    exemple :["channel-create text nom"],
    permissions : true,
    isUserAdmin: false,
    args : true
}

