module.exports.run =(client, message, args) => {
    
    message.channel.send('Pong !');
    
}
module.exports.help = {
    
    name : 'ping',
    aliases : ['pingou'],
    category : 'misc',
    description : 'Ping le BOT',
    cooldown : 10,
    usage : '',
    isUserAdmin: false,
    permissions : false,
    args : false
}
