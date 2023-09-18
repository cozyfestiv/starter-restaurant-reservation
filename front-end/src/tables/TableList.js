import React, { useEffect, useState } from 'react';
import Table from '../tables/Table';
import { listTables } from '../utils/api';

function TableList () {
  const [tables, setTables] = useState([]);

  useEffect(loadTables, []);

  function loadTables () {
    const abortController = new AbortController();
    //   setReservationsError(null);
    listTables(abortController.signal).then(setTables);
    //   .catch(setReservationsError);
    return () => abortController.abort();
  }

  const list = tables.map(table => (
    <div key={table.table_id}>
      <Table table={table} />
    </div>
  ));

  return <>{list}</>;
}

export default TableList;
