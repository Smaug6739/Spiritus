const color = require('../../util/constants')
module.exports.run =(client, message, args) => {
    
    let debut = Date.now();
    message.channel.send('Pong !').then(async(m) => await m.edit(`Pong ! \`${Date.now()-debut}ms\``));
    //console.log(color)
   
   //message.channel.send(`Pong ! ${client.ping}`)
}
module.exports.help = {
    
    name : 'ping',
    aliases : ['ping'],
    category : 'misc',
    description : 'Ping le bot et donne son temps de réaction',
    cooldown : 5,
    usage : '',
   // exemple :["ping"],
    permissions : false,
    isUserAdmin: false,
    args : false
}
