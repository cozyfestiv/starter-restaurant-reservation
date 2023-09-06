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
  return knex('reservations').select('*').where({ reservation_id }).first();
}

function update (updatedReservation) {
  return knex('reservations')
    .select('*')
    .where({ reservation_id: updatedReservation.reservation_id })
    .update(updatedReservation, '*');
}

function updateStatus (updatedReservation) {
  return knex('reservations')
    .where({ reservation_id: updatedReservation.reservation_id })
    .update({ status: updatedReservation.status })
    .returning('*');
}

function search (mobile_number) {
  return knex('reservations')
    .whereRaw(
      "translate(mobile_number, '() -', '') like ?",
      `%${mobile_number.replace(/\D/g, '')}%`
    )
    .orderBy('reservation_date');
}

module.exports = {
  list,
  listByDate,
  create,
  read,
  update,
  updateStatus,
  search
};
