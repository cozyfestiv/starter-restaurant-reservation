const knex = require('../db/connection');

function list () {
  return knex('reservations')
    .select('*')
    .orderBy('reservation_date')
    .orderBy('reservation_time');
}

function listByDate (reservation_date) {
  return knex('reservations')
    .where({ reservation_date })
    .whereNot({ status: 'finished' })
    .whereNot({ status: 'cancelled' })
    .orderBy('reservation_time');
}

function create (reservation) {
  reservation.status = 'booked';
  return knex('reservations').insert(reservation).returning('*');
}

function read (reservation_id) {
  return knex('reservations')
    .select('*')
    .where({ reservation_id: reservation_id })
    .first();
}

function update (updatedReservation) {
  return knex('reservations')
    .select('*')
    .where({ reservation_id: updatedReservation.reservation_id })
    .update(updatedReservation, '*');
}

module.exports = {
  list,
  listByDate,
  create,
  read
};
