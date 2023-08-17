/**
 * Knex configuration file.
 *
 * You will not need to make changes to this file.
 */

require('dotenv').config();
const path = require('path');

const {
  DATABASE_URL = 'postgres://qnwauhxr:t8DMleB9hv4paCXmEN_wIiF39-h767Bu@batyr.db.elephantsql.com/qnwauhxr',
  DATABASE_URL_DEVELOPMENT = 'postgres://ssedubwz:J9XZ3mzzJrOt1lfq08rLnpJYaI-l0myz@batyr.db.elephantsql.com/ssedubwz',
  DATABASE_URL_TEST = 'postgres://ycqyryik:dLs9F4ecNeo5PidssdPFmePbTnnfjzHp@batyr.db.elephantsql.com/ycqyryik',
  DATABASE_URL_PREVIEW = 'postgres://sxoubqsi:UQNStg_gIc_hHKe0zwTx9IHkt0WcbzM5@batyr.db.elephantsql.com/sxoubqsi',
  DEBUG
} = process.env;

module.exports = {
  development: {
    client: 'postgresql',
    pool: { min: 1, max: 5 },
    connection: DATABASE_URL_DEVELOPMENT,
    migrations: {
      directory: path.join(__dirname, 'src', 'db', 'migrations')
    },
    seeds: {
      directory: path.join(__dirname, 'src', 'db', 'seeds')
    },
    debug: !!DEBUG
  },
  test: {
    client: 'postgresql',
    pool: { min: 1, max: 5 },
    connection: DATABASE_URL_TEST,
    migrations: {
      directory: path.join(__dirname, 'src', 'db', 'migrations')
    },
    seeds: {
      directory: path.join(__dirname, 'src', 'db', 'seeds')
    },
    debug: !!DEBUG
  },
  preview: {
    client: 'postgresql',
    pool: { min: 1, max: 5 },
    connection: DATABASE_URL_PREVIEW,
    migrations: {
      directory: path.join(__dirname, 'src', 'db', 'migrations')
    },
    seeds: {
      directory: path.join(__dirname, 'src', 'db', 'seeds')
    },
    debug: !!DEBUG
  },
  production: {
    client: 'postgresql',
    pool: { min: 1, max: 5 },
    connection: DATABASE_URL,
    migrations: {
      directory: path.join(__dirname, 'src', 'db', 'migrations')
    },
    seeds: {
      directory: path.join(__dirname, 'src', 'db', 'seeds')
    },
    debug: !!DEBUG
  }
};
