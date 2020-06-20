module.exports.run =(client, message, args) => {
    let use = message.mentions.members.first() || message.member
   
    message.guild.setIcon(args[0])

   
}
module.exports.help = {
    
    name : 'test',
    aliases : ['test'],
    category : 'misc',
    description : 'Ping le bot et donne son temps de réaction',
    cooldown : 3,
    usage : '',
    exemple :[],
    permissions : false,
    isUserAdmin: false,
    args : false,
    sousCommdandes : []
}

