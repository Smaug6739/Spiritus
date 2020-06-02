module.exports.run = async(client, message, args, settings, dbUser) => {
  
    if(!dbUser){
    setTimeout(async function () {
        const use = await client.getUser(message.member);

     message.reply(`tu pocède  ${use.experience} points d'experience !`)


      }, 2000)
    }else{
        message.reply(`tu pocède  ${dbUser.experience} points d'experience !`)

    }

  
    
   
}
module.exports.help = {
    
    name : 'userexperience',
    aliases : ['userexperience','uexp','rank'],
    category : 'experience',
    description : 'Permet de crée un channel ou une catégorie.',
    cooldown : 5,
    usage : '<type_channel> <name_channel>',
    exemple :["channel-create text nom"],
    permissions : false,
    isUserAdmin: false,
    args : false
}