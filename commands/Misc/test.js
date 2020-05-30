const color = require('../../util/constants')
module.exports.run =(client, message, args) => {
    const emojiList = message.guild.emojis.map((e, x) => (x + ' = ' + e) + ' | ' +e.name).join('\n');
   message.channel.send(emojiList);
   
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
