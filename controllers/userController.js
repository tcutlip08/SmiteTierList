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
    let mod = false;
    let email = req.body.email.toLowerCase();
    if (
      email === "tcutlip08@gmail.com" ||
      email === "sexcrexsi@gmail.com" ||
      email === "jessman51386@gmail.com" ||
      email === "rosykittenlove@gmail.com"
    ) {
      mod = true;
    }
    db.User.create({
      email: req.body.email,
      sub: req.body.sub,
      mod: mod
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
  banById: function(req, res) {
    db.User.update({ _id: req.params.id }, { $set: { banned: true } })
      .then(dbModel => {
        res.json(dbModel);
      })
      .catch(err => {
        console.log(err);
        res.status(422).json(err);
      });
  },
  modById: function(req, res) {
    db.User.update(
      { _id: req.params.id },
      { $set: { mod: req.body.mod, banned: req.body.banned } }
    )
      .then(dbModel => {
        res.json(dbModel);
      })
      .catch(err => {
        console.log(err);
        res.status(422).json(err);
      });
  },
  remove: function(req, res) {
    db.User.findById({ _id: req.params.id })
      .then(dbModel => dbModel.remove())
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  fixTime: function(req, res) {
    db.User.update(req.query, { updated: Date(Date.now()) })
      .then(dbModel => {
        res.json(dbModel);
      })
      .catch(err => {
        console.log(err);
        res.status(422).json(err);
      });
  }
};
