module.exports.run =(client, message) => {

    let debut = Date.now();
    message.channel.send('Pong !').then(async(m) => await m.edit(`Pong  BOT : \`${Date.now()-debut}ms\` API : \`${client.ws.ping}ms\``));
    
}
module.exports.help = {
    
    name : 'ping',
    aliases : ['ping'],
    category : 'misc',
    description : 'Ping le bot.',
    cooldown : 3,
    usage : '',
    exemple :['ping'],
    permissions : false,
    isUserAdmin: false,
    args : false,
    sousCommdandes : []
}