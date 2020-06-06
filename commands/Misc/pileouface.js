module.exports.run =(client, message, args) => {
    
    let nombreAleatoire = Math.round(Math.random()*1);
             //console.log(nombreAleatoire);
            let reponse;
            if(nombreAleatoire == 1){
            message.channel.send("Pile, GG tu viens de gagner 5exp")
            } else {
            message.channel.send("Face, pas de chance tu viens de perdre 5exp")
            }
   
}
module.exports.help = {
    
    name : 'pileouface',
    aliases : ['pileouface'],
    category : 'misc',
    description : 'Fais jouer le hasard pour gagner ou perdre de l\'exp',
    cooldown : 3,
    usage : '',
   // exemple :["ping"],
    permissions : false,
    isUserAdmin: false,
    args : false
}

