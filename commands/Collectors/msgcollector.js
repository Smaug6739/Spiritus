const { MESSAGES } = require("../../util/constants");

module.exports.run = (client, message, args) => {
  const filter = msg => msg.content.includes(args[0]);
  // const collector = message.channel.createMessageCollector(filter, { time: 10000 });

  message.channel.send(`Tapez ${args[0]} afin de collecter `)
    .then(() => {
      message.channel.awaitMessages(filter, { time: 10000 })
        .then(collected => { message.channel.send(`${collected.size} messages collectés.`); });
    });

  // collector.on('end', collected => {
  //   message.channel.send(`${collected.size - 1} messages collectés.`);
  // });
};

module.exports.help = {
    name: "msgcollector",
    aliases: ['msgcollector','mcol'],
    category: 'collectors',
    description: "Initialise un collector de 10secondes",
    cooldown: 3,
    usage: '<message_to_collect>',
    exemple :["help","help ping"],
    isUserAdmin: false,
    permissions: false,
    args: false
  };