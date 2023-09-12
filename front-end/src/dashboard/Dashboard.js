import React, { useState, useEffect } from 'react';
import useQuery from '../utils/useQuery';
import formatReadableDate from '../utils/format-readable-date';
import ErrorAlert from '../layout/ErrorAlert';
import DashboardDateNavigation from './DashboardDateNavigation';
import ReservationList from '../reservations/ReservationList';
// import TableList from '../tables/TableList';
import { listReservations } from '../utils/api';

/**
 * Defines the dashboard page.
 * @param date
 *  the date for which the user wants to view reservations.
 * @returns {JSX.Element}
 */
function Dashboard ({ date }) {
  const [reservations, setReservations] = useState([]);
  const [reservationsError, setReservationsError] = useState(null);
  // const [tables, setTables] = useState([]);

  const dateQuery = useQuery().get('date');

  if (dateQuery && dateQuery !== '') {
    date = dateQuery;
  }
  console.log(date);

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
      <h2>Dashboard</h2>
      <ErrorAlert error={reservationsError} />
      <div>
        <span>
          <DashboardDateNavigation date={date} />
        </span>

        <div>
          <div>
            <h3>Reservations for {reservationDate}</h3>
            <ReservationList reservations={reservations} />
          </div>
        </div>
      </div>
    </main>
  );
}

export default Dashboard;
