const knex = require('../db/connection');

function list () {
  return knex('tables').select('*').orderBy('table_name');
}

function create (newTable) {
  return knex('tables').insert(newTable).returning('*');
}

function update (updatedTable) {
  return knex('tables')
    .select('*')
    .where({ table_id: updatedTable.table_id })
    .update(updatedTable, '*');
}

function read (table_id) {
  return knex('tables').select('*').where({ table_id: table_id }).first();
}

function finish (table_id, reservation_id) {
  return knex.transaction(trx => {
    return knex('reservations')
      .transacting(trx)
      .where({ reservation_id: reservation_id })
      .update({ status: 'finished' })
      .returning('*')
      .then(() => {
        return knex('tables')
          .where({ table_id: table_id })
          .update({ reservation_id: null })
          .returning('*');
      })
      .then(trx.commit)
      .catch(trx.rollback);
  });
}

module.exports = {
  list,
  create,
  update,
  read
};
