const color = require('../../util/constants')
module.exports.run =(client, message, args) => {
    
    let attachments = message.attachments.first()
    if(message.attachments.first()){
    }else{
    }
    //console.log(attachments)
    //message.reply(attachments)
}
module.exports.help = {
    
    name : 'test',
    aliases : ['test'],
    category : 'misc',
    description : 'Commande de test',
    cooldown : 5,
    usage : '',
   // exemple :["ping"],
    permissions : false,
    isUserAdmin: false,
    args : false
}
