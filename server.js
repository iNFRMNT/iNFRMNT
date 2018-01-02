



//This could be usefull
// Mongoose will not automatically lowercase the email in your queries, so Person.find({ email: 'Val@karpov.io' }) would return no results. Use the runSettersOnQuery option to turn on this behavior:

// var personSchema = new Schema({
//   email: {
//     type: String,
//     lowercase: true
//   }
// }, { runSettersOnQuery: true });

// For legacy reasons, mongoose stores object keys in reverse order on initial
// save. That is, { a: 1, b: 2 } will be saved as { b: 2, a: 1 } in
// MongoDB. To override this behavior, set
// the toObject.retainKeyOrder option
// to true on your schema.
//Post a comment to a bill


const db = require("../models");

//This should get a specific bill and return the necessary info to display the card but I haven't tested it yet
module.exports = {
  getBillById: function(req, res) {
  	db.Bill
  	.findById(req.params.id)
  	.populate('commentIds')
  	.sort({ date: -1 })
  	.then(function(err, bill) {
			if(err) {
				return handleError(err);
			}
		  let results = {
			  return (bill.title, bill.partySponsor, bill.date, bill.author, bill.body
			  	//Don't think this is quite right;
			  	// bill.commentIds.map(function(comment) {
			  	// 	return (bill.commentIds.body);
			  	// });
			  )
			}
		});
	},

  getUserById: function(req, res) {
    db.User
      .findById(req.params.id)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },

  createUser: function(req, res) {
    db.User
      .create(req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },

  updateUserTopics: function(req, res) {

  },

  removeSavedBill: function(req, res) {

  },

  createComment: function(req, res) {

  }
};