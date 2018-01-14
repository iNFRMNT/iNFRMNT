const db = require("../models");

module.exports = {
  findAll: function(req, res) {
    db.User
      .find(req.query)
      // Specify that we want to populate the retrieved users with any associated billss
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  findById: function(req, res) {
    console.log(req.params);
    db.User
      .findById(req.params.id)
      .populate('savedBills')
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  create: function(req, res) {
    db.User
      .create(req.body)
      .then(function(dbUser) {
        console.log(dbUser);
          // If the User was created successfully, send it back to the client
        res.json(dbUser);
      })
      .catch(function(err) {
        console.log(err.message);
      });
  },
  update: function(req, res) {
    db.User
      .findOneAndUpdate({ _id: req.params.id }, req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  remove: function(req, res) {
    db.User
      .findById({ _id: req.params.id })
      .then(dbModel => dbModel.remove())
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  }
};
