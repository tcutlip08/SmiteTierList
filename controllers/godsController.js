const db = require("../models");

module.exports = {
  findAll: function(req, res) {
    db.Gods.find(req.query)
      .populate("User rank")
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
    console.log(req.body);
    db.Gods.findOneAndUpdate(
      { _id: req.body.godID },
      { $addToSet: { rank: req.body._id } }
    )
      .then(dbModel => {
        res.json(dbModel);
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
