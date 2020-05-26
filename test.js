module.exports = (member)=>{
    user = member.user;
    member.guild.channels.cache
    .get("536220497353113628")
    .send("**" + user.tag +"** le traitre vient de nous abandonner.Bon vent l'ami ! Nous sommes maintenant "+ member.guild.memberCount);
};

/*
const Discord = require('discord.js')
const bot = new Discord.Client()
const { PREFIX } = require('./config');

bot.on("ready", function(message) {
  
  console.log(PREFIX);
   })

bot.login('NzA4NzQxNDMxMjE2NDM5Mzk4.XrlKAg.fAvZpmZ_sLUvNl1I8tHb__F7vZk')

bot.on("message", function(message) {
  if(message.content===PREFIX+"ping"){
  let debut = Date.now();
  message.channel.send("Ping").then(async(m) => await m.edit(Pong  :  ${Date.now()-debut}ms));
  }
  })

  bot.on('guildMemberAdd', member => {

    NewUser = member.user;
    member.guild.channels.cache.get("502529309358161933").send("Salut"+"<@" + NewUser + ">" +"<:y5:669741181772496897>, bienvenue dans la meute de la French Gaming Family ! <:x6:672674154071457792> 🎉 <:y77:713442519752507482> \n\n **N\'oublie pas d\'aller dans le channel <#517883101469343785> pour choisir ton support et les jeux auxquels tu joues afin de faire apparaître les différents salons** \n\n"+
     "<a:p7:559095519746588672> **__Attention :Tu ne pourra pas écrire avant d\'avoir choisi tes jeux et supports !__** \n\n **__Nous sommes désormais__** "+ member.guild.memberCount); 
  });



bot.on('message', message => {

  if (message.content === '!monavatar') {
  
    message.reply(message.author.displayAvatarURL());
  }
});


const emojiEmbed = new Discord.MessageEmbed()


.setTitle('Tableau de classement emojitique')
.setDescription('Nommez vos émojis comme sur le tableau pour les placer à l\'endroit désiré')
.setImage('https://cdn.discordapp.com/attachments/714242633375023164/714436203012816936/sketch-1590086562873.png')
bot.on('message', message => {

  if(message.content === '!emojitab')
   
    message.channel.send(emojiEmbed)
   
   
});


const flyersEmbed = new Discord.MessageEmbed()

.setTitle('Affiche multigaming')
.setDescription('Postez cette image accompagnée de votre lien d\'invitation pour recruter de nouveaux compagnons dans des groupes multigaming')
.setImage('https://cdn.discordapp.com/attachments/714242633375023164/714435629366247444/sketch-1590357630728.png')
bot.on('message', message => {

  if(message.content === '!flyer multigaming')
   
    message.channel.send(flyersEmbed)
   
   
});


const flyersapexEmbed = new Discord.MessageEmbed()