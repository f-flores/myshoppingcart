// =============================================================
// 
// File name: server.js
// Description: server for myshopping cart
//
// =============================================================

// Dependencies
// =============================================================
var express = require("express");
var bodyParser = require("body-parser");
let mysql2 = require("mysql2");
var session = require("express-session");
let MySQLStore = require("express-mysql-session")(session);

// var moment = require("moment");
const logger = require("morgan");
const	fs = require("fs");
var path = require("path");
let routes = require("./routes");

require("dotenv").config();

// Requiring passport as we've configured it
var passport = require("./config/passport");

// Express App & Parser Setup
// =============================================================
var app = express();
var PORT = process.env.PORT || 3001;

// =======================================================================
// MIDDLEWARE
// =======================================================================
// Use morgan logger for logging requests
var accessLogStream = fs.createWriteStream(path.join(__dirname, "access.log"), {
	"flags": "a"
});

//  Have morgan output to access.log file and to console
app.use(logger("common", {
	"stream": accessLogStream
}));
app.use(logger("dev"));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

let options = {
  host: process.env.JAWS_HOST || "localhost",
  port: 3306,
  user: process.env.JAWS_UNAME || process.env.DBUSER,
  password: process.env.JAWS_PSWRD || process.env.DBPW,
  database: process.env.JAWS_DB || process.env.DBDEV
};

let sessionStore = new MySQLStore(options);

app.use(session({
                  secret: "keyboard cat",
                  resave: true,
                  saveUninitialized: true,
                  store: sessionStore 
                }));
app.use(passport.initialize());
app.use(passport.session());

// Setup Handlebars View Engine
// =============================================================
/* var exphbs = require("express-handlebars");
app.set("view engine", "handlebars");
app.engine("handlebars", exphbs({
    "defaultLayout": "main",
    // handlebars 'helpers' functions not used yet but may come in handy
    // later, addOne is a sample handlebar helper function, not used yet
    "helpers": {
      // not used yet
      "addOne": (value) => parseInt(value, 10) + 1,
      // formates timestamp date into DD, MM NN, YYYY  HH:MM format
      // example Monday, May 21, 2018 5:41 PM
      "fmtDate": (date) => moment(date).format("LLLL")
    }
  })); */


// Database & Static Directory
// =============================================================
var db = require("./models");

// Serve Static Assets On Live (e.g.  Heroku)
// =============================================================
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
} else {
  app.use(express.static("public"));
}

// API Routes
// =============================================================
app.use(routes);

// Send All Requests To React App
// =============================================================
app.get("*", function(req, res) {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});


// Routes
// =============================================================
// require("./routes/html-routes.js")(app);
// require("./routes/topics-api-routes.js")(app);
// require("./routes/api")(app);
// require("./routes/auth")(app);
// require("./routes/choices-api-routes.js")(app);

// Syncing DB & Start Express
// =============================================================
db.sequelize.sync({ force: false }).then(function() {
    app.listen(PORT, function() {
        console.log("==> 🌎   App listening on PORT %s, http://localhost:%s ", PORT, PORT);
    });
});