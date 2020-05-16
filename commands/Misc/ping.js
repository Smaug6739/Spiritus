const color = require('../../util/constants')
module.exports.run =(client, message, args) => {
    let debut = Date.now();
    message.channel.send('Pong !').then(async(m) => await m.edit(`Pong ! \`${Date.now()-debut}ms\``));
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
