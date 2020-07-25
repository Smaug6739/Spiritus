const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  guildID: String,
  guildName: String,
  userID: String,
  username: String,
  experience: {
    "type": Number,
    "default": 0
  },
  level: {
    "type": Number,
    "default": 0
  },
  warns: {
    "type": Number,
    "default": 0
  },
  coins: {
    "type": Number,
    "default": 0
  },
  daily: {
    "type": Date,
    "default": 0
  },
  shop: {
    "type": Array,
    "default": []
  }
});

module.exports = mongoose.model("User", userSchema);