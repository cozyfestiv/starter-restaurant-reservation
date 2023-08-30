import React, { useState, useEffect } from 'react';

import { Redirect, Route, Switch } from 'react-router-dom';
import Dashboard from '../dashboard/Dashboard';
import NotFound from './NotFound';
import { today } from '../utils/date-time';

import EditAddReservation from '../dashboard/reservations/EditAddReservation';

/**
 * Defines all the routes for the application.
 *
 * You will need to make changes to this file.
 *
 * @returns {JSX.Element}
 */
function Routes () {
  const [calledAPI, setCalledAPI] = useState(false);

  return (
    <Switch>
      <Route exact={true} path='/'>
        <Redirect to={'/dashboard'} />
      </Route>
      <Route exact={true} path='/reservations/:reservation_id/edit'>
        <EditAddReservation calledAPI={calledAPI} setCalledAPI={setCalledAPI} />
      </Route>
      <Route exact={true} path='/reservations/new'>
        <EditAddReservation calledAPI={calledAPI} setCalledAPI={setCalledAPI} />
      </Route>
      <Route exact={true} path='/reservations'>
        <Redirect to={'/dashboard'} />
      </Route>
      <Route path='/dashboard'>
        <Dashboard date={today()} />
      </Route>
      <Route>
        <NotFound />
      </Route>
    </Switch>
  );
}

export default Routes;
