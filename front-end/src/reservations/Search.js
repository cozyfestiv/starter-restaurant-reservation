import React, { useState } from 'react';
import { listReservations } from '../utils/api';
import ReservationsList from '../reservations/ReservationsList';

export const Search = () => {
  const [reservations, setReservations] = useState([]);
  const [mobileNumber, setMobileNumber] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const filterResults = false;

  const changeHandler = event => {
    setMobileNumber(event.target.value);
  };

  const submitHandler = async event => {
    event.preventDefault();
    const abortController = new AbortController();

    let res = await listReservations(
      { mobile_number: mobileNumber },
      abortController.signal
    );
    await setReservations(res);
    setSubmitted(true);

    return () => abortController.abort();
  };

  return (
    <section>
      <form onSubmit={submitHandler}>
        <div className='card cards mx-5 mt-5'>
          <div className='card-header'>
            <h2 className='heading'>Search</h2>
          </div>
          <div className='card-body'>
            <div className='form-group'>
              <label htmlFor='mobile_number'>Mobile Number:</label>
              <input
                className='form-control'
                id='mobile_number'
                name='mobile_number'
                type='text'
                required={true}
                placeholder="Enter a customer's phone number"
                value={mobileNumber}
                maxLength='12'
                onChange={changeHandler}
              />
            </div>
          </div>
          <div className='card-footer'>
            <button
              type='submit'
              className='btn submitBtn font-weight-bolder mb-4'
            >
              Find
            </button>
          </div>
        </div>
      </form>
      {submitted ? (
        <>
          <h2 className='my-4'>Results</h2>
          <div className='m-5'>
            <ReservationsList
              reservations={reservations}
              filterResults={filterResults}
            />
          </div>
        </>
      ) : (
        ''
      )}
    </section>
  );
};

export default Search;
