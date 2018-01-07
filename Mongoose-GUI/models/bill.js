const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const billSchema = new Schema({
  author: {
    type: String, 
    //required: true,
    default: "Unknown author"
  },
  title: {
    type: String
    //required: true,
  },
  body: { 
    type: String
    //required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  partySponsor: {
    type: String
  },
  comments: [{
    type: Schema.Types.ObjectId,
    ref: 'Comment'
    //required: true
  }],
  voteCount: {
    type: Number
  }
});

const Bill = mongoose.model("Bill", billSchema);
module.exports = Bill;















