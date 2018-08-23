const router = require("express").Router();
require("dotenv").config();

// Requiring our models and passport as we've configured it
var db = require("../../../models");
var passport = require("../../../config/passport");

// For "/auth/signup"
router
  .route("/")
  .get(function(req, res) {console.log("alksdfjioe")})
 // .post(function(req, res) {db.create(req, res);})


// For "/auth/signup/:id"
router
  .route("/:id")
  .put(function(req, res) {db.update(req, res);})

module.exports = router;