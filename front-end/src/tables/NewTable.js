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
    <div className='card cards mx-5 mt-5'>
      <form onSubmit={handleSubmit} className=''>
        <div className='card-header'>
          <h2 className='heading '>New Table</h2>
        </div>
        <div className='card-body'>
          <ErrorAlert error={tableFormErrors} />
          <div className='container'>
            <div className='form-group d-flex justify-content-center'>
              <label htmlFor='table_name' className='w-75 px-5 text-center'>
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

            <div className='form-group d-flex justify-content-center'>
              <label htmlFor='capacity' className='w-75 px-5 text-center'>
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
        </div>
        <div className='d-flex justify-content-center card-footer'>
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
        </div>
      </form>
    </div>
  );
}

export default NewTable;
