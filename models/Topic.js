const mongoose = require("mongoose");
//$ npm install git://github.com/RGBboy/mongoose-validate.git
const validate = require("mongoose-validate");

// Save a reference to the Schema constructor
const Schema = mongoose.Schema;

const topicsSchema = new Schema ({
  topic: {
    type: String,
    required: true
  }
})

const Topic = mongoose.model("Topic", topicSchema);
module.exports = Topic;