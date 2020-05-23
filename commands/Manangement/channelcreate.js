module.exports.run =(client, message, args) => {
    let { FALSE,TRUE } = require('../../configstyle');
    var category = message.channel.parentID
    //console.log(category)
    let name = args.slice(args[0]).join(' ')
    console.log(name)
    if(!args[0]) return message.channel.send(`${FALSE}Veuillez donner en premier argument une valeur valide (\`text\` ou \`voice\ ou \`category\`)`)
    if(args[0] == 'text' || args[0] == 'voice') {
      
            message.guild.channels.create(`${args[1]}`, {
            type: `${args[0]}`,
            
            }).then(chan => {
            chan.setParent(category).then(e => { // On met le nouveau channel dans la bonne catégorie
            
            }).then(message.channel.send(`${TRUE}J'ai bien crée le salon ${args[1]}`))
            .catch(console.error);
            })
            .catch(console.error);

    }else if(args[0] == 'category'){
        message.guild.channels.create(`${args[1]}`, {
            type: `${args[0]}`,
            
            }).then(message.channel.send(`${TRUE}J'ai bien crée la catégorie ${args[1]}`))
    }else{
        return message.channel.send(`${FALSE}Veuillez donner en premier argument une valeur valide (\`text\` ou \`voice\`)`)
    }



}
module.exports.help = {
    
    name : 'channel-create',
    aliases : ['channel-cre'],
    category : 'manangement',
    description : 'Supprimer un emoji',
    cooldown : 5,
    usage : '',
    exemple :["emojidel name_emot"],
    permissions : false,
    isUserAdmin: false,
    args : false
}
