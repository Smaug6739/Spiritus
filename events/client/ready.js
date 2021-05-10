const { MessageEmbed, WebhookClient } = require('discord.js')
module.exports = async client => {
  console.log(`Logged in as ${client.user.tag}!`);
  client.user.setPresence({ activity: { name: `${client.configuration.DEFAULTSETTINGS.prefix}help | ${client.configuration.DEFAULTSETTINGS.prefix}cmds`, type: 'WATCHING' }, status: 'online' });
  const webhookClient = new WebhookClient(`${client.configuration.WEBHOOKS.CONNECTIONS.DISCORD.ID}`, `${client.configuration.WEBHOOKS.CONNECTIONS.DISCORD.TOKEN}`);



  const allData = []
  for (let command of client.commands) {
    command = command[1]
    if (command.help.category !== 'admin') {
      if (command.help.subcommands.length) {
        const subcommands = []
        for (subc of command.help.subcommands) {
          const optionsOfSub = [];
          if (subc.args && subc.args.length) {
            for (s of subc.args) {
              optionsOfSub.push({
                name: s.name || 'default_name',
                description: s.description || 'default description',
                type: s.type || 'STRING',
                require: s.required || false
              })
            }
          }
          subcommands.push({
            name: subc.name,
            description: subc.description,
            type: 1,
            options: optionsOfSub
          })
        }
        const op = {
          name: command.help.name,
          type: 'SUB_COMMAND_GROUP',
          description: command.help.description,
          options: subcommands
        }
        allData.push(op)
      } else {
        const options = [];
        if (command.help.args && command.help.args.length) {
          command.help.args.map(arg => {
            options.push({
              name: arg.name || 'default_name',
              description: arg.description || 'default description',
              type: arg.type || 'STRING',
              required: arg.required || false
            })
          })
        }
        const data = {
          name: command.help.name,
          description: command.help.description,
          options: options
        }
        allData.push(data)
      }
    }
  }
  //await client.guilds.cache.get('809702809196560405').commands.set(allData)


  // // //await client.guilds.cache.get('710759353472516176').commands.delete('ping')
  // //const g = await client.application.commands.fetch()
  // const g = await client.guilds.cache.get('710759353472516176').commands.fetch()
  // console.log(g);
  // g.map(async f => {
  //   //   client.application.commands.delete(f)
  //   const d = await client.guilds.cache.get('710759353472516176').commands.delete(f.id)
  // })



  const embed = new MessageEmbed()
    .setTitle(`BOT ${client.user.tag} started.`)
    .setColor(`#0099ff`)
    .setThumbnail(`${client.user.displayAvatarURL()}`)
    .addField('Event ', 'Ready', true)
    .addField('Users ', `${client.guilds.cache.map(g => g.memberCount).reduce((a, b) => a + b)}`, true)
    .addField('Guilds ', `${client.guilds.cache.size.toString()}`, true)
    .setTimestamp()
    .setFooter(`BOT ID : ${client.user.id}`);

  webhookClient.send('', {
    username: `${client.configuration.WEBHOOKS.CONNECTIONS.DISCORD.NAME}`,
    avatarURL: `${client.configuration.WEBHOOKS.CONNECTIONS.DISCORD.AVATAR}`,
    embeds: [embed],
  });
}