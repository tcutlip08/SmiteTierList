const mongoose = require("mongoose");

// Save a reference to the Schema constructor
const Schema = mongoose.Schema;

const GodsSchema = new Schema({
  class: String,
  name: [{ type: String }]
});

// This creates our model from the above schema, using mongoose's model method
const Gods = mongoose.model("Gods", GodsSchema);

// Export the Article model
module.exports = Gods;
