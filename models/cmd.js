const mongoose = require("mongoose");
const { DEFAULTSETTINGS: defaults } = require("../config");
const cmdSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  guildID: String,
  guildName: String,
  nom: {
    "type": String,
    "default": ''
  },
  contenu: {
    "type": String,
    "default": ''
  },
  active:{
    "type": Boolean,
    "default": true
  }
});

module.exports = mongoose.model("Cmd", cmdSchema);
