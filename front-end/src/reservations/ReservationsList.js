import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { updateReservationStatus } from '../utils/api';
import { getTimeFormat } from '../utils/date-time';

export const ReservationsList = ({ reservations, filterResults }) => {
  const [cancelError, setCancelError] = useState(null);
  const history = useHistory();

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
        return filterResults && checkStatus(reservation) ? (
          ''
        ) : (
          <div
            className='card text-center text-white bg-dark cards mb-4'
            key={reservation.reservation_id}
          >
            <div>
              <div className='item-quad'>
                <div className='group-col no-gap'>
                  <div className='card-header d-flex justify-content-between'>
                    <h4 className='card-title'>
                      {reservation.first_name} {reservation.last_name}{' '}
                    </h4>
                    <p className='card-text'>Party of {reservation.people}</p>
                  </div>
                  <div className='card-body'>
                    <p className='card-title'>
                      {getTimeFormat(reservation.reservation_time)}
                    </p>
                    <p className='card-text'>
                      Phone Number : {reservation.mobile_number}
                    </p>
                    <p
                      className='card-text mb-3'
                      data-reservation-id-status={reservation.reservation_id}
                    >
                      Status: {reservation.status}
                    </p>
                  </div>
                </div>
              </div>
              <div className='row justify-content-center'>
                {reservation.status === 'booked' ? (
                  <div className='group-reverse'>
                    <Link
                      className='item button-link'
                      to={`/reservations/${reservation.reservation_id}/seat`}
                    >
                      <button
                        className='btn submitBtn font-weight-bolder mr-2'
                        href={`/reservations/${reservation.reservation_id}/seat`}
                      >
                        Seat
                      </button>
                    </Link>
                    <Link
                      to={`/reservations/${reservation.reservation_id}/edit`}
                    >
                      <button
                        className='btn editBtn font-weight-bolder mr-2'
                        href={`/reservations/${reservation.reservation_id}/edit`}
                      >
                        Edit
                      </button>
                    </Link>
                    <button
                      className='btn cancelBtn font-weight-bolder mx-2'
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
