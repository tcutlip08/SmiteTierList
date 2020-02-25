const db = require("../models");

module.exports = {
  findAll: function(req, res) {
    db.User.find(req.query)
      .then(dbModel => {
        res.json(dbModel);
      })
      .catch(err => res.status(422).json(err));
  },
  findById: function(req, res) {
    db.User.findById(req.params.id)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  findByGoogle: function(req, res) {
    console.log(req.params.sub);
    db.User.find(req.query)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  create: function(req, res) {
    console.log(req.body);
    db.User.create(req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  update: function(req, res) {
    // console.log(req.body.data.data.god.name);
    db.User.findOne({ name: req.body.data.data.god.name })
      .then(dbModel => {
        let rank = dbModel.rank;
        rank.push(req.body.data.data.god.rank[0]);
        db.User.findOneAndUpdate(
          { name: req.body.data.data.god.name },
          { rank: rank }
        )
          .then(insertedGod => {
            res.json({ data: insertedGod });
          })
          .catch(err => res.status(422).json(err));
      })
      .catch(err => res.status(422).json(err));
  },
  remove: function(req, res) {
    db.User.findById({ _id: req.params.id })
      .then(dbModel => dbModel.remove())
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  seeds: function(req, res) {
    db.Gods.find(req.query).then(gods => {
      let array = [];
      for (let i = 0; i < gods.length; i++) {
        array.push({
          _id: gods[i]._id,
          rank: Math.floor(Math.random() * 9 + 1)
        });
      }
      const user = [
        {
          username: "tcutlip08",
          email: "tcutlip08@gmail.com",
          password: "W!zkik101",
          gods: array
        }
      ];
      db.User.remove({})
        .then(() => db.User.collection.insertMany(user))
        .then(user => {
          console.log(user.ops[0]._id);
          for (let g = 0; g < user.ops[0].gods.length; g++) {
            let god = user.ops[0].gods[g];
            // console.log(god._id);
            db.Gods.findOneAndUpdate(
              { _id: god._id },
              { rank: [user.ops[0]._id] }
            )
              .then(dbModel => {})
              .catch(err => res.status(422).json(err));
          }
          res.json(user);
        })
        .catch(err => res.status(422).json(err));
    });
  }
};
