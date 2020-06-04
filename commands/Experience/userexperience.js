module.exports.run = async(client, message, args, settings, dbUser) => {
    if(settings.expsysteme){

        if(!dbUser){
            setTimeout(async function () {
                const use = await client.getUser(message.member, message.member.guild.id);
                message.reply(`tu possède ${use.experience} points d'experience !`);
              },2000)
        }else{
            message.reply(`tu possède  ${dbUser.experience} points d'experience !`);
        }
    }else{
       return message.channel.send('Le système d\'exp n\'est pas activé sur ce serveur.');
    }
}
module.exports.help = {
    
    name : 'userexperience',
    aliases : ['userexperience','uexp','rank'],
    category : 'experience',
    description : 'Donne l\'exp d\'une personne.',
    cooldown : 10,
    usage : '',
    //exemple :["channel-create text nom"],
    permissions : false,
    isUserAdmin: false,
    args : false
}