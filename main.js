const { Client, Collection,WebhookClient/*,Intents*/ } = require('discord.js');
const DBL = require('dblapi.js');
const { loadCommands, loadEvents } = require("./util/loader");
//const myIntents = new Intents();
//myIntents.add('GUILDS','GUILD_MEMBERS','GUILD_MESSAGES','DIRECT_MESSAGES');
const client = new Client({// ws: { intents: myIntents }
  disableMentions : 'everyone',
  ws: { intents: ['GUILDS','GUILD_MESSAGES','GUILD_MEMBERS','GUILD_EMOJIS','GUILD_WEBHOOKS'] },
  partials: ['MESSAGE', 'CHANNEL', 'REACTION']});
require('./util/functions')(client);
require('./util/Utils')(client);
client.mongoose = require("./util/mongoose");
["commands", "cooldowns"].forEach(x => client[x] = new Collection());
loadCommands(client);
loadEvents(client);
client.mongoose.init();
client.config = require("./config")
client.configuration = require('./configuration')
client.login(client.configuration.TOKENS.DISCORD);
if(client.user.id === client.config.IDOFFITIEL){
  const dbl = new DBL("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4OTIxMDIxNTQ4ODY4NDA0NCIsImJvdCI6dHJ1ZSwiaWF0IjoxNTk4MDI4MzE5fQ.Mcm1t7ehWiS1daU8RW38B2ebwsQPpz3ivsXAC-C0cvc", {
    webhookPort: 5000, 
    webhookAuth: 'password' 
}, client);
dbl.webhook.on('ready', hook => {
    console.log(`Webhook running at http://${hook.hostname}:${hook.port}${hook.path}`);
  });
dbl.webhook.on('vote', async vote => {
    const guild = client.guilds.cache.get('710759353472516176')
    const channel = client.channels.cache.get(`736074693790138409`)
    try{
        const member = guild.members.cache.get(vote.user);
            channel.send(`<@!${member.id}> a voté pour Spiritus sur DBL ! Merci ❤️`)
    

    }catch(err){
        console.log(err)
        const channelerror = client.channels.cache.get(`730120455243038794`)
        channelerror.send(`**Erreur DBL : **\n\`\`\`js\n${err}\`\`\``)
    }
})
}
process.on('uncaughtException', (error) => {
    console.warn(error);
    if (!client) return;
    client.errorHook.send(error, {code: 'js'});
  });
process.on('unhandledRejection', (listener) => {
  console.warn(listener);
  if (!client) return;
  client.errorHook.send(listener, {code: 'js'}); 
});
process.on('rejectionHandled', (listener) => {
  console.warn(listener);
  if (!client) return;
  client.errorHook.send(listener, {code: 'js'});
});
process.on('warning', (warning) => {
  console.warn(warning);
  if (!client) return;
  client.errorHook.send(warning, {code: 'js'});
});

  client.errorHook = new WebhookClient(
    `${client.configuration.WEBHOOKS.CONSOLE.ID}`, `${client.configuration.WEBHOOKS.CONSOLE.TOKEN}`);