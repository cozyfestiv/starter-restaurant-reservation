const { generator } = require('../reservationGenerator');
const reservationsData = generator(500);

exports.seed = function (knex) {
  return knex
    .raw('TRUNCATE TABLE reservations RESTART IDENTITY CASCADE')
    .then(function () {
      return knex('reservations').insert(reservationsData);
    });
};
