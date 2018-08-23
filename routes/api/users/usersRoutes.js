const router = require("express").Router();

// import formidable
var formidable = require("formidable");
var cloudinary = require("cloudinary");

require("dotenv").config();

// Requiring our models and passport as we've configured it
var db = require("../../../models");
var passport = require("../../../config/passport");

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

router
  .route("/")
  .get(function (req, res) {
    db.Users.findAll({}).
    then(function (userData) {
        // return 404 if no row was found, this means no data exists
        if (!userData) return res.status(404).end();

        console.log("# of api/users: " + userData.length);
        res.json(userData);
    });
  });

module.exports = router;

/*
module.exports = function(app) {
  var Sequelize = require("sequelize");
  const Op = Sequelize.Op;

  const MAX_NAME_LENGTH = 100;
  const MIN_PASS_LENGTH = 7;

  // ============================================================================
  // API GET ROUTES FOR USERS
  //
  // get all users
  app.get("/api/users", function (req, res) {
    db.Users.findAll({}).
    then(function (userData) {
        // return 404 if no row was found, this means no data exists
        if (!userData) return res.status(404).end();

        console.log("# of api/users: " + userData.length);
        res.json(userData);
    });

  });
*/

/*
  // get specific user by id
  app.get("/api/users/:id", function(req, res) {
    db.Users.findAll({"where": {"id": req.params.id}}).
    then(function (userData) {
      // return 404 if no row was found, this means id does not exist
      if (userData.length === 0) return res.status(404).end();

      res.json(userData);
    });
  });
*/

  // ============================================================================
  // API POST ROUTES FOR USERS
  //
  // Add Routes
  // post or insert
  // app.post("/api/users", function(req, res) {
    // var condition = "user_name = '" + req.body.user_name + "'";
    // console.log("in /api/users data: " + JSON.stringify(req.body));

    // db.Users.create(req.body).then(function(userData) {
    //  console.log("user_id " + userData.id + " created successfully");
    //  res.json(userData);
    // });

  // });

  // ========================================================================================
  // AUTHENTICATION SECTION
  //

  // Using the passport.authenticate middleware with our local strategy.
  // If the user has valid login credentials, send them to the members page.
  // Otherwise the user will be sent an error
  /*
  
  app.post("/api/login", passport.authenticate("local"), function (req, res) {
    // Since we're doing a POST with javascript, we can't actually redirect that post into a GET request
    // So we're sending the user back the route to the members page because the redirect will happen on the front end
    // They won't get this or even be able to access this page if they aren't authed
    console.log("logged in req.user id: " + req.user.id);
    // on successful login, route user is sent to is based on user_type
    if (req.user.user_type === "user") {
      console.log("normal user has signed in...");
      res.redirect("/");
    } else if (req.user.user_type === "Admin") {
      console.log("Administrator user has signed in...");
      res.redirect("/admin");
    }
  });
 */

  // Route for signing up a user. The user's password is automatically hashed and stored securely thanks to
  // how we configured our Sequelize User Model. If the user is created successfully, proceed to log the user in,
  // otherwise send back an error
  /*
  app.post("/api/signup/user", function (req, res) {
    var validName = false,
      validEmail = false,
      validPswd = false,
      pswdsMatch = false,
      signupSuccess = false,
      noDuplicateUserName = false,
      errorText = "";

    // Create a new instance of formidable to handle the request info
    var form = new formidable.IncomingForm();

    // parse information for form fields and incoming files
    form.parse(req, function (err, fields, files) {
      console.log(fields);
      console.log(files.photo);

      // validate front end input
      // check name validity
      if (hasAlpha(fields.firstName) && hasAlpha(fields.lastName) && 
      (fields.firstName + fields.lastName).length <= MAX_NAME_LENGTH) {
        validName = true;
      } else {
        errorText += "First Name does not not meet requirements.<br>";
        validName = false;
      }

      // check email validity
      if (validateEmail(fields.email)) {
        validEmail = true;
      } else {
        errorText += "Please enter valid email.<br />";
        validEmail = false;
      }

      // check password validity
      if (validatePassword(fields.password)) {
        validPswd = true;
      } else {
        errorText += "Please enter valid password. Must be at least " +
                    MIN_PASS_LENGTH +
                    " characters long and have at least one digit and one alphabetic character.<br />";
        validPswd = false;
      }

      // check if passwords match
      if (fields.password === fields.confirmPassword) {
        pswdsMatch = true;
      } else {
        errorText += "Passwords do not match. Please enter them again.<br />";
        pswdsMatch = false;
      }

      // TODO: check if email already exists in database
      db.Users.findOne({
        "where": {email: fields.email}
      }).then(function(dbUsers){
        if (dbUsers) {
          noDuplicateUserName = false;
          errorText += "Duplicate email.<br>";
        } else {
          noDuplicateUserName = true;
        }
        signupSuccess = validName && validEmail && validPswd && pswdsMatch && noDuplicateUserName
        ? true
        : false;
        if (!signupSuccess) {
          res.statusMessage = errorText;
          res.status(400).end();
         } else if (files.photo) {
            // upload file to cloudinary, which'll return an object for the new image
            cloudinary.uploader.upload(files.photo.path, function (result) {
            console.log(result);
            // create new user
            db.Users.create({
              user_name: fields.userName,
              first_name: fields.firstName,
              last_name: fields.lastName,
              email: fields.email,
              user_pw: fields.password,
              user_photo: result.secure_url
              // creating following lines to check admin functionality
              // ,
              // user_type: "Admin"
            }).then(function () {
              res.json(true);
              // res.json("/");
            }).catch(function (err) {
              console.log(err);
              res.json(err);
            });
          });
        } else {
          db.Users.create({
            user_name: fields.userName,
            email: fields.email,
            user_pw: fields.password,
            first_name: fields.firstName,
            last_name: fields.lastName
          }).then(function () {
            res.json(true);
            // res.redirect(307, "/api/login");
          }).catch(function (err) {
            console.log(err);
            res.json(err);
            // res.status(422).json(err.errors[0].message);
          });
        }
      });

    });

  });
 */

 /*
  // Route for logging user out
  app.get("/logout", function (req, res) {
    console.log("in logout");
    req.logout();
    res.redirect("/");
  });

  // Route for getting some data about our user to be used client side
  app.get("/api/user_data", function (req, res) {
    console.log("in api/user_data");
    if (!req.user) {
      // The user is not logged in, send back an empty object
      res.json({});
    } else {
      // Otherwise send back the user's email and id
      // Sending back a password, even a hashed password, isn't a good idea
      db.Users.findById(req.user.id).then(function(dbUser) {
        if (!dbUser) res.status(404).end();
        console.log("in /api/new_photo: " + dbUser.user_photo);
        // photo is set to dbUser.user_photo in order to handle an authenticated
        // user changing profile image since req.user.user_photo holds the photo
        // value retrieved at time of login
        res.json({
          email: req.user.email,
          id: req.user.id,
          user_name: req.user.user_name,
          photo: dbUser.user_photo,
          rank: req.user.user_type
        });
      });     
    }
  });
*/

