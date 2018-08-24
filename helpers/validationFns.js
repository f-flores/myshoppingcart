// =============================================================================
// HELPER validation functions
// =============================================================================

  const CONSTS = require("./siteConstants.js");

  module.exports = {
    // -----------------------------------------------------------------------------
    // hasAlpha() checks if a string has at least one alphabetic character, lower
    // or upper case
    //
    hasAlpha: function(str) {
      return str.match(/[a-z]/i);
    },

    // -----------------------------------------------------------------------------
    // hasNum() checks if a string has at least one numeric character
    //
    hasNum: function(str) {
      return str.match(/\d+/g);
    },

    // -----------------------------------------------------------------------
    // validateEmail() checks if an email is valid
    // source code for regular expression:
    // https://stackoverflow.com/questions/46155/how-to-validate-an-email-address-in-javascript/1373724#1373724
    //
    validateEmail: function(email) {
      let re = /^(?:[a-z0-9!#$%&amp;'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&amp;'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])$/;

      return re.test(email);
    },

    // -----------------------------------------------------------------------------
    // validatePassword() checks for password validity, the password must
    // be greater than MinPassLength, have alpha characters and at least one digit
    //
    validatePassword: function(pswd) {
      console.log(CONSTS.MIN_PASSWORD_LENGTH);
      return (pswd.length >= CONSTS.MIN_PASSWORD_LENGTH && this.hasAlpha(pswd) && this.hasNum(pswd)) ? true : false;
    }
  };