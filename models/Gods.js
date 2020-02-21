const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const GodsSchema = new Schema({
  class: { type: String },
  name: { type: String },
  rank: [
    {
      type: Schema.Types.ObjectId,
      ref: "User"
    }
  ]
});

const Gods = mongoose.model("Gods", GodsSchema);

module.exports = Gods;
