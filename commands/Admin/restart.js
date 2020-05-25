module.exports.run = async (client, message, args) =>{
if (message.author.id !== '611468402263064577') return message.channel.send('Vous n\'avez pas la permission d\'utiliser cette commande');
console.log("Redemarage")
let { TRUE } = require('../../configstyle');

await message.channel.send(`${TRUE}OK .`)
process.exit()

}

module.exports.help = {
    
    name : 'restart',
    aliases : ['restart'],
    category : 'admin',
    description : 'Redemarage',
    cooldown : 5,
    usage : '',
   // exemple :["ping"],
    permissions : true,
    isUserAdmin: false,
    args : false
}
