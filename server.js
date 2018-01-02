var express = require("express");
var bodyParser = require("body-parser");

// Sets up the Express App
// =============================================================
var app = express();
var PORT = process.env.PORT || 8080;

// Requiring our models for syncing
var db = require("./models");

// Sets up the Express app to handle data parsing
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

// Static directory
app.use(express.static("public"));

// Routes
// =============================================================
require("./routes/html_routes.js")(app);
require("./routes/post_api_routes.js")(app);
require("./routes/user_api_routes.js")(app);

// Syncing our sequelize models and then starting our Express app
// =============================================================

db.sequelize
.query('SET FOREIGN_KEY_CHECKS = 0', null, {raw: true})
.then(function(results) {
	db.sequelize.sync({force: true})
	.then(function() {
	  app.listen(PORT, function() {
	    console.log("App listening on PORT " + PORT);
	  });
	});
});

