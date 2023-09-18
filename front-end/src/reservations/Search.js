import React, { useState } from 'react';
import { searchMobileNumber } from '../utils/api';
import ReservationsList from './ReservationsList';
import ErrorAlert from '../layout/ErrorAlert';

function Search () {
  const [mobileNumber, setMobileNumber] = useState('');
  const [reservations, setReservations] = useState([]);
  const [error, setError] = useState(null);

  const handleChange = ({ target }) => {
    let { value } = target;
    setMobileNumber(value);
  };

  const handleSubmit = async event => {
    event.preventDefault();
    const abortController = new AbortController();
    setError(null);

    searchMobileNumber(mobileNumber, abortController.signal)
      .then(setReservations)
      .catch(setError);

    return () => abortController.abort();
  };

  const reservationsList =
    reservations.length > 0 ? (
      <ReservationsList reservations={reservations} />
    ) : (
      <p>No reservations found.</p>
    );

  return (
    <>
      <ErrorAlert error={error} />
      <h2>Search for Reservation</h2>
      <form onSubmit={handleSubmit}>
        <div className='form-group'>
          <label htmlFor='mobile_number'>Mobile Number</label>
          <input
            className='form-control'
            id='mobile_number'
            name='mobile_number'
            type='text'
            placeholder="Enter a customer's phone number"
            required={true}
            onChange={handleChange}
            value={mobileNumber}
          />
        </div>
        <button type='submit'>Find</button>
      </form>
      {reservationsList}
    </>
  );
}

export default Search;
