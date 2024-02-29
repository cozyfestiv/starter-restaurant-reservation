import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { updateReservationStatus } from '../utils/api';
import { getTimeFormat } from '../utils/date-time';
import img1 from '../assets/hal-gatewood-OgvqXGL7XO4-unsplash.jpg';
import img2 from '../assets/joel-filipe-Lw7BruqPnJY-unsplash.jpg';
import img3 from '../assets/nasa-hubble-space-telescope-EEx2k0nAfU4-unsplash.jpg';
import img4 from '../assets/raghav-bhasin-rs8py1DtIoI-unsplash.jpg';
import img5 from '../assets/ricardo-gomez-angel-VW2jIXnL1aA-unsplash.jpg';

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

  const imgSources = [img1, img2, img3, img4, img5];

  function renderReservations (reservations) {
    if (reservations.length) {
      return reservations.map(reservation => {
        return filterResults && checkStatus(reservation) ? (
          ''
        ) : (
          <div
            className='card text-center text-dark bg-light cards mb-4'
            key={reservation.reservation_id}
          >
            <div>
              <div className='item-quad'>
                <div className='group-col no-gap'>
                  <div className='card-header d-flex justify-content-between align-items-center'>
                    <h4 className='card-title mb-0'>
                      {reservation.first_name} {reservation.last_name}{' '}
                    </h4>
                    <h4 className='card-title mb-0'>
                      {getTimeFormat(reservation.reservation_time)}
                    </h4>
                  </div>
                  <div className='card-body d-flex justify-content-between align-items-center'>
                    <div className='d-flex flex-column justify-content-center align-items-start pl-2'>
                      <p className='card-text mb-1'>
                        Party of {reservation.people}
                      </p>
                      <p className='card-text mb-1'>
                        Phone:{' '}
                        <a href={`tel:${reservation.mobile_number}`}>
                          {reservation.mobile_number}
                        </a>
                      </p>

                      <p
                        className='card-text mb-1'
                        data-reservation-id-status={reservation.reservation_id}
                      >
                        Status: {reservation.status}
                      </p>
                      <p className='card-text mb-1'>
                        Date: {reservation.reservation_date}
                      </p>
                    </div>
                    <img
                      src={
                        imgSources[
                          reservation.reservation_id % imgSources.length
                        ]
                      }
                      style={{ width: '100px', height: '100px' }}
                      alt={`Reservation ${reservation.reservation_id}`}
                    />
                  </div>
                </div>
              </div>
              <div className=' justify-content-center card-footer'>
                {reservation.status === 'booked' ? (
                  <div className='group-reverse align-items-center'>
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
