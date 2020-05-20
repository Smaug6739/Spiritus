const { MESSAGES } = require("../../util/constants");

module.exports.run = async (client, message, args, settings) => {
  /*
  function clean(text) {
    if (typeof text === "string") 
      return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
    return text;
  }
  if (message.author.id !== '611468402263064577') return;
  const code = args.join(" ");
  const evaled = eval(code);
  const cleanCode = await clean(evaled);
  message.channel.send(cleanCode, { code: "js" });
  */
 if (message.author.id !== '611468402263064577') return;

  function clean(text) {
    if (typeof(text) === "string")
      return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
    else
        return text;
  }
  
  try {
    const code = args.join(" ");
    let evaled = eval(code);

    if (typeof evaled !== "string")
      evaled = require("util").inspect(evaled);

    message.channel.send(clean(evaled), {code:"xl"});
  } catch (err) {
    message.channel.send(`\`ERROR\` \`\`\`xl\n${clean(err)}\n\`\`\``);
  };
}
module.exports.help = {
    
    name: "eval",
    aliases: ['eval','e'],
    category: 'admin',
    description: "Tester un code javascript",
    cooldown: 0.1,
    usage: '<code_to_test>',
    //exemple :["eval 5 + 5"],
    isUserAdmin: false,
    permissions: true,
    args: true
}