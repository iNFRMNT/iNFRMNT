const mongoose = require("mongoose");
//$ npm install git://github.com/RGBboy/mongoose-validate.git
//const validate = require("mongoose-validate");
// const Bill = require("./Bill");
// const Comment = require("./Comment");

// Save a reference to the Schema constructor
let Schema = mongoose.Schema;

const userSchema = new Schema ({
  userName: {
    type: String,
    trim: true, 
    //required: true
    unique: true
  },
  password: {
    type: String,
    trim: true,
    //required: true,
    // minlength: 6,
    // maxlength: 20
  },
  email: {
    type: String,
    //required: true
    //validate: [validate.email, 'invalid email address']
  },
  zipcode: {
    type: String,
    required: true
    //validate: [validate.postalCode, 'invalid zipcode']
  },
  savedBills: [{
    type: Schema.Types.ObjectId,
    ref: 'Bill'
  }],
  comments: [{
    type: Schema.Types.ObjectId,
    ref: 'Comment'
  }],
  savedTopics: [{
    type: String
  }]
});
const User = mongoose.model("User", userSchema);
module.exports = User;
