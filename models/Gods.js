const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const GodsSchema = new Schema({
  class: { type: String },
  name: { type: String },
  rank: [
    {
      _id: {
        type: Schema.Types.ObjectId,
        ref: "User"
      },
      mode: { duel: Number, joust: Number, conquest: Number }
    }
  ]
});

const Gods = mongoose.model("Gods", GodsSchema);

module.exports = Gods;
