// ==========================================================
//
// userController.js
//
// ==========================================================

require("dotenv").config();

const Const = require("../helpers/siteConstants");
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
    noDuplicateUserName = false,
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
      // db.createUser(req, res)
      if (vlib.validateEmail(req.body.email)) {
        signupSuccess = true;
      } else {
        errorText += "Please enter valid email.<br />";
        signupSuccess = false;
      }

      // check password validity
      if (vlib.validatePassword(req.body.user_pw)) {
        signupSuccess = true;
      } else {
        errorText += "Please enter valid password. Must be at least " +
                    Const.MIN_PASSWORD_LENGTH +
                    " characters long and have at least one digit and one alphabetic character.<br />";
        signupSuccess = false;
      }

      // check if passwords match
      if (req.body.user_pw === req.body.confirm_pwd) {
        signupSuccess = true;
      } else {
        errorText += "Passwords do not match. Please enter them again.<br />";
        signupSuccess = false;
      }

      // TODO: check if email already exists in database
      db.Users.findOne({
        "where": {email: req.body.email}
      }).then(function(dbUsers){
        if (dbUsers) {
          noDuplicateUserName = false;
          errorText += "Duplicate email.<br>";
        } else {
          noDuplicateUserName = true;
        }

        if (!signupSuccess) {
          res.statusMessage = errorText;
          res.status(400).end();
        } else if (files) {
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

   // });

    }
};

