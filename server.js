const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const routes = require("./routes");
const app = express();
const PORT = process.env.PORT || 3001;

// Configure body parser for AJAX requests
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// Serve up static assets
app.use(express.static("client/build"));
// Add routes, both API and view
app.use(routes);

// Set up promises with mongoose
mongoose.Promise = global.Promise;
// Connect to the Mongo DB
mongoose.connect(
  process.env.MONGODB_URI || "mongodb://localhost/iNFRMNT",
  {
    useMongoClient: true
  }
);

// Start the API server
app.listen(PORT, function() {
  console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
});
// db.iNFRMNT
// db.User
//   .create({
//     userName: "Rachel",
//     password: "1",
//     email: "1",
//     zipcode: "11111"
//    })
//   .then(function(dbUser) {
//     console.log(dbUser);
//   })
//   .catch(function(err) {
//     console.log(err.message);
//   });

// db.User
//   .create({
//     userName: "Me",
//     password: "2",
//     email: "2",
//     zipcode: "22222"
//    })
//   .then(function(dbUser) {
//     console.log(dbUser);
//   })
//   .catch(function(err) {
//     console.log(err.message);
//   });
// var express = require("express");
// var bodyParser = require("body-parser");
// var logger = require("morgan");
// var mongoose = require("mongoose");

// var PORT = 3000;

// // Require all models
// var db = require("./models");

// // Initialize Express
// var app = express();

// // Configure middleware

// // Use morgan logger for logging requests
// app.use(logger("dev"));
// // Use body-parser for handling form submissions
// app.use(bodyParser.urlencoded({ extended: false }));
// // Use express.static to serve the public folder as a static directory
// app.use(express.static("public"));

// //require("./routes/html_routes.js")(app);
// // require("./routes/comment-api-routes.js")(app);
// // require("./routes/user-api-routes.js")(app);
// //require("./routes/bill_api_routes.js")(app);
// // Set mongoose to leverage built in JavaScript ES6 Promises
// // Connect to the Mongo DB
// mongoose.Promise = Promise;
// mongoose.connect("mongodb://localhost/iNFRMNT", {
//   useMongoClient: true
// });


// // When the server starts, create and save a new User document to the db
// // The "unique" rule in the User model's schema will prevent duplicate users from being added to the server
// // db.User
// //   .create({
// //     userName: "Rachel",
// //     password: "1",
// //     email: "1",
// //     zipcode: "11111"
// //    })
// //   .then(function(dbUser) {
// //     console.log(dbUser);
// //   })
// //   .catch(function(err) {
// //     console.log(err.message);
// //   });

// // db.User
// //   .create({
// //     userName: "Me",
// //     password: "2",
// //     email: "2",
// //     zipcode: "22222"
// //    })
// //   .then(function(dbUser) {
// //     console.log(dbUser);
// //   })
// //   .catch(function(err) {
// //     console.log(err.message);
// //   });

// // Create new User
// app.post("/createuser", function(req, res) {
//   //console.log (req.body);
//   db.User
//     .create(req.body)
//     .then(function(dbUser) {
//       console.log(dbUser);
//         // If the User was created successfully, send it back to the client
//       res.json(dbUser);
//     })
//     .catch(function(err) {
//       console.log(err.message);
//     });
// });

// // Find all Users
// app.get("/users", function(req, res) {

//   db.User
//     .find({})
//     .then(function(dbUser) {
//       // If all Users are successfully found, send them back to the client
//       res.json(dbUser);
//     })
//     .catch(function(err) {
//       // If an error occurs, send the error back to the client
//       res.json(err);
//     });
// });

// // Get all users with their bills
// app.get("/populatedusers", function(req, res) {
//   // Find all users
//   db.User
//     .find({})
//     .populate('savedBills')
//     .then(function(dbUser) {
//       res.json(dbUser);
//     })
//     .catch(function(err) {
//       // If an error occurs, send it back to the client
//       res.json(err);
//     });
// });

// // Get a specific user
// app.get("/singleuser", function(req, res) {
//   console.log(req.query);
//   db.User
//     .find({
//       "_id": req.query.id
//     })
//     .populate('savedBills')
//     .then(function(dbUser) {
//       res.json(dbUser);
//     })
//     .catch(function(err) {
//       res.json(err);
//     });
// });


// // Comments

// // Get all comments
// app.get("/comments", function(req, res) {
//   db.Comment
//     .find({})
//     .then(function(dbComment) {
//       res.json(dbComment);
//     })
//     .catch(function(err) {
//       res.json(err);
//     });
// });

// // Save a new comment
// app.post("/savecomment", function(req, res) {
//   console.log(req.body);
//   db.Comment
//     .create(req.body)
//     .then(function(dbComment) {
//       return db.Bill.findOneAndUpdate({
//         "_id": req.body.bill
//       }, { $push: { comments: {body: dbComment.body, userName: dbComment.author }}}, { new: true })
//     })
//     .then(function(dbBill) {
//       res.json(dbBill);
//     })
//     .catch(function(err) {
//       res.json(err);
//     });
// });

// // Bills

// // Get all Bills
// app.get("/bills", function(req, res) {
//   db.Bill
//     .find({})
//     .then(function(dbBill) {
//       res.json(dbBill);
//     })
//     .catch(function(err) {
//       res.json(err);
//     });
// });

// // Get all bills with their comments 
// app.get("/populatedbills", function(req, res) {

//   db.Bill
//     .find({})
//     .populate("comments")
//     .then(function(dbUser) {
//       res.json(dbUser);
//     })
//     .catch(function(err) {
//       res.json(err);
//     });
// });

// // Get a specific bill with its comments
// app.get("/singlebill", function(req, res) {
//   // console.log(req.query);
//   db.Bill
//     .find({
//       "_id": req.query.id
//     })
//     // Specify that we want to populate the retrieved users with any associated comments
//     .populate('comments')
//     .then(function(dbBill) {
//       // If able to successfully find and associate all Users and Comments, send them back to the client
//       res.json(dbBill);
//     })
//     .catch(function(err) {
//       // If an error occurs, send it back to the client
//       res.json(err);
//     });
// });
// // Save bill (should happen on comment or save)
// app.post("/savebill", function(req, res) {
//   console.log(req.body);
//   const userId = req.body.user;
//   const author = req.body.author;
//   const title = req.body.title;
//   const body = req.body.body;
//   const date = req.body.date;
//   const partySponsor = req.body.partySponsor;
//   const billObj = {author, title, body, date, partySponsor}
//   db.Bill
//     .create(billObj)
//     .then(function(dbBill) {
//       console.log(dbBill);
//       return db.User.findOneAndUpdate({
//         "_id": userId
//       }, { $push: { savedBills: dbBill._id } }, { new: true });
//     })
//     .then(function(dbUser) {
//       // If the User was updated successfully, send it back to the client
//       res.json(dbUser);
//     })
//     .catch(function(err) {
//       // If an error occurs, send it back to the client
//       res.json(err);
//     });
// });

// Start the API server
// app.listen(PORT, function() {
//   console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
// });
