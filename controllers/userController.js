// ==========================================================
//
// userController.js
//
// ==========================================================

require("dotenv").config();

let CONSTS = require("../helpers/siteConstants");
const db = require("../models");
const passport = require("../config/passport");
const vlib = require("../helpers/validationFns");

var formidable = require("formidable");
var cloudinary = require("cloudinary");

cloudinary.config({
  "cloud_name": process.env.CLOUDINARY_NAME,
  "api_key": process.env.CLOUDINARY_API_KEY,
  "api_secret": process.env.CLOUDINARY_API_SECRET
});

let Sequelize = require("sequelize");
const Op = Sequelize.Op;



// Defining database authentication methods for User table
module.exports = {

  createUser: function(req, res) {
    // console.log(`max username length ${MAX_USERNAME_LENGTH}`);
    let signupSuccess = true,
    errorText = "";

    // Create a new instance of formidable to handle the request info
    const form = new formidable.IncomingForm();

    // parse information for form fields and incoming files
    // handler until cloudinary is integrated
    let files = null;
/*     form.parse(req, function (err, fields, files) {
      console.log(fields);
      console.log(files.photo); */

      // check email validity
      if (vlib.validateEmail(req.body.email) === false) {
        errorText += "Please enter valid email.  ";
        signupSuccess = false;
      }

      // check password validity
      if (vlib.validatePassword(req.body.user_pw) === false) {
        errorText += "Please enter valid password. Must be at least " +
                    CONSTS.MIN_PASSWORD_LENGTH +
                    " characters long and have at least one digit and one alphabetic character.  ";
        signupSuccess = false;
      }

      // check if passwords match
      if (req.body.user_pw !== req.body.confirm_pwd) {
        errorText += "Passwords do not match. Please enter them again.  ";
        signupSuccess = false;
      }

      // first signup check
      if (!signupSuccess) {
        res.statusMessage = errorText
        res.status(400).end(errorText)
      } 

      // check if user name or email already exists in database
      db.Users.findOne({
        "where": {user_name: req.body.user_name}
      })
      .then(function(dbUsers){
        if (dbUsers) {
          res.status(500).send({username: "User name already exists. Choose another."})
        }
      })
      .catch(function(err){
        res.status(400).send("Unable to process request")
      })

      db.Users.findOne({
        "where": {email: req.body.email}
      }).then(function(dbUsers){
        if (dbUsers) {
          res.status(500).send({email: "Duplicate email. Please choose different email."});
        } 
        
        if (files) {
          if (files.photo) {
            // upload file to cloudinary, which'll return an object for the new image
            cloudinary.uploader.upload(files.photo.path, function (result) {
            console.log(result);
            // create new user
            db.Users.create({
              user_name: fields.user_name,
              email: fields.email,
              user_pw: fields.password,
              user_photo: result.secure_url
              // creating following lines to check admin functionality
              // ,
              // user_rank: "Admin"
            }).then(function () {
              res.json(true);
              // res.json("/");
            }).catch(function (err) {
              console.log(err);
              res.json(err);
            });
          });
        }
        } else {
          db.Users.create({
            user_name: req.body.user_name,
            email: req.body.email,
            user_pw: req.body.user_pw,
          }).then(function(userData) {
            // TODO: add nodemailer here
            res.json({
              user_id: userData.id,
              user_name: userData.user_name,
              user_type: userData.user_type
            });
            // res.redirect(307, "/api/login");
          }).catch(function (err) {
            console.log(`hello: ${err}`);
            res.status(422).end("ok");
            // res.status(422).json(err.errors[0].message);
          });
        }
      });

    }
};

