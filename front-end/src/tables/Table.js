import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { finishTable } from '../utils/api';
import ErrorAlert from '../layout/ErrorAlert';

function Table ({ table }) {
  const occupied = table.reservation_id;
  const history = useHistory();

  const [finishError, setFinishError] = useState(null);

  const finishedHandler = ({ target }) => {
    if (
      window.confirm(
        'Is this table ready to seat new guests? This cannot be undone.'
      )
    ) {
      const tableId = target.id;
      const abortController = new AbortController();
      finishTable(tableId, abortController.signal)
        .then(() => history.push('/'))
        .catch(setFinishError);
      return () => abortController.abort();
    }
  };

  return (
    <>
      <ErrorAlert error={finishError} />
      <div className='card cards flex-grow-1 mx-2 mb-2 '>
        <div className='card-header d-flex justify-content-between'>
          <h5 className='card-title mb-0 d-flex align-items-center'>
            Table: {table.table_name}
          </h5>
          {table.reservation_id ? (
            <button
              data-table-id-finish={table.table_id}
              value={table.reservation_id}
              id={table.table_id}
              className='btn navBtn [font-weight-bolder'
              onClick={finishedHandler}
            >
              Finish
            </button>
          ) : (
            <p className='my-3'></p>
          )}
        </div>
        <div className='card-body py-2 pr-0 pl-2'>
          <ul className='list-group list-group-flush'>
            <li className='list-group-item px-4 py-0'>
              <h6 className='pr-2 my-1 d-flex flex-row justify-content-between align-items-center'>
                <p className='mb-0' data-table-id-status={`${table.table_id}`}>
                  Status: {occupied ? 'Occupied' : 'Free'}
                </p>
                <p className='mb-0'>Seats: {table.capacity}</p>
              </h6>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}

export default Table;
