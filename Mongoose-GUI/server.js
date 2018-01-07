var express = require("express");
var bodyParser = require("body-parser");
var logger = require("morgan");
var mongoose = require("mongoose");

var PORT = 3000;

// Require all models
var db = require("./models");

// Initialize Express
var app = express();

// Configure middleware

// Use morgan logger for logging requests
app.use(logger("dev"));
// Use body-parser for handling form submissions
app.use(bodyParser.urlencoded({ extended: false }));
// Use express.static to serve the public folder as a static directory
app.use(express.static("public"));

//require("./routes/html_routes.js")(app);
// require("./routes/comment-api-routes.js")(app);
// require("./routes/user-api-routes.js")(app);
//require("./routes/bill_api_routes.js")(app);
// Set mongoose to leverage built in JavaScript ES6 Promises
// Connect to the Mongo DB
mongoose.Promise = Promise;
mongoose.connect("mongodb://localhost/iNFRMNT", {
  useMongoClient: true
});


// When the server starts, create and save a new User document to the db
// The "unique" rule in the User model's schema will prevent duplicate users from being added to the server
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

// Create new User
app.post("/createuser", function(req, res) {
  //console.log (req.body);
  db.User
    .create(req.body)
    .then(function(dbUser) {
      console.log(dbUser);
        // If the User was created successfully, send it back to the client
      res.json(dbUser);
    })
    .catch(function(err) {
      console.log(err.message);
    });
});

// Find all Users
app.get("/users", function(req, res) {

  db.User
    .find({})
    .then(function(dbUser) {
      // If all Users are successfully found, send them back to the client
      res.json(dbUser);
    })
    .catch(function(err) {
      // If an error occurs, send the error back to the client
      res.json(err);
    });
});

// Get all users with their bills
app.get("/populatedusers", function(req, res) {
  // Find all users
  db.User
    .find({})
    // Specify that we want to populate the retrieved users with any associated comments
    .populate('bills')
    .then(function(dbUser) {
      // If able to successfully find and associate all Users and Comments, send them back to the client
      res.json(dbUser);
    })
    .catch(function(err) {
      // If an error occurs, send it back to the client
      res.json(err);
    });
});

// Get a specific user
app.get("/singleuser", function(req, res) {
  console.log(req.query);
  db.User
    .find({
      "_id": req.query.id
    })
    // Specify that we want to populate the retrieved users with any associated comments
    .populate('bills')
    .then(function(dbUser) {
      // If able to successfully find and associate all Users and Comments, send them back to the client
      res.json(dbUser);
    })
    .catch(function(err) {
      // If an error occurs, send it back to the client
      res.json(err);
    });
});


// Comments

// Get all comments
app.get("/comments", function(req, res) {
  db.Comment
    .find({})
    .then(function(dbComment) {
      res.json(dbComment);
    })
    .catch(function(err) {
      res.json(err);
    });
});

// Save a new comment
app.post("/savecomment", function(req, res) {
  // Create a new Comment in the db
  console.log(req.body);
  db.Comment
    .create(req.body)
    .then(function(dbComment) {
      
    return db.Bill.findOneAndUpdate({}, { $push: { comments: dbComment._id } }, { new: true })
    })
    .then(function(dbBill) {
      // If the User was updated successfully, send it back to the client
      res.json(dbBill);
    })
    .catch(function(err) {
      // If an error occurs, send it back to the client
      res.json(err);
    });
});

// Bills

// Get all Bills
app.get("/bills", function(req, res) {
  db.Bill
    .find({})
    .then(function(dbBill) {
      res.json(dbBill);
    })
    .catch(function(err) {
      res.json(err);
    });
});

// Get all bills with their comments 
app.get("/populatedbills", function(req, res) {

  db.Bill
    .find({})
    .populate("comments")
    .then(function(dbUser) {
      res.json(dbUser);
    })
    .catch(function(err) {
      res.json(err);
    });
});

// Get a specific bill with its comments
app.get("/singlebill", function(req, res) {
  // console.log(req.query);
  db.Bill
    .find({
      "_id": req.query.id
    })
    // Specify that we want to populate the retrieved users with any associated comments
    .populate('comments')
    .then(function(dbBill) {
      // If able to successfully find and associate all Users and Comments, send them back to the client
      res.json(dbBill);
    })
    .catch(function(err) {
      // If an error occurs, send it back to the client
      res.json(err);
    });
});
// Save bill (should happen on comment or save)
app.post("/savebill", function(req, res) {
  //console.log(req.body);
  db.Bill
    .create(req)
    .then(function(dbBill) {
      console.log(dbBill);
      return db.User.findOneAndUpdate({
        "_id": req.body.user
      }, { $push: { savedBills: dbBill._id } }, { new: true });
    })
    .then(function(dbUser) {
      // If the User was updated successfully, send it back to the client
      res.json(dbUser);
    })
    .catch(function(err) {
      // If an error occurs, send it back to the client
      res.json(err);
    });
});

// Topic

// app.post("/saveTopic", function(req, res) {
//   //console.log(req.body);

//   db.User
//     db.User.findOneAndUpdate({
//         "_id": req.body.user
//       }, { $push: { topics: topic } }, { new: true });
//     })
//     .then(function(dbUser) {
//       // If the User was updated successfully, send it back to the client
//       res.json(dbUser);
//     })
//     .catch(function(err) {
//       // If an error occurs, send it back to the client
//       res.json(err);
//     });

// Start the server
app.listen(PORT, function() {
  console.log("App running on port " + PORT + "!");
});
