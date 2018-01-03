const mongoose = require("mongoose");
const db = require("../../models");
mongoose.Promise = global.Promise;

// This file empties the Books collection and inserts the books below

mongoose.connect(
  process.env.MONGODB_URI || "mongodb://localhost/reactreadinglist",
  {
    useMongoClient: true
  }
);

const userSeed = [
  {
    username: "Rachel",
    password: "qwerty1",
    email: "me@gmail.com",
    zipcode: 44072,
    savedBills: [],
    comments: [],
    savedTopics: []
  },
  {
    username: "Zoli",
    password: "qwerty2",
    email: "me@gmail.com",
    zipcode: 44118,
    savedBills: [],
    comments: [],
    savedTopics: []
  },
  {
    username: "Mike",
    password: "querty3",
    email: "me@gmail.com",
    zipcode: 44072,
    savedBills: [],
    comments: [],
    savedTopics: []
  }
];

db.User
  .remove({})
  .then(() => db.User.collection.insertMany(userSeed))
  .then(data => {
    console.log(data.insertedIds.length + " records inserted!");
    process.exit(0);
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });