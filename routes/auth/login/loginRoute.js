const router = require("express").Router();
require("dotenv").config();

// Requiring our models and passport as we've configured it
var db = require("../../../controllers/userController");
var passport = require("../../../config/passport");

// For "/auth/login"
router
  .route("/")
  .post(passport.authenticate("local"), function(req, res) {
    // Log in and send back user information
    res.json({
      user_name: req.user.user_name,
      email: req.user.email,
      user_type: req.user.user_type,
      user_id: req.user.id
    });
  })
  .get(function(req, res) {
    // Check to see if user is logged in
    console.log(req.user);
    if (req.user) {
      // If logged in, send back this flag and the username itself
      res.json({
        isLoggedIn: true,
        email: req.user.email,
        user_type: req.user.user_type
      });
    } else {
      // If user isn't logged in, send back false
      res.json({isLoggedIn: false});
    }
  })


// For "/auth/login/user"
// router
//  .route("/user")
//    .post(function(req, res) {db.createUser(req, res);})
//  .put(function(req, res) {db.update(req, res);})

module.exports = router;