import { Schema, model } from "mongoose";

const guildSchema = new Schema({
  _id: Schema.Types.ObjectId,
  guildId: String,

  welcomeMessage: {
    type: String,
    default: "Welcome {{user}} !",
  },
  welcomeChannel: {
    type: String,
    default: null,
  },
  byeMessage: {
    type: String,
    default: "{User} just left the server {Guild}",
  },
  byeChannel: {
    type: String,
    default: null,
  },

  expCard: {
    type: String,
    default:
      "https://cdn.discordapp.com/attachments/734318123510923324/745575310216658954/rank_1.png",
  },
  expSystem: {
    type: Boolean,
    default: false,
  },
  expMessage: {
    type: String,
    default: "Congradulation {{User}}, you are now to the level {{Level}}",
  },
  serveurstats: {
    type: Boolean,
    default: false,
  },
  invitations: {
    type: Boolean,
    default: false,
  },
  expChannel: {
    type: String,
    default: "",
  },
  modLogs: {
    type: String,
    default: "",
  },
  premium: {
    type: Boolean,
    default: false,
  },
  reactionroles: {
    type: Array,
    default: [],
  },
  modRoles: {
    type: Array,
    default: [],
  },
  filter: {
    type: Array,
    default: [],
  },
  ignoreChannel: {
    type: Array,
    default: [],
  },
  links: {
    type: Array,
    default: [],
  },
  commands: {
    type: Array,
    default: [],
  },
  kickauto: {
    type: Boolean,
    default: false,
  },
});

export default model("Guild", guildSchema);
