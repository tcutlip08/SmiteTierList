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
    db.User.findOne({ sub: req.params.sub })
      .then(dbModel => {
        if (dbModel) {
          res.json(dbModel);
        } else {
          res.status(422).json(err);
        }
      })
      .catch(err => res.status(422).json(err));
  },
  create: function(req, res) {
    db.User.create({
      email: req.body.email,
      sub: req.body.sub
    })
      .then(user => {
        db.Gods.updateMany(req.query, {
          $push: {
            rank: {
              _id: user._id,
              mode: { duel: 0, joust: 0, conquest: 0 }
            }
          }
        })
          .then(dbModel => {
            res.json(user);
          })
          .catch(err => res.status(422).json(err));
      })
      .catch(err => res.status(422).json(err));
  },
  update: function(req, res) {
    console.log("What are you updating stupid??");
  },
  remove: function(req, res) {
    db.User.findById({ _id: req.params.id })
      .then(dbModel => dbModel.remove())
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  }
};
