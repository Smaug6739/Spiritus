const color = require('../../util/constants')
module.exports.run =(client, message, args) => {
    
   console.log(args[0].length)
   
}
module.exports.help = {
    
    name : 'test',
    aliases : ['test'],
    category : 'misc',
    description : 'commande de test',
    cooldown : 0.1,
    usage : '',
   // exemple :["ping"],
    permissions : false,
    isUserAdmin: false,
    args : false
}
