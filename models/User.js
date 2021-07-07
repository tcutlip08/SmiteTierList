const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: { type: String, unique: true },
  sub: { type: String, unique: true },
  mod: { type: Boolean, default: false },
  banned: { type: Boolean, default: false },
  updated: { type: String, default: Date(Date.now()) }
});

const User = mongoose.model("User", userSchema);

module.exports = User;
