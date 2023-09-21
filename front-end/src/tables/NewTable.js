import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import ErrorAlert from '../layout/ErrorAlert';
import { createTable } from '../utils/api';

function NewTable () {
  const initialFormState = {
    table_name: '',
    capacity: 1
  };

  const [tableForm, setTableForm] = useState({ ...initialFormState });
  const [tableFormErrors, setTableFormErrors] = useState(null);
  const history = useHistory();

  const handleChange = ({ target }) => {
    let value = target.value;
    let name = target.name;

    // should typeof value === num?
    if (name === 'capacity') {
      value = Number(value);
    }

    setTableForm({
      ...tableForm,
      [name]: value
    });
  };

  const handleSubmit = event => {
    event.preventDefault();
    const abortController = new AbortController();

    createTable(tableForm, abortController.signal)
      .then(() => history.push(`/dashboard`))
      .catch(setTableFormErrors);

    return () => abortController.abort();
  };

  return (
    <div>
      <h2 className='heading'>New Table</h2>
      <form onSubmit={handleSubmit}>
        <ErrorAlert error={tableFormErrors} />
        <div className='container'>
          <div className='form-group'>
            <label htmlFor='table_name'>
              Table Name:
              <input
                className='form-control'
                type='text'
                id='table_name'
                name='table_name'
                placeholder='Enter table name'
                onChange={handleChange}
                required={true}
              />
            </label>
          </div>

          <div className='form-group'>
            <label htmlFor='capacity'>
              Capacity:
              <input
                className='form-control'
                type='number'
                id='capacity'
                name='capacity'
                placeholder='Enter capacity here'
                onChange={handleChange}
                required={true}
              />
            </label>
          </div>
        </div>
        <span>
          <button type='submit' className='btn submitBtn font-weight-bolder'>
            Submit
          </button>
          <button
            type='button'
            className='btn cancelBtn font-weight-bolder mx-3'
            onClick={() => history.goBack()}
          >
            Cancel
          </button>
        </span>
      </form>
    </div>
  );
}

export default NewTable;
