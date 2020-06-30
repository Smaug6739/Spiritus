const { MESSAGES } = require("../../util/constants");

module.exports.run = (client, message, args) => {
  const filter = reaction => reaction.emoji.name === '⭐';
  // const collector = message.createReactionCollector(filter, { time: 10000 });

  message.react('⭐')
    .then(() => {
      message.awaitReactions(filter, { time: 10000 })
        .then(collected => message.channel.send(`${collected.size} réaction collectée.`));
    });

  // collector.on('end', collected => {
  //   message.channel.send(`${collected.size} réaction collectée.`);
  // });
};


module.exports.help = {
    name: "collector-reac",
    aliases: ['collector-reac','col-rec'],
    category: 'collectors',
    description: "Initialise un collector de 10 secondes qui collecte des reactions.",
    cooldown: 3,
    usage: '<command_name>',
    exemple :["help","help ping"],
    isUserAdmin: false,
    permissions: false,
    args: false
  };