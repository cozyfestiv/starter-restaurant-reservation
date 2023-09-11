import React, { useEffect, useState } from 'react';
import { listReservations } from '../utils/api';
import ErrorAlert from '../layout/ErrorAlert';
import ReservationList from '../reservations/ReservationList';
import useQuery from '../utils/useQuery';
import formatReadableDate from '../utils/format-readable-date';

/**
 * Defines the dashboard page.
 * @param date
 *  the date for which the user wants to view reservations.
 * @returns {JSX.Element}
 */
function Dashboard ({ date }) {
  const [reservations, setReservations] = useState([]);
  const [reservationsError, setReservationsError] = useState(null);

  const dateQuery = useQuery().get('date');

  if (dateQuery && dateQuery !== '') {
    date = dateQuery;
  }

  useEffect(loadDashboard, [date]);

  function loadDashboard () {
    const abortController = new AbortController();
    setReservationsError(null);
    listReservations({ date }, abortController.signal)
      .then(setReservations)
      .catch(setReservationsError);
    return () => abortController.abort();
  }

  const reservationDate = formatReadableDate(date);

  return (
    <main>
      <h1>Dashboard</h1>
      <div className='d-md-flex mb-3'>
        <h4 className='mb-0'>Reservations for {reservationDate} </h4>
        <ReservationList reservations={reservations} />
      </div>
      <ErrorAlert error={reservationsError} />
      {JSON.stringify(reservations)}
    </main>
  );
}

export default Dashboard;
