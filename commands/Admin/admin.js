const { Guild } = require("../../models/index");
const util = require('util');
const child_process = require('child_process');
const exec = util.promisify(child_process.exec);
const { MessageEmbed} = require("discord.js");
const { FLECHE} = require('./../../configstyle');
module.exports.run = async (client, message, args) =>{
    let {ADMIN,TRUE,FALSE} = require('./../../configstyle')
    if(!ADMIN.includes(message.author.id)) return message.channel.send(`${FALSE}Tu n'est pas admin du BOT `)
    if(!args[0]){
        const embed = new MessageEmbed()
        .setTitle('Commande admin')
        .setDescription('La commande `admin` permet de gérer le bot grace aux sous commandes suivantes :')
        .addFields(
            { name: '\u200b', value: `${FLECHE}\`admin eval\` execute du code javascript.`, inline: false },
            { name: '\u200b', value: `${FLECHE}\`admin pull\` pull le repo github.`, inline: false },
            { name: '\u200b', value: `${FLECHE}\`admin restart\` redemere le bot.`, inline: false },
            { name: '\u200b', value: `${FLECHE}\`admin charge\` lance le chargement des guilds.`, inline: false },
            //{ name: '\u200b', value: `${FLECHE}\`info invite\` permet de supprimer un info`, inline: false },
            //{ name: '\u200b', value: `${FLECHE}\`info channel\` permet de supprimer un info`, inline: false },
        )
        .setTimestamp()
        .setFooter('BOT ID : 689210215488684044')
        message.channel.send(embed)
    }

    //---------------------------------------CHARGE-DES-GUILDS--------------------------------------------------
    if(args[0] === 'charge'){
    async function verifierguild(){
        client.guilds.cache.forEach(async guild  => {
            
            const data = await Guild.findOne({ guildID: guild.id });
            if (!data){ 
                const newGuild = {
                guildID: guild.id,
                guildName: guild.name
                
                };
    
                await client.createGuild(newGuild)
            }
            console.log(guild.id)
  
        })

      }  
      verifierguild()
      message.channel.send(`${TRUE}Recharge de toutes les guilds lancée.`)
    //---------------------------------------RESTART--------------------------------------------------
    }else if(args[0] === 'restart'){
        console.log("Redemarage")
        await message.channel.send(`${TRUE}OK .`)
        process.exit()
    //---------------------------------------PULL-REPO--------------------------------------------------
    }else if(args[0] === 'pull'){
        let loading = '<a:loading:688692468195262475>'
        console.log("Pull")
        message.channel.send(`${loading} Commande en cour d'execution...`).then(async msg =>{
            try {
                await exec('git pull');
                msg.edit(`${TRUE} Updated.`);
            } catch (err) {
                msg.edit(`${FALSE} An error occured:\n\`\`\`${err}\n\`\`\``);
            }
        })
    }else if(args[0] === 'execute'){
        let loading = '<a:loading:688692468195262475>'
        console.log("Execution d'une commande")
        message.channel.send(`${loading} Commande en cour d'execution...`).then(async msg =>{
            try {
                await exec(`${args.slice(1).join(" ")}`);
                msg.edit(`${TRUE} Updated.`);
            } catch (err) {
                msg.edit(`${FALSE} An error occured:\n\`\`\`xl\n${err}\n\`\`\``);
            }
        })
    }else if(args[0] === 'eval'){
        function clean(text) {
            if (typeof(text) === "string")
              return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
            else
                return text;
          }
          try {
            const code = args.slice(1).join(" ");
            let evaled = eval(code);
        
            if (typeof evaled !== "string")
              evaled = require("util").inspect(evaled);
        
            message.channel.send(clean(evaled), {code:"xl"});
          } catch (err) {
            message.channel.send(`\`ERROR\` \`\`\`xl\n${clean(err)}\n\`\`\``);
          };
    }
    //------------------------------------------------------------------------------------------------------------------
}
module.exports.help = {
        
    name : 'admin',
    aliases : ['admin'],
    category : 'admin',
    description : 'Commandes d\'administration du bot.',
    cooldown : 5,
    usage : '<action> <args>',
    exemple :[],
    permissions : true,
    isUserAdmin: false,
    args : false,
    sousCommdandes : ["admin charge","admin restart","admin pull","admin execute","admin eval"]

}    
    