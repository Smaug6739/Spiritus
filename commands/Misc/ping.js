const color = require('../../util/constants')
module.exports.run =(client, message, args) => {
    
    message.channel.send('Pong !');
    //console.log(color)
}
module.exports.help = {
    
    name : 'ping',
    aliases : ['ping'],
    category : 'misc',
    description : 'Renvoie un message avec des reactions !',
    cooldown : 10,
    usage : '',
    permissions : false,
    isUserAdmin: false,
    args : false
}