/*
  // ----------------------------------------------------------------------------
  // Route for getting new photo
  // ----------------------------------------------------------------------------
  app.get("/api/new_photo", function (req,res) {
    db.Users.findById(req.user.id).then(function(dbUser) {
      if (!dbUser) res.status(404).end();
      console.log("in /api/new_photo: " + dbUser.user_photo);
      res.json({photo: dbUser.user_photo});
    });
  });
*/

  // ----------------------------------------------------------------------------
  // workaround put route for updating user profile
  // ----------------------------------------------------------------------------

/*
  app.put("/api/updateprofile/user/:id", function(req, res) {
    // Create a new instance of formidable to handle the request info
    var form = new formidable.IncomingForm(),
        idNum = parseInt(req.params.id, 10),
        validPswd = false,
        pswdsMatch = false,
        signupSuccess = false,
        errorText = "";

    // user can update password or photo
    console.log("in upate profile users id: " + idNum);

    console.log("myprofile req.body: " + JSON.stringify(req.body));

    form.parse(req, function (err, fields, files) {
      // validate new password
      if (validatePassword(fields.newPassword)) {
        validPswd = true;
      } else {
        errorText += "Please enter valid password. Must be at least " +
                    MIN_PASS_LENGTH +
                    " characters long and have at least one digit and one alphabetic character.<br />";
        validPswd = false;
      }

      // check if to see if newPassword matches confirmNewPassword
      if (fields.newPassword === fields.confirmNewPassword) {
        pswdsMatch = true;
      } else {
        errorText += "Passwords do not match. Please enter them again.<br />";
        pswdsMatch = false;
      }

      signupSuccess = validPswd && pswdsMatch ? true : false;

      if (!signupSuccess) {
        res.statusMessage = errorText;
        res.status(400).end();
      } else if (files.photo) {
        // upload file to cloudinary, which'll return an object for the new image
        cloudinary.uploader.upload(files.photo.path, function (result) {
          console.log(result);
          // create new user
          db.Users.update({
            user_pw: fields.newPassword,
            user_photo: result.secure_url
            }, {where: {id: idNum}}).then(function (data) {
              res.json(true);
            }).catch(function (err) {
              console.log(err);
              res.json(err);
            });
          });
      } else {
        // no photo updated just update password
        db.Users.update({
          user_pw: fields.newPassword
        }, {where: {id: idNum}}).then(function (data) {
          res.json(true);
          // res.redirect(307, "/api/login");
        }).catch(function (err) {
          console.log(err);
          res.json(err);
          // res.status(422).json(err.errors[0].message);
        });
      }

    });

  });
*/

/*
    // =============================================================================
    // HELPER validation functions
    // -----------------------------------------------------------------------------
    // hasAlpha() checks if a string has at least one alphabetic character, lower
    // or upper case
    //
    function hasAlpha(str) {
      return str.match(/[a-z]/i);
    }

    // -----------------------------------------------------------------------------
    // hasNum() checks if a string has at least one numeric character
    //
    function hasNum(str) {
      return str.match(/\d+/g);
    }

    // -----------------------------------------------------------------------
    // validateEmail() checks if an email is valid
    // source code for regular expression:
    // https://stackoverflow.com/questions/46155/how-to-validate-an-email-address-in-javascript/1373724#1373724
    //
    function validateEmail(email) {
      var re = /^(?:[a-z0-9!#$%&amp;'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&amp;'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])$/;

      return re.test(email);
    }

    // -----------------------------------------------------------------------------
    // validatePassword() checks for password validity, the password must
    // be greater than MinPassLength, have alpha characters and at least one digit
    //
    function validatePassword(pswd) {
      if (pswd.length >= MIN_PASS_LENGTH && hasAlpha(pswd) && hasNum(pswd)) {
        return true;
      }

      return false;
    }

};
*/