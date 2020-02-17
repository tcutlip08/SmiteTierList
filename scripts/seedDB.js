const mongoose = require("mongoose");
const db = require("../models");

mongoose.connect(
  process.env.MONGODB_URI || "mongodb://localhost/dataBaseNameHere",
  {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true
  }
);

const userSeeds = [
  {
    username: "User",
    email: "user@gmail.com",
    password: "admin"
  }
];

db.User.remove({})
  .then(() => db.User.collection.insertMany(userSeeds))
  .then(data => {})
  .catch(err => {
    // console.error(err);
  });
