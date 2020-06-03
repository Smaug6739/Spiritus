module.exports.run = async(client, message, args, settings, dbUser) => {
    
        if(!dbUser){
            setTimeout(async function () {
                const use = await client.getUser(message.member);
                message.reply(`tu possède ${use.experience} points d'experience !`);
              },2000)
        }else{
            message.reply(`tu possède  ${dbUser.experience} points d'experience !`);
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