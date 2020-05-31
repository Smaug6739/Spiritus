const color = require('../../util/constants')
module.exports.run =(client, message, args) => {
    function Url_Valide(UrlTest, http_fac) {
        if (http_fac){ //le segment "http://" est facultatif
           var regexp = new RegExp("^((http|https)://)?(www[.])?([a-zA-Z0-9]|-)+([.][a-zA-Z0-9(-|/|=|?)?]+)+$");
         }else{
          var regexp = new RegExp("^((http|https)://){1}(www[.])?([a-zA-Z0-9]|-)+([.][a-zA-Z0-9(-|/|=|?)?]+)+$");
         }
        if (regexp.test(UrlTest)){
          message.channel.send('Mon URL est valide');
        }else{
            message.channel.send('Mon URL n\'est PAS valide');
        }
        return regexp.test(args[0]);
      }
      Url_Valide(args[0])
   
}
module.exports.help = {
    
    name : 'test',
    aliases : ['test'],
    category : 'misc',
    description : 'commande de test',
    cooldown : 0.1,
    usage : '',
   // exemple :["ping"],
    permissions : false,
    isUserAdmin: false,
    args : false
}
