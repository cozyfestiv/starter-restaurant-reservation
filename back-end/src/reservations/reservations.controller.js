const service = require('./reservations.service');
const hasProperties = require('../errors/hasProperties');
const asyncErrorBoundary = require('../errors/asyncErrorBoundary');

const VALID_PROPERTIES = [
  'first_name',
  'last_name',
  'mobile_number',
  'reservation_date',
  'reservation_time',
  'people',
  'status',
  'reservation_id',
  'created_at',
  'updated_at'
];

async function reservationExists (req, res, next) {
  const { reservation_id } = req.params;
  const reservation = await service.read(reservation_id);
  if (reservation) {
    res.locals.reservation = reservation;
    return next();
  }
  next({
    status: 404,
    message: `Reservation does not exist: ${reservation_id}`
  });
}

async function list (req, res) {
  const { date, mobile_number } = req.query;
  if (date) {
    res.json({
      data: await service.listByDate(date)
    });
  } else if (mobile_number) {
    res.json({ data: await service.search(mobile_number) });
  } else {
    res.json({ data: await service.list });
  }
}

function read (req, res) {
  const { reservation } = res.locals;
  res.json({ data: reservation });
}

async function create (req, res) {
  const newReservation = await service.create(req.body.data);
  res.status(201).json({
    data: newReservation[0]
  });
}

//MIDDLEWARE

module.exports = {
  list,
  read: [reservationExists, read],
  create: asyncErrorBoundary(create)
};
