const mongoose = require("mongoose");
//$ npm install git://github.com/RGBboy/mongoose-validate.git
const User = require("./User");
const Bill = require("./Bill");
//const validate = require("mongoose-validate");

// Save a reference to the Schema constructor
const Schema = mongoose.Schema;

const commentSchema = new Schema({
  authorId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  billId: {
    type: mongoose.Schema.ObjectId,
    ref: 'Bill',
    required: true
  }, 
  timeStamp: {
    type: Date,
    default: Date.now
  },
  body: {
    type: String,
    required: true,
  },
  initial: {
    type: Boolean,
    default: true
  },
  voteCount: {
    type: Number
  }
});
const Comment = mongoose.model("Comment", commentSchema);
module.exports = Comment;
