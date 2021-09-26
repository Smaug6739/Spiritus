import { Schema, model } from "mongoose";

const userSchema = new Schema({
  _id: Schema.Types.ObjectId,
  guildID: String,
  guildName: String,
  userID: String,
  username: String,
  experience: {
    type: Number,
    default: 0,
  },
  level: {
    type: Number,
    default: 0,
  },
  coins: {
    type: Number,
    default: 0,
  },
  daily: {
    type: Date,
    default: 0,
  },
  objets: {
    type: Array,
    default: [],
  },
  warns: {
    type: Number,
    default: 0,
  },
});

export default model("User", userSchema);
