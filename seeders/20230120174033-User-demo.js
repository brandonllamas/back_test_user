'use strict';

const { encriptPass } = require('../app/helpers/helper');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */

    await queryInterface.bulkInsert('users', [{
      first_name: 'Brandon',
      last_name: 'Llamas Larios',
      date_birth: new Date(),
      address: '222',
      password: await encriptPass("prueba132"),
      email:"brandonllamaslarios@gmail.com" ,
      mobile_phone:"2222" ,
    }], {});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
