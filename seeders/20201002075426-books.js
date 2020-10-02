'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */

    await queryInterface.bulkInsert('books', [
      {
        title: 'Witcher',
        reference: 'WTZ-14-IPA',
        category: 'roman',
        writtingDate: (new Date((new Date()).getTime() - Math.random(10000000))).toLocaleDateString(),
        editionDate: (new Date((new Date()).getTime() - Math.random(100000))).toLocaleDateString(),
        createdAt: (new Date((new Date()).getTime())).toLocaleDateString(),
        updatedAt: (new Date((new Date()).getTime())).toLocaleDateString()
      },
      {
        title: 'Block',
        reference: 'GYU-12-OPA',
        category: 'roman',
        writtingDate: (new Date()).toLocaleDateString((new Date()).getTime() - Math.random(10000000)),
        editionDate: (new Date()).toLocaleDateString((new Date()).getTime() - Math.random(100000)),
        createdAt: (new Date()).toLocaleDateString((new Date()).getTime()),
        updatedAt: (new Date()).toLocaleDateString((new Date()).getTime())
      },
      {
        title: 'Lumière',
        reference: 'LIM-85-WOW',
        category: 'science',
        writtingDate: (new Date()).toLocaleDateString((new Date()).getTime() - Math.random(10000000)),
        editionDate: (new Date()).toLocaleDateString((new Date()).getTime() - Math.random(100000)),
        createdAt: (new Date()).toLocaleDateString((new Date()).getTime()),
        updatedAt: (new Date()).toLocaleDateString((new Date()).getTime())
      },
      {
        title: 'Kolpa',
        reference: 'POL-14-DAL',
        category: 'roman',
        writtingDate: (new Date()).toLocaleDateString((new Date()).getTime() - Math.random(10000000)),
        editionDate: (new Date()).toLocaleDateString((new Date()).getTime() - Math.random(100000)),
        createdAt: (new Date()).toLocaleDateString((new Date()).getTime()),
        updatedAt: (new Date()).toLocaleDateString((new Date()).getTime())
      },
      {
        title: 'Dictionnaire',
        reference: 'DIC-24-KLO',
        category: 'dictionnaire',
        writtingDate: (new Date()).toLocaleDateString((new Date()).getTime() - Math.random(10000000)),
        editionDate: (new Date()).toLocaleDateString((new Date()).getTime() - Math.random(100000)),
        createdAt: (new Date()).toLocaleDateString((new Date()).getTime()),
        updatedAt: (new Date()).toLocaleDateString((new Date()).getTime())
      }
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
