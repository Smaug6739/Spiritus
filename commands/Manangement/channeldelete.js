module.exports.run =(client, message, args) => {
    let { FALSE,TRUE } = require('../../configstyle');
    if(!message.guild.me.hasPermission('MANAGE_CHANNELS')) return message.channel.send(`${FALSE}Je n'ai pas la permission de supprimer ce channel.`);

    let channelname = message.guild.channels.cache.find(r => r.name === args.toString()) //|| args[0].replace(/<.*#/, '').slice(0, -1);
    let nom = message.guild.channels.cache.find(r => r.id === args[0].replace(/<.*#/, '').slice(0, -1));
    
    if(nom){
        let nomname = nom.name
        //console.log(nom)
        message.guild.channels.cache.get(nom.id).delete()
        .then(message.channel.send(`${TRUE}J'ai bien supprimer le channel ${nomname}`))
        .catch(`${FALSE} Une erreur s'est produite. Merci de réessayer.`)

    }else if(channelname){
        channelname.delete()
        .then(message.channel.send(`${TRUE}J'ai bien supprimer le channel ${args[0]}`))
        .catch(`${FALSE} Une erreur s'est produite. Merci de réessayer.`)
    }else{
        message.channel.send(`${FALSE}Je n'ai pas trouver ce channel...`)
    }
    
    //channelname.delete()

}
module.exports.help = {
    
    name : 'channel-delete',
    aliases : ['channel-delete'],
    category : 'manangement',
    description : 'supprimer un channel',
    cooldown : 5,
    usage : '<name_channel>',
    exemple :["channel-del nom_channel"],
    permissions : true,
    isUserAdmin: false,
    args : true
}
