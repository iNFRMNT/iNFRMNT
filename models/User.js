const mongoose = require("mongoose");
//$ npm install git://github.com/RGBboy/mongoose-validate.git
const validate = require("mongoose-validate");

// Save a reference to the Schema constructor
const Schema = mongoose.Schema;

const userSchema = new Schema ({
  username: {
    type: String,
    trim: true, 
    required: true,
    unique: true
  },
  password: {
    type: String,
    trim: true,
    required: true,
    minlength: 6,
    maxlength: 20
  },
  email: {
    type: String,
    required: true, 
    validate: [validate.email, 'invalid email address']
  },
  zipcode: {
    type: String,
    required: true,
    validate: [validate.postalCode, 'invalid zipcode']
  },
  savedBillIds: [{
    type: Mongoose.Schema.ObjectId,
    ref: 'Bill'
  }],
  commentIds: [{
    type: Mongoose.Schema.ObjectId,
    ref: 'Comment'
  }],
  savedTopics: [{
    type: String,
  }]
});
const User = mongoose.model("User", userSchema);
module.exports = User;
