const mongoose = require("mongoose");
//$ npm install git://github.com/RGBboy/mongoose-validate.git
const validate = require("mongoose-validate");

// Save a reference to the Schema constructor
const Schema = mongoose.Schema;

//Every time someone either saves or comments on a bill, we create a new bill document in the collection

//We can use custom validators using regex or try the above library

const billSchema = new Schema({
  title: { 
    type: String, 
    required: true
  },
  author: {
    type: String, 
    required: true,
    default: "Unknown author"
  },
  body: { 
    type: String, 
    required: true
  },
  date: {
    type: Date,
  },
  partySponsor: {
    type: String,
  },
  commentIds: {
    type: [],
    required: false
  },
  voteCount: {
    type: Number
  }
});
const Bill = mongoose.model("Bill", billSchema);
module.exports = Bill;







const topicsSchema = new Schema ({
  topic: {
    title
  }
})

