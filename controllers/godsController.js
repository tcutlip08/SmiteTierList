const db = require("../models");

module.exports = {
  findAll: function(req, res) {
    db.Gods.find(req.query)
      .populate({
        path: "rank",
        model: "User"
      })
      .then(dbModel => {
        res.json(dbModel);
      })
      .catch(err => res.status(422).json(err));
  },
  findById: function(req, res) {
    db.Gods.findById(req.params.id)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  create: function(req, res) {
    db.Gods.create(req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  update: function(req, res) {
    // console.log(req.body.data.data.god.name);
    db.Gods.findOne({ name: req.body.data.data.god.name })
      .then(dbModel => {
        let rank = dbModel.rank;
        rank.push(req.body.data.data.god.rank[0]);
        db.Gods.findOneAndUpdate(
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
    db.Gods.findById({ _id: req.params.id })
      .then(dbModel => dbModel.remove())
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  }
};
