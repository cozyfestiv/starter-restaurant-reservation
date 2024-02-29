import React, { useEffect, useState } from 'react';
import Table from '../tables/Table';
import { listTables } from '../utils/api';

function TableList () {
  const [tables, setTables] = useState([]);

  useEffect(loadTables, []);

  function loadTables () {
    const abortController = new AbortController();
    listTables(abortController.signal).then(setTables);
    return () => abortController.abort();
  }

  const list = (
    <div className='d-flex flex-column'>
      {tables.map(table => (
        <Table key={table.table_id} table={table} />
      ))}
    </div>
  );

  return <>{list}</>;
}

export default TableList;
