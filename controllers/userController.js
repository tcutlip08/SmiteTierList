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
  }
};
