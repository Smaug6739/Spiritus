
module.exports.run = async (client, message, args) => {
  // message.react('⭐');
  // message.react('706869108238450699');

  await message.react('🟥');
  await message.react('🟦');
  await message.react('🟩');
};


module.exports.help = {

    name: "emoji",
    aliases: ['emoji'],
    category: 'reactions',
    description: "Renvoie des emojis en réaction!",
    cooldown: 0.1,
    usage: '',
    //exemple :["allroles"],
    permissions: false,
    isUserAdmin: false,
    args: false

  };