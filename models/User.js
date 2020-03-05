const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: { type: String, unique: true },
  sub: { type: String, unique: true }
});

const User = mongoose.model("User", userSchema);

module.exports = User;
