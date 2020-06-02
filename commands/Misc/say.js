module.exports.run =async(client, message, args) => {
   message.channel.send(args.join(" "));
    
}
module.exports.help = {
    
    name : 'say',
    aliases : ['repeat', 'rep'],
    category : 'misc',
    description : 'Répète le message d\'un utilisateur',
    cooldown : 10,
    usage : '<votre_message>',
    exemple :["say hi"],
    isUserAdmin: false,
    permissions : false,
    args : true
}
