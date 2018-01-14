const db = require("../models");

module.exports = {
  findAll: function(req, res) {
    db.Bill
      .find(req.query)
      // Specify that we want to populate the retrieved users with any associated billss
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  findById: function(req, res) {
    console.log(req.params);
    db.Bill
      .findById(req.params.id)
      .populate('savedBills')
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  create: function(req, res) {
    db.Bill
      .create(req.body)
      .then(function(dbBill) {
        console.log(dbBill);
          // If the Bill was created successfully, send it back to the client
        res.json(dbBill);
      })
      .catch(function(err) {
        console.log(err.message);
      });
  },
  update: function(req, res) {
    db.Bill
      .findOneAndUpdate({ _id: req.params.id }, req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  remove: function(req, res) {
    db.Bill
      .findById({ _id: req.params.id })
      .then(dbModel => dbModel.remove())
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  }
};
