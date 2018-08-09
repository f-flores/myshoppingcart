'use strict';

module.exports = {

  up: (queryInterface, Sequelize) => {

    require("dotenv").config();

      return queryInterface.bulkInsert('Users', [
      {
        user_name: "ffflores",
        first_name: "Fabian",
        last_name: "Flores",
        email: "ffflores1@outlook.com",
        user_pw: "1234567",
        user_type: "Admin",
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        user_name: "User One",
        first_name: "User",
        last_name: "One",
        email: "user_one@example.com",
        user_pw: "1234567",
        user_type: "User",
        created_at: new Date(),
        updated_at: new Date()
      }, 
      {
        user_name: "User Two",
        first_name: "User",
        last_name: "Two",
        email: "user_two@example.com",
        user_pw: "1234567",
        user_type: "User",
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        user_name: "User Three",
        first_name: "User",
        last_name: "Three",
        email: "user_three@example.com",
        user_pw: "1234567",
        user_type: "User",
        created_at: new Date(),
        updated_at: new Date()
      },
    
    ], {});
  },



  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('Person', null, {});
    */
  }
};
