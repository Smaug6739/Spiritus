module.exports.run = async (client, message, args) => {
  const {TRUE} = require('./../../configstyle')
  message.channell.send(`${TRUE}OK.`)
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
