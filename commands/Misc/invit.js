const color = require('../../util/constants')
module.exports.run =(client, message, args) => {
    
    console.log(message.member.invite)
   
}
module.exports.help = {
    
    name : 'invit',
    aliases : ['invit'],
    category : 'misc',
    description : '-',
    cooldown : 3,
    usage : '',
   // exemple :["ping"],
    permissions : false,
    isUserAdmin: false,
    args : false
}

