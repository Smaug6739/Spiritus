const { Guild } = require("../../models/index");
const util = require('util');
const child_process = require('child_process');
const exec = util.promisify(child_process.exec);
const { MessageEmbed} = require("discord.js");
module.exports.run = async (client, message, args) =>{
    if(!client.config.ADMIN.includes(message.author.id)) return message.channel.send(`${client.config.emojis.FALSE}Tu n'est pas admin du BOT `)
    if(!args[0]){
        const embed = new MessageEmbed()
        .setTitle('Commande admin')
        .setDescription('La commande `admin` permet de gérer le bot grace aux sous commandes suivantes :')
        .setColor(client.config.color.EMBEDCOLOR)
        .addFields(
            { name: '\u200b', value: `${client.config.emojis.FLECHE}\`admin eval\` execute du code javascript.`, inline: false },
            { name: '\u200b', value: `${client.config.emojis.FLECHE}\`admin pull\` pull le repo github.`, inline: false },
            { name: '\u200b', value: `${client.config.emojis.FLECHE}\`admin restart\` redemere le bot.`, inline: false },
            { name: '\u200b', value: `${client.config.emojis.FLECHE}\`admin reload\` redemere une commande du bot.`, inline: false },
            { name: '\u200b', value: `${client.config.emojis.FLECHE}\`admin charge\` lance le chargement des guilds.`, inline: false },
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
      message.channel.send(`${client.config.emojis.TRUE}Recharge de toutes les guilds lancée.`)
    //---------------------------------------RESTART--------------------------------------------------
    }
    if(args[0] === 'restart'){
        console.log("Redemarage")
        await message.channel.send(`${client.config.emojis.TRUE}OK .`)
        process.exit()
    }
    //---------------------------------------RELOAD-----------------------------------------------------

    if(args[0] === 'reload'){
        command = args.slice(2).join(" ")
        dir = args[1]
        chemin = `./../${dir}/${command}.js`
        try {
            delete require.cache[require.resolve(`${chemin}`)];
            client.commands.delete(command)
            const pull = require(`${chemin}`)
            client.commands.set(command, pull)
            message.channel.send(`${client.config.emojis.TRUE}Reloaded command \`${command}\``);
        } catch (err) {
            return message.channel.send(`${client.config.emojis.FALSE}An error occured: \n\`\`\`js\n${err}\n\`\`\``);
        }
    }
    //---------------------------------------PREMIUM---------------------------------------------------
    if(args[0] === 'premium'){
        const guild = {
            id : `${args[1]}`
        }
        await client.updateGuild(guild, {premium : true});
            message.channel.send(`${client.config.emojis.TRUE}Guild premium mise à jour avec succès.`)
    }
    //---------------------------------------PREMIUM-FALSE---------------------------------------------------
    if(args[0] === 'premium-false'){
        const guild = {
            id : `${args[1]}`
        }
        await client.updateGuild(guild, {premium : false});
            message.channel.send(`${client.config.emojis.TRUE}Guild premium mise à jour avec succès.`)
    }
    //---------------------------------------PULL-REPO--------------------------------------------------

    if(args[0] === 'pull'){
        console.log("Pull")
        message.channel.send(`${client.config.emojis.LOADING} Commande en cour d'execution...`).then(async msg =>{
            try {
                await exec(`git pull origin ${args[1]}`);
                msg.edit(`${client.config.emojis.TRUE} Updated.`);
            } catch (err) {
                msg.edit(`${client.config.emojis.FALSE} An error occured:\n\`\`\`${err}\n\`\`\``);
            }
        })
    }
    if(args[0] === 'execute'){
        console.log("Execution d'une commande")
        message.channel.send(`${client.config.emojis.LOADING} Commande en cour d'execution...`).then(async msg =>{
            try {
                await exec(`${args.slice(1).join(" ")}`);
                msg.edit(`${client.config.emojis.TRUE} Updated.`);
            } catch (err) {
                msg.edit(`${client.config.emojis.FALSE} An error occured:\n\`\`\`xl\n${err}\n\`\`\``);
            }
        })
    }
    if(args[0] === 'eval'){
       /*async function clean(text) {
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
          };*/
          let evaled;
          try {
              evaled = await eval(args.slice(1).join(' ').trim());
              if (args[1] === '-a' || args[1] === '-async') {
                  args.slice(1).shift();
                  evaled = `(async () => { ${args.slice(1).join(' ').trim()} })()`;
              }
              if (typeof evaled === 'object') {
                  evaled = util.inspect(evaled, { depth: 0, showHidden: true });
              } else {
                  evaled = String(evaled);
              }
          } catch (err) {
              return message.channel.send(`\`\`\`js\n${err}\`\`\``);
          }
      
          evaled = evaled.replace(client.config.token, 'no.');
      
          const fullLen = evaled.length;
      
          if (fullLen === 0) {
              return null;
          }
          if (fullLen > 2000) {
              evaled = evaled.match(/[\s\S]{1,1900}[\n\r]/g) || [];
              if (evaled.length > 3) {
                  message.channel.send(`\`\`\`js\n${evaled[0]}\`\`\``);
                  message.channel.send(`\`\`\`js\n${evaled[1]}\`\`\``);
                  message.channel.send(`\`\`\`js\n${evaled[2]}\`\`\``);
                  return;
              }
              return evaled.forEach((message) => {
                  message.channel.send(`\`\`\`js\n${message}\`\`\``);
                  return;
              });
          }
          return message.channel.send(`\`\`\`js\n${evaled}\`\`\``);
    }
    //------------------------------------------------------------------------------------------------------------------
}
module.exports.help = {
        
    name : 'admin-bot',
    aliases : ['admin-bot'],
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
    