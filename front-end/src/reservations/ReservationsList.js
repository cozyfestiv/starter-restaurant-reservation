import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { updateReservationStatus } from '../utils/api';
import { getTimeFormat } from '../utils/date-time';

export const ReservationsList = ({ reservations, filterResults }) => {
  const [cancelError, setCancelError] = useState(null);
  const history = useHistory();

  // Filters out reservations that are finished or cancelled
  function checkStatus (reservation) {
    return (
      reservation.status === 'finished' || reservation.status === 'cancelled'
    );
  }

  const cancelHandler = (event, reservation_id) => {
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

  function renderReservations (reservations) {
    if (reservations.length) {
      return reservations.map(reservation => {
        // Dashboard shows only booked and seated results, whereas Search shows all results
        return filterResults && checkStatus(reservation) ? (
          ''
        ) : (
          <div className='reservation' key={reservation.reservation_id}>
            <div className='group'>
              <div className='item-quad'>
                <div className='group-col no-gap'>
                  <div>
                    <h4 className='inline'>
                      {reservation.first_name} {reservation.last_name}{' '}
                    </h4>
                    <p className='inline'>Party of {reservation.people}</p>
                  </div>
                  <div>
                    <h5 className='blue inline'>
                      {getTimeFormat(reservation.reservation_time)}
                    </h5>
                    <p className='inline'>
                      mobile : {reservation.mobile_number}
                    </p>
                    <p
                      className='inline'
                      data-reservation-id-status={reservation.reservation_id}
                    >
                      <i>{reservation.status}</i>
                    </p>
                  </div>
                </div>
              </div>
              <div className='item'>
                {reservation.status === 'booked' ? (
                  <div className='group-reverse'>
                    <Link
                      className='item button-link'
                      to={`/reservations/${reservation.reservation_id}/seat`}
                    >
                      <button
                        href={`/reservations/${reservation.reservation_id}/seat`}
                      >
                        Seat
                      </button>
                    </Link>
                    <Link
                      to={`/reservations/${reservation.reservation_id}/edit`}
                    >
                      <button
                        href={`/reservations/${reservation.reservation_id}/edit`}
                      >
                        Edit
                      </button>
                    </Link>
                    <button
                      className='item black'
                      type='button'
                      data-reservation-id-cancel={reservation.reservation_id}
                      value={reservation.reservation_id}
                      onClick={event =>
                        cancelHandler(event, reservation.reservation_id)
                      }
                    >
                      Cancel
                    </button>
                  </div>
                ) : (
                  ''
                )}
              </div>
            </div>
          </div>
        );
      });
    } else {
      return (
        <div className='group'>
          <h4>No reservations found</h4>
        </div>
      );
    }
  }

  return <div>{renderReservations(reservations)}</div>;
};

export default ReservationsList;
