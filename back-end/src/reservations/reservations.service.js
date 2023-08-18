const knex = require('../db/connection');

async function create (reservation) {
  reservation.status = 'booked';
  return await knex('reservations')
    .insert(reservation, '*')
    .then(response => response[0]);
}

async function listByDate (reservation_date) {
  return await knex('reservations')
    .where({ reservation_date })
    .whereNot({ status: 'finished' })
    .whereNot({ status: 'cancelled' })
    .orderBy('reservation_time', 'asc');
}

module.exports = {
  listByDate,
  create
};
