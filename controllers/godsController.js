const db = require("../models");

module.exports = {
  findAll: function(req, res) {
    db.Gods.find(req.query)
      .populate("User rank._id")
      .then(dbModel => {
        res.json(dbModel);
      })
      .catch(err => res.status(422).json(err));
  },
  findPublic: function(req, res) {
    db.Gods.find(req.query)
      .populate("User rank._id")
      .then(dbModel => {
        let gods = dbModel.map(god => {
          let users = [];
          god.rank.map(user => {
            if (!user._id.banned) {
              users.push(user);
            }
          });
          god.rank = users;
          return god;
        });
        res.json(gods);
      })
      .catch(err => res.status(422).json(err));
  },
  findPrivate: function(req, res) {
    db.Gods.find(req.query)
      .populate("User rank._id")
      .then(dbModel => {
        let user;
        dbModel[0].rank.map((data, i) => {
          if (data._id._id == req.params.id) {
            user = i;
          }
        });

        let gods = dbModel.map(god => {
          god.rank = god.rank[user];
          return god;
        });

        res.json(gods);
      })
      .catch(err => res.status(422).json(err));
  },
  findBigName: function(req, res) {
    db.Gods.find(req.query)
      .populate("User rank._id")
      .then(dbModel => {
        let user;
        dbModel[0].rank.map((data, i) => {
          if (data._id.email == req.params.email) {
            user = i;
          }
        });
        console.log(user);

        let gods = dbModel.map(god => {
          god.rank = god.rank[user];
          return god;
        });

        res.json(gods);
      })
      .catch(err => res.status(422).json(err));
  },
  findById: function(req, res) {
    db.Gods.findById(req.params.id)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  newGod: function(req, res) {
    db.User.find(req.query)
      .then(user => {
        let rank = user.map(data => {
          return { _id: data._id, mode: { duel: 0, joust: 0, conquest: 0 } };
        });
        db.Gods.create({
          class: req.params.class,
          name: req.params.name,
          rank: rank
        })
          .then(dbModel => res.json(dbModel))
          .catch(err => res.status(422).json(err));
      })
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
