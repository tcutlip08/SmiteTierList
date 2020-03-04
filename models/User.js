const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: { type: String, unique: true },
  sub: { type: String, unique: true },
  gods: [
    {
      _id: {
        type: Schema.Types.ObjectId,
        ref: "Gods"
      },
      mode: { conquest: Number, joust: Number, duel: Number }
    }
  ]
});

const User = mongoose.model("User", userSchema);

module.exports = User;
