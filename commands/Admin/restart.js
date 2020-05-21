module.exports.run = async (client, message, args) =>{
if (message.author.id !== '611468402263064577') return message.channel.send('Vous n\'avez pas la permission d\'utiliser cette commande');
console.log("Redemarage")
let OK = client.emojis.cache.find(emoji => emoji.name === "61100464854223562974");

await message.channel.send(`${OK}OK .`)
process.exit()
    
}

module.exports.help = {
    
    name : 'restart',
    aliases : ['restart'],
    category : 'admin',
    description : 'Commandes pour le redemarage (avec pm2)',
    cooldown : 5,
    usage : '',
   // exemple :["ping"],
    permissions : true,
    isUserAdmin: false,
    args : false
}
