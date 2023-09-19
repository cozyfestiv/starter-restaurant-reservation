import React, { useEffect, useState } from 'react';
import { listReservations } from '../utils/api';
import ErrorAlert from '../layout/ErrorAlert';
import ReservationsList from '../reservations/ReservationsList';
import useQuery from '../utils/useQuery';
import formatReadableDate from '../utils/format-readable-date';
import DashboardDateNavigation from './DashboardDateNavigation';
import TableList from '../tables/TableList';

/**
 * Defines the dashboard page.
 * @param date
 *  the date for which the user wants to view reservations.
 * @returns {JSX.Element}
 */
function Dashboard ({ date }) {
  const [reservations, setReservations] = useState([]);
  const [reservationsError, setReservationsError] = useState(null);
  const filterResults = true;

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
      <h2 className='heading my-2 p-2'>Dashboard</h2>
      <ErrorAlert error={reservationsError} />
      <div className='d-md-flex flex-column mb-3'>
        <span>
          <DashboardDateNavigation date={date} />
        </span>

        <div className='group'>
          <div className='item'>
            <h3>Reservations for {reservationDate}</h3>
            <ReservationsList
              reservations={reservations}
              filterResults={filterResults}
            />
          </div>
          <div className='item'>
            <h3>Tables</h3>
            <TableList />
          </div>
        </div>
      </div>
    </main>
  );
}

export default Dashboard;
