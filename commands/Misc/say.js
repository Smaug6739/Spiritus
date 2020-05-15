module.exports.run =(client, message, args) => {
    
    message.channel.send(args.join(" "));
    
}
module.exports.help = {
    
    name : 'say',
    aliases : ['repeat', 'rep'],
    description : 'Répète le message d\'un utilisateur',
    cooldown : 10,
    usage : '<votre_message>',
    isUserAdmin: false,
    permissions : false,
    args : true
}
