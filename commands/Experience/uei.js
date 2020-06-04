module.exports.run = async(client, message, args, settings, dbUser) => {
    
    const { User } = require("./../../models/index");

   /* async function  getUser(user){
            const data = await User.findOne({ userID: message.member.id  });
            
            if (data) return message.channel.send(data.experience);
            else return;
          };
          getUser()*/
/*

          async function idMembers(){
            message.guild.members.cache.forEach(async user  => {
                console.log(user.id)
                const data = await User.findOne({ userID: message.member.id  });
                if(data){

                }else{
                    return;
                }
      
            })
    
          }
          idMembers()
          */
         /* client.getUser = async user => {
            const data = await User.findOne({ userID: user.id, guildID : message.member.guild});
            if (data) return data;
            else return;
          };
         message.channel.send(`${rank}`)*/
        
/*
         async function idMembers(){
          message.guild.members.cache.forEach(async user  => {
              console.log(user.id)
              const data = await User.findOne({ userID: message.member.id  });
              if(data){

              }else{
                  return;
              }
    
          })
  
        }
        idMembers()*/
        
}
module.exports.help = {

name : 'uei',
aliases : ['uei'],
category : 'experience',
description : 'Donne l\'exp d\'une personne.',
cooldown : 10,
usage : '',
//exemple :["channel-create text nom"],
permissions : false,
isUserAdmin: false,
args : false
}