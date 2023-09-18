import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { getTimeFormat } from '../utils/date-time';
import formatPhoneNumber from '../utils/format-phone-number.js';
import { updateReservationStatus } from '../utils/api';
import ErrorAlert from '../layout/ErrorAlert';

function Reservation ({ reservation }) {
  const {
    first_name,
    last_name,
    mobile_number,
    reservation_time,
    people,
    reservation_id,
    status
  } = reservation;

  const [cancelError, setCancelError] = useState(null);
  const history = useHistory();

  const formattedTime = getTimeFormat(reservation_time);
  const phoneNumber = formatPhoneNumber(mobile_number);

  const handleCancel = event => {
    event.preventDefault();
    if (
      window.confirm(
        'Do you want to cancel this reservation? This cannot be undone.'
      )
    ) {
      const abortController = new AbortController();
      setCancelError(null);

      updateReservationStatus(
        reservation_id,
        'cancelled',
        abortController.signal
      )
        .then(() => history.go(0))
        .catch(setCancelError);

      return () => abortController.abort();
    }
  };

  return (
    <div>
      <div>
        <h5>
          Reservation for: {first_name} {last_name}
        </h5>
        <p>Phone number: {phoneNumber}</p>
        <p>Time: {formattedTime}</p>
        <p>Party size: {people}</p>
        <div
          data-reservation-id-status={reservation_id}
        >{`Status: ${status}`}</div>
        {status === 'booked' ? (
          <Link to={`/reservations/${reservation_id}/seat`}>
            <button href={`/reservations/${reservation_id}/edit`}>Seat</button>
          </Link>
        ) : null}

        <Link to={`/reservations/${reservation_id}/edit`}>
          <button href={`/reservations/${reservation_id}/edit`}>Edit</button>
        </Link>

        <button
          data-reservation-id-cancel={reservation.reservation_id}
          onClick={handleCancel}
        >
          Cancel
        </button>
        <ErrorAlert error={cancelError} />
      </div>
    </div>
  );
}

export default Reservation;
