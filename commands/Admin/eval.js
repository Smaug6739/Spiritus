const util = require('util');
module.exports.run = async (client, message, args) =>{
    if(!client.config.ADMIN.includes(message.author.id)) return message.channel.send(`${client.config.emojis.FALSE}Tu n'est pas admin du BOT `)
   
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
              evaled = await eval(args.join(' ').trim());
              if (args[1] === '-a' || args[1] === '-async') {
                  args.shift();
                  evaled = `(async () => { ${args.join(' ').trim()} })()`;
              }
              if (typeof evaled === 'object') {
                  evaled = util.inspect(evaled, { depth: 0, showHidden: true });
              } else {
                  evaled = String(evaled);
              }
          } catch (err) {
              return message.channel.send(`\`\`\`js\n${err}\`\`\``);
          }
          evaled = evaled.replace(client.config.TOKEN, 'no.');
      
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
module.exports.help = {
        
    name : 'eval',
    aliases : ['eval','e'],
    category : 'admin',
    description : 'Execute du code javascript.',
    cooldown : 5,
    usage : '',
    exemple :[],
    permissions : true,
    isUserAdmin: false,
    args : true,
    sousCommdandes : [""]

}    
    