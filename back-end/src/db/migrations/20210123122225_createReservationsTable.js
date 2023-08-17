exports.up = function (knex) {
  return knex.schema.createTable('reservations', table => {
    table.increments('reservation_id').primary();
    table.string('first_name').notNullable();
    table.string('last_name').notNullable();
    table.string('mobile_number').notNullable();
    table.date('reservations_date').notNullable();
    table.time('reservation_time').notNullable();
    table.integer('people').notNullable().defaultTo(1);
    table.timestamps(true, true);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('reservations');
};
