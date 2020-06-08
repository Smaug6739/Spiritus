"use strict";

const { Canvas } = require("canvas-constructor");

const zoomfactor = 10;
const reactions = ["⬅", "➡", "⬆", "⬇", "✅", "🖋", "🔏"];
let channels = [];

/**
 * Executes the command
 * @param {Message} message
 * @param {String} command
 * @param {Array<String>} args
 */
module.exports.run = function(client, message, args) {
    


  if (channels.includes(message.channel.id)) {
   message.reply("Vous ne pouvez pas dessiner avec 2 personnes dans le meme channel !");
    return;
  }
  var size;
  if (+args[0] >= 5 && +args[0] <= 50) {
    size = +args[0];
  } else {
    message.reply("Le cadre doit etre entre 5 et 50 px");
    return;
  }
  message.channel.send("Chargement...").then((msg) => {
    channels.push(message.channel.id);
    const drawing = new Drawing(msg, size, args[1], args[2]);
  });
};


class Drawing {
  constructor(msg, size, fg, bg) {
    this.msg = msg;
    this.canvasmsg;
    this.size = size;
    this.realsize = size * zoomfactor;
    this.penx = Math.floor(size / 2);
    this.peny = this.penx;
    this.penstate = false; // true: on, false: off
    this.fcolor = fg || "rgb(0, 0, 0)";
    this.bcolor = bg || "rgb(255, 255, 255)";

    this.initPixels();
    this.c = new Canvas(this.realsize, this.realsize).setColor(this.bcolor).addRect(0, 0, this.realsize, this.realsize);
    this.drawCanvas();

    msg.edit("Utilisez les réactions pour écrire : \n✅ Fermer la session | 🖋 Errire | 🔏 Lever le stylo");
    this.reactArrows(0);
    this.collector = msg.createReactionCollector((reaction, user) => {
      return user.id !== msg.client.user.id && reactions.includes(reaction.emoji.name);
    });
    let self = this;
    this.collector.on("collect", (reaction) => {
      self.handleReaction(reaction)
    });
  }

  stop(reason = "") {
    this.collector.stop();
    //this.drawCanvas(true)
    this.msg.edit("Session de dessin terninée" + reason);
    this.msg.reactions.removeAll();
    this.msg.delete()

    this.msg.client.clearTimeout(this.timeout);
    channels = channels.filter(item => item !== this.msg.channel.id);
    
  }

  renewTimeout() {
    /*let self = this;
    this.msg.client.clearTimeout(this.timeout);
    this.timeout = this.msg.client.setTimeout(function() {
    self.stop("\nAreter après 2min.");
    }, 120000);*/
  }
  
  handleReaction(reaction) {
    // console.log(`${reaction.emoji.name} from ${reaction.users.last().username}`);
    const rid = reactions.indexOf(reaction.emoji.name);
    if (rid < 4) this.movePen(rid);
    else if (rid === 4) this.stop();
    else this.togglePenstate();
    //reaction.remove(reaction.last)

    //reaction.removeAll().then(this.msg.react(reactions))
    //.then(this.msg.react(reaction.last))
    //.catch(e => {
    //  if (e.code === 50013) reaction.message.channel.send("I need the 'Manage Messages' permission in order to work properly!");
    //});
    /*reaction.react(reaction.last).catch(e => {
      if (e.code === 50013) reaction.message.channel.send("I need the 'Manage Messages' permission in order to work properly!");
    });*/
    this.drawCanvas();
  }

  /*
 * 0: Left
 * 1: Right
 * 2: Up
 * 3: Down
 */
  movePen(dir) {
    const xactions = [-1, 1, 0, 0];
    const yactions = [0, 0, -1, 1];
    if ((this.penx > 0 || xactions[dir] === 1) && (this.penx < this.size || xactions[dir] === -1)) this.penx += xactions[dir];
    if ((this.peny > 0 || yactions[dir] === 1) && (this.peny < this.size || yactions[dir] === -1)) this.peny += yactions[dir];
  }

  togglePenstate() {
    this.penstate = !this.penstate;
    if (this.penstate) {
      this.msg.reactions.cache.find(val => val.emoji.name === reactions[5]).remove();
      this.msg.react(reactions[6]);
      //this.msg.react(reactions[5]);//---------------------------------------------------------------------------------------------------------------

    } else {
      this.msg.reactions.cache.find(val => val.emoji.name === reactions[6]).remove();
      this.msg.react(reactions[5]);
      //this.msg.react(reactions[6]);//---------------------------------------------------------------------------------------------------------------

    }
  }

  initPixels() {
    this.pixels = [];
    for (let i = 0; i < Math.pow(this.size, 2); i++) {
      this.pixels.push(false);
    }
  }

  setPixel(x, y) {
    this.pixels[x + (y * this.size)] = true;
  }

  setCanvasPixel(x, y, color) {
    this.c.setColor(color).addRect(x * zoomfactor, y * zoomfactor, zoomfactor, zoomfactor);
  }

  drawCanvas(end = false) {
    if (this.penstate) this.setPixel(this.penx, this.peny);
    for (let x = 0; x < this.size; x++) {
      for (let y = 0; y < this.size; y++) {
        this.setCanvasPixel(x, y, this.pixels[x + (y * this.size)] ? this.fcolor : this.bcolor);
      }
    }
    if (!end) {
      this.setCanvasPixel(this.penx, this.peny, this.pixels[this.penx + (this.peny * this.size)] ? "#5A0000" : "red");
      this.renewTimeout();
    }
    this.sendCanvas();
  }

  async sendCanvas() {
    if (this.canvasmsg) this.canvasmsg.delete().catch(e => console.error(e));
    this.msg.channel.send(`Cadre : ${this.size}px`, {
      files: [
        this.c.toBuffer()
      ]
    }).then(msg => {
      this.canvasmsg = msg;
    });
  }

  reactArrows(arrow) {
    if (arrow === 6) return;
    this.msg.react(reactions[arrow]).then(_ => {
      this.reactArrows(arrow + 1);
    }).catch(
      e => console.error(`Reaction Error: ${e}`)
    );
  }
}
module.exports.help = {
    
    name : 'pixel',
    aliases : ['pixel'],
    category : 'misc',
    description : 'Permet de dessiner',
    cooldown : 3,
    usage : '<number(5-50)>',
   // exemple :["ping"],
    permissions : false,
    isUserAdmin: false,
    args : true
}
