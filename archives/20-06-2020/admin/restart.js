module.exports.run = async (client, message, args) =>{
    let {ADMIN,TRUE,FALSE} = require('../../configstyle')

    if(!ADMIN.includes(message.author.id)) return message.channel.send(`${FALSE}Tu n'est pas admin du BOT `)
    console.log("Redemarage")

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
