const color = require('../../util/constants')
const fs = require('fs')
module.exports.run =async(client, message, args) => {
    const {FALSE} = require('../../configstyle')
    let debut = Date.now();
    message.channel.send('Pong !').then(async(m) => await m.edit(`Pong  BOT : \`${Date.now()-debut}ms\` API : \`${client.ws.ping}ms\``));

    /*
    var logger = fs.createWriteStream('./commands/Misc/log.txt', {
        flags: 'a' //'a' means appending (old data will be preserved)
      })
      
      logger.write('some data')
     */ 
}
module.exports.help = {
    
    name : 'ping',
    aliases : ['ping'],
    category : 'misc',
    description : 'Ping le bot et donne son temps de réaction',
    cooldown : 3,
    usage : '',
    exemple :['ping'],
    permissions : false,
    isUserAdmin: false,
    args : false,
    sousCommdandes : []
}

