import NotFound from '../layout/NotFound';
import Reservation from './Reservation';
import ErrorAlert from '../layout/ErrorAlert';

function ReservationList ({ reservations }) {
  const filteredReservations = reservations.filter(
    reservation =>
      reservation.status === 'booked' || reservation.status === 'seated'
  );
  if (!filteredReservations) {
    return <NotFound />;
  }

  const resList = filteredReservations.map(res => (
    <li key={res.reservation_id}>
      <Reservation
        key={res.reservation_id}
        reservation={res}
        reservationId={res.reservation_id}
      />
    </li>
  ));

  return (
    <>
      <ErrorAlert />
      <ul>{resList}</ul>
    </>
  );
}

export default ReservationList;
