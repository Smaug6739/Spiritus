module.exports.run = async (client, message) => {

    let debut = Date.now();
    message.channel.send('Pong !').then(async(m) => await m.edit(`Pong  BOT : \`${Date.now()-debut}ms\` API : \`${client.ws.ping}ms\``));
    //const msg = await message.channel.send('Pong !')
    ///msg.edit(`Pong ! BOT : \`${msg.createdTimestamp - message.createdTimestamp}ms\``)
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