const db = require("../models");

module.exports = {
  findAll: function(req, res) {
    db.User.find(req.query)
      .populate("Gods gods._id")
      .then(dbModel => {
        res.json(dbModel);
      })
      .catch(err => res.status(422).json(err));
  },
  findById: function(req, res) {
    db.User.findById(req.params.id)
      .populate("Gods gods._id")
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  findByGoogle: function(req, res) {
    db.User.findOne({ sub: req.params.sub })
      .populate("Gods gods._id")
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
    db.Gods.find(req.query)
      .then(gods => {
        let array = [];
        for (let i = 0; i < gods.length; i++) {
          array.push({
            _id: gods[i]._id,
            mode: { conquest: 0, joust: 0, duel: 0 }
          });
        }
        db.User.create({
          email: req.body.email,
          sub: req.body.sub,
          gods: array
        })
          .then(dbModel => res.json(dbModel))
          .catch(err => res.status(422).json(err));
      })
      .catch(err => res.status(422).json(err));
  },
  update: function(req, res) {
    if (req.body.mode === "duel") {
      db.User.updateOne(
        { _id: req.params.id, "gods._id": req.body._id },
        { $set: { "gods.$.mode.duel": req.body.rank } }
      )
        .then(data => {
          res.json(data);
        })
        .catch(err => res.status(422).json(err));
    } else if (req.body.mode === "conquest") {
      db.User.updateOne(
        { _id: req.params.id, "gods._id": req.body._id },
        { $set: { "gods.$.mode.conquest": req.body.rank } }
      )
        .then(data => {
          res.json(data);
        })
        .catch(err => res.status(422).json(err));
    } else if (req.body.mode === "joust") {
      db.User.updateOne(
        { _id: req.params.id, "gods._id": req.body._id },
        { $set: { "gods.$.mode.joust": req.body.rank } }
      )
        .then(data => {
          res.json(data);
        })
        .catch(err => res.status(422).json(err));
    } else {
      res
        .status(422)
        .json({
          message:
            "Mode not detected. Probably cause who ever coded this is a fuckin idiot (^-^)"
        });
    }
  },
  remove: function(req, res) {
    db.User.findById({ _id: req.params.id })
      .then(dbModel => dbModel.remove())
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  }
  // seeds: function(req, res) {
  //   db.Gods.find(req.query).then(gods => {
  //     let array = [];
  //     for (let i = 0; i < gods.length; i++) {
  //       array.push({
  //         _id: gods[i]._id,
  //         rank: Math.floor(Math.random() * 10)
  //       });
  //     }
  //     const user = [
  //       {
  //         email: "email",
  //         sub: "Google Sub Key",
  //         gods: array
  //       }
  //     ];
  //     db.User.remove({})
  //       .then(() => db.User.collection.insertMany(user))
  //       .then(user => {
  //         for (let g = 0; g < user.ops[0].gods.length; g++) {
  //           let god = user.ops[0].gods[g];
  //           db.Gods.findOneAndUpdate(
  //             { _id: god._id },
  //             { rank: [user.ops[0]._id] }
  //           )
  //             .then(dbModel => {})
  //             .catch(err => res.status(422).json(err));
  //         }
  //         res.json(user);
  //       })
  //       .catch(err => res.status(422).json(err));
  //   });
  // }
};
