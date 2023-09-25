import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import ErrorAlert from '../layout/ErrorAlert';
import {
  listTables,
  readReservation,
  seatTable,
  updateReservationStatus
} from '../utils/api';

function Seat () {
  const history = useHistory();

  const [tablesError, setTablesErrors] = useState(null);
  const [form, setForm] = useState({ table_id: '' });
  const [reservation, setReservation] = useState({});
  const [tables, setTables] = useState([]);
  const { reservation_id } = useParams();

  useEffect(() => {
    async function loadTables () {
      const abortController = new AbortController();
      setTablesErrors(null);
      readReservation(reservation_id, abortController.signal)
        .then(setReservation)
        .catch(setTablesErrors);
      listTables(abortController.signal).then(setTables).catch(setTablesErrors);
      return () => abortController.abort();
    }
    loadTables();
  }, [reservation_id]);

  const handleSubmit = event => {
    event.preventDefault();
    if (form.table_id !== 'x') {
      const abortController = new AbortController();
      let status = 'seated';
      updateReservationStatus(reservation_id, status, abortController.signal);
      seatTable(
        parseInt(form.table_id),
        reservation_id,
        abortController.signal
      ).then(() => {
        history.push('/dashboard');
      });
    }
  };

  const handleChange = ({ target }) => {
    setForm({ [target.name]: target.value });
  };

  return (
    <>
      <ErrorAlert error={tablesError} />
      <h2>Assign table for party of {reservation.people}</h2>
      <form onSubmit={handleSubmit}>
        <div className='form-group'>
          <label htmlFor='table_id'> Choose a Table</label>
          <select
            className='form-control'
            name='table_id'
            id='table_id'
            onChange={handleChange}
            value={form.table_id}
          >
            <option value='x'>--Select an Option--</option>
            {tables.map(table => (
              <option key={table.table_id} value={table.table_id}>
                {table.table_name} - {table.capacity}
              </option>
            ))}
          </select>
          <button
            type='submit'
            className='btn submitBtn font-weight-bolder mx-2'
          >
            Submit
          </button>
          <button
            type='button'
            className='btn cancelBtn font-weight-bolder mx-2'
            onClick={() => history.goBack()}
          >
            Cancel
          </button>
        </div>
      </form>
    </>
  );
}

export default Seat;
