import React, { useState, useEffect } from 'react';
import { useHistory, useRouteMatch } from 'react-router-dom';
import {
  createReservation,
  readReservation,
  updateReservationDetails
} from '../../utils/api';

export default function AddEditReservation ({ calledAPI, setCalledAPI }) {
  const history = useHistory();
  const { reservation, setReservation } = useState({});
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    mobile_number: '',
    reservation_date: '',
    reservation_time: '',
    people: ''
  });
  const {
    params: { reservation_id }
  } = useRouteMatch();

  function handleChange ({ target }) {
    setFormData(() => ({ ...formData, [target.name]: target.value }));
  }

  //wrote the handleSubmit but I need to set the formData first
  async function handleSubmit (event) {
    event.preventDefault();
    try {
      if (reservation_id) {
        await updateReservationDetails(formData, reservation_id);
      } else {
        await createReservation(formData);
      }
      //this is the API call which connects to the backend
      setCalledAPI(!calledAPI);
      history.push(`/dashboard?date=${formData.reservation_date}`);
    } catch (error) {}
  }

  useEffect(() => {
    async function loadReservation () {
      try {
        if (reservation_id) {
          const response = await readReservation(reservation_id);

          let {
            first_name,
            last_name,
            mobile_number,
            reservation_date,
            reservation_time,
            people
          } = response;
          //modify reservation date to only include the date part
          reservation_date = reservation_date.slice(0, 10);
          //update reservation state with fetched details
          setReservation(() => ({
            ...reservation_date,
            first_name,
            last_name,
            mobile_number,
            reservation_date,
            reservation_time,
            people
          }));
          //update formData state with fetched details
          setFormData(() => ({
            ...formData,
            first_name,
            last_name,
            mobile_number,
            reservation_date,
            reservation_time,
            people
          }));
        } else {
          setReservation({
            first_name: '',
            last_name: '',
            mobile_number: '',
            reservation_date: '',
            reservation_time: '',
            people: ''
          });
        }
      } catch (error) {
        console.error(error);
      }
    }
    loadReservation();
  }, [formData, reservation_id, setReservation]);
  //anything that comes from outside of the useEffect needs to be passed in as a dependendency

  return (
    <div>
      <h2>Reserve a Table</h2>
      <form name='create_reservation' onSubmit={handleSubmit}>
        <div>
          <label htmlFor='first_name'>First Name</label>
          <input
            required
            type='text'
            name='first_name'
            value={formData.first_name}
            className='form-control'
            placeholder='John Q'
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor='last_name'>Last Name</label>
          <input
            required
            type='text'
            name='last_name'
            value={formData.last_name}
            className='form-control'
            placeholder='Public'
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor='mobile_number'>Mobile Number</label>
          <input
            required
            type='tel'
            name='mobile_number'
            value={formData.mobile_number}
            className='form-control'
            placeholder='123-456-7890'
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor='reservation_date'>Date</label>
          <input
            required
            type='date'
            name='reservation_date'
            value={formData.reservation_date}
            className='form-control'
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor='reservation_time'>Time</label>
          <input
            required
            type='time'
            name='reservation_time'
            value={formData.reservation_time}
            className='form-control'
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor='people'>Number of People</label>
          <input
            required
            type='number'
            name='people'
            value={formData.people}
            className='form-control'
            placeholder='#'
            onChange={handleChange}
          />
        </div>
        <button type='submit' className='btn btn-primary'>
          Submit
        </button>
        <button
          onClick={history.goBack}
          className='btn btn-secondary ml-1'
          type='button'
        >
          Cancel
        </button>
      </form>
    </div>
  );
}
