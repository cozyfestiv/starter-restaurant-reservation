const { generator } = require('../reservationGenerator');
const reservationsData = generator(500);

exports.seed = function (knex) {
  console.log('Seeding...');
  return knex
    .raw('TRUNCATE TABLE reservations RESTART IDENTITY CASCADE')
    .then(function () {
      console.log('Table truncated. Inserting data...');
      return knex('reservations').insert(reservationsData);
    })
    .then(() => {
      console.log('Seed completed successfully.');
    })
    .catch(error => {
      console.error('Seed failed with error:', error);
    });
};
