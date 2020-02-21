const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: { type: String },
  email: { type: String, unique: true },
  password: { type: String },
  gods: [{ type: Array }]
});

const User = mongoose.model("User", userSchema);

module.exports = User;
