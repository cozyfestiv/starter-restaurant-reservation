const service = require('./tables.service');
const hasProperties = require('../errors/hasProperties');
const asyncErrorBoundary = require('../errors/asyncErrorBoundary');
const { read } = require('../reservations/reservations.service');

async function list (req, res) {
  const data = await service.list();
  res.json({ data });
}

async function create (req, res) {
  const newTable = await service.create(req.body.data);
  res.status(201).json({
    data: newTable[0]
  });
}

const VALID_PROPERTIES = ['table_name', 'capacity', 'reservation_id'];

function hasOnlyValidProperties (req, res, next) {
  const { data = {} } = req.body;
  res.locals.tables = req.body.data;

  const invalidFields = Object.keys(data).filter(field => {
    !VALID_PROPERTIES.includes(field);
  });
  if (invalidFields.length)
    return next({
      status: 400,
      message: `Invalid field(s): ${invalidFields.join(',')}`
    });
  next();
}

function validTableName (req, res, next) {
  const { table_name } = req.body.data;
  if (table_name.length <= 1) {
    return next({
      status: 400,
      message: 'table_name is invalid.'
    });
  }
  next();
}

function validCapacity (req, res, next) {
  const { capacity } = res.locals.table;
  const { people } = res.locals.reservation;
  if (capacity < people) {
    return next({
      status: 400,
      message: 'Table capacity is not sufficient to seat the party.'
    });
  }
  next();
}

const hasRequiredProperties = hasProperties('table_name', 'capacity');

function capacityIsNumber (req, res, next) {
  const { capacity } = req.body.data;
  if (Number.isInteger(capacity)) {
    return next();
  } else {
    return next({
      status: 400,
      message: `capacity field is not formatted correctly. ${capacity} must be a number`
    });
  }
}

module.exports = {
  list: asyncErrorBoundary(list),
  create: [
    hasOnlyValidProperties,
    hasRequiredProperties,
    validTableName,
    capacityIsNumber,
    asyncErrorBoundary(create)
  ]
};
