module.exports.run =(client, message, args) => {
    let { FALSE,TRUE } = require('../../configstyle');
    if(!message.guild.me.hasPermission('MANAGE_CHANNELS')) return message.channel.send(`${FALSE}Je n'ai pas la permission de supprimer ce channel.`);

    let channelname = message.guild.channels.cache.find(r => r.name === args.toString()) //|| args[0].replace(/<.*#/, '').slice(0, -1);
    let nom = message.guild.channels.cache.find(r => r.id === args[0].replace(/<.*#/, '').slice(0, -1));
    let id = args[0]
    if(nom){
        let nomname = nom.name
        //console.log(nom)
        try{
        message.guild.channels.cache.get(nom.id).delete()
        .then(message.channel.send(`${TRUE}J'ai bien supprimer le channel ${nomname}`))
        .catch(`${FALSE} Une erreur s'est produite. Merci de réessayer.`)
        }catch(err){
            message.channel.send(`${FALSE}Une erreur s'est produite merci de réessayer`);
            client.channels.cache.get('716371683526836312').send(`Une erreur sur la commande \`channel-delete\` s'est produite sur le serveur : ${message.guild.name}.\n\`ERREUR :\`\n\`\`\`xl\n${err}\`\`\``);
            return;
        }

    }else if(channelname){
        try{
        channelname.delete()
        .then(message.channel.send(`${TRUE}J'ai bien supprimer le channel ${args[0]}`))
        //.catch(message.channel.send`${FALSE} Une erreur s'est produite. Merci de réessayer.`)
        }catch(err){
            message.channel.send(`${FALSE}Une erreur s'est produite merci de réessayer`);
            client.channels.cache.get('716371683526836312').send(`Une erreur sur la commande \`channel-delete\` s'est produite sur le serveur : ${message.guild.name}.\n\`ERREUR :\`\n\`\`\`xl\n${err}\`\`\``);
            return;
        };
        
    }else{
        try {
         message.guild.channels.cache.get(id).delete()
          .then(message.channel.send(`${TRUE}J'ai bien supprimer le channel ${message.guild.channels.cache.get(id).name}`))

          } catch (err) {
            message.channel.send(`${FALSE}Je n'ai pas trouver ce channel...`)
            //message.channel.send(`${FALSE}\`ERREUR :\`${err} `)

          };
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
