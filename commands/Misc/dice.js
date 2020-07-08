const {MessageEmbed} = require('discord.js');
module.exports.run =(client, message, args) => {
            let nb_dés = args[0]
            let count = args[1] 
            if (isNaN(nb_dés)) return message.reply("le nombre de dés doit etre un nombre.");
            if (isNaN(count)) return message.reply("le nombre de faces doit etre un nombre");
            if(nb_dés > 30) return message.reply('vous ne pouvez pas lancer plus de 30 dés a la fois')
            if(count > 50) return message.reply('le nombre maximum de faces par dés est de 50.')
            function entierAleatoire(min, max){
                return Math.floor(Math.random() * (max - min + 1)) + min;
                }
                let tableau = []
                for(let i = 0; i< nb_dés; i++){      
                var entier = entierAleatoire(1, count);
                let a = 1 ;
                tableau.push('Lancé numero ' + (i+a) + ' a donner la valeur ' + entier)
                }
                const exampleEmbed = new MessageEmbed()
                .setColor(client.config.color.EMBEDCOLOR)
                .setTitle(`${client.config.emojis.LOGOBOT} Module de jeu`)
                .setDescription(tableau)
                .setThumbnail('https://french-gaming-family.fr/public/dés.png')
                .setTimestamp()
                message.channel.send(exampleEmbed)     
 }
 module.exports.help = {
     name : 'dice',
     aliases : ['dice', 'dés','random','roll'],
     category : 'misc',
     description : 'Lance un ou plusieurs dés',
     cooldown : 10,
     usage : '<numbre_dice> <max_dice>',
     exemple :["dice 3 6"],
     isUserAdmin: false,
     permissions : false,
     args : true,
     sousCommdandes : []
 }
 