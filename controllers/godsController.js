const db = require("../models");

module.exports = {
  findAll: function(req, res) {
    db.Gods.find(req.query)
      .populate("User rank._id")
      .then(dbModel => {
        console.log("Fuck");
        res.json(dbModel);
      })
      .catch(err => res.status(422).json(err));
  },
  findById: function(req, res) {
    db.Gods.findById(req.params.id)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  newGod: function(req, res) {
    db.Gods.create({ class: req.params.class, name: req.params.name, rank: [] })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  create: function(req, res) {
    db.Gods.create(req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  update: function(req, res) {
    if (req.body.mode === "duel") {
      db.Gods.update(
        { _id: req.params.id, "rank._id": req.body.user },
        { $set: { "rank.$.mode.duel": req.body.rank } }
      )
        .then(dbModel => {
          res.json(dbModel);
        })
        .catch(err => {
          console.log(err);
          res.status(422).json(err);
        });
    } else if (req.body.mode === "joust") {
      db.Gods.update(
        { _id: req.params.id, "rank._id": req.body.user },
        { $set: { "rank.$.mode.joust": req.body.rank } }
      )
        .then(dbModel => {
          res.json(dbModel);
        })
        .catch(err => {
          console.log(err);
          res.status(422).json(err);
        });
    } else if (req.body.mode === "conquest") {
      db.Gods.update(
        { _id: req.params.id, "rank._id": req.body.user },
        { $set: { "rank.$.mode.conquest": req.body.rank } }
      )
        .then(dbModel => {
          res.json(dbModel);
        })
        .catch(err => {
          console.log(err);
          res.status(422).json(err);
        });
    }
  },
  remove: function(req, res) {
    db.Gods.findById({ _id: req.params.id })
      .then(dbModel => dbModel.remove())
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  }
};
