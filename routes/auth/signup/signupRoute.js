const router = require("express").Router();
require("dotenv").config();

// Requiring our models and passport as we've configured it
var db = require("../../../controllers/userController");
var passport = require("../../../config/passport");

// For "/auth/signup"
router
  .route("/")
  .get(function(req, res) {console.log("alksdfjioe")})
  .post(function(req, res) {db.createUser(req, res);})


// For "/auth/signup/user"
router
  .route("/user")
//    .post(function(req, res) {db.createUser(req, res);})
//  .put(function(req, res) {db.update(req, res);})

module.exports = router;