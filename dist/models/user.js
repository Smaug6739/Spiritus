"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const userSchema = new mongoose_1.Schema({
    _id: mongoose_1.Schema.Types.ObjectId,
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
    coins: {
        "type": Number,
        "default": 0
    },
    daily: {
        "type": Date,
        "default": 0
    },
    objets: {
        "type": Array,
        "default": []
    },
    warns: {
        "type": Number,
        "default": 0
    }
});
exports.default = mongoose_1.model("User", userSchema);
