import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import Dashboard from '../dashboard/Dashboard';
import NotFound from './NotFound';
import { today } from '../utils/date-time';
import NewTable from '../tables/NewTable';
import Seat from '../reservations/Seat';
import Search from '../reservations/Search';
import AddEditReservation from '../reservations/AddEditReservation';

/**
 * Defines all the routes for the application.
 *
 * You will need to make changes to this file.
 *
 * @returns {JSX.Element}
 */
function Routes () {
  return (
    <Switch>
      <Route exact={true} path='/'>
        <Redirect to={'/dashboard'} />
      </Route>

      <Route exact={true} path='/reservations'>
        <Redirect to={'/dashboard'} />
      </Route>

      <Route path='/dashboard'>
        <Dashboard date={today()} />
      </Route>

      <Route exact={true} path='/dashboard/:date'>
        <Dashboard />
      </Route>

      <Route path='/reservations/new'>
        <AddEditReservation />
      </Route>

      <Route exact={true} path='/reservations/:reservation_id/seat'>
        <Seat />
      </Route>

      <Route exact={true} path='/reservations/:reservation_id/edit'>
        <AddEditReservation />
      </Route>

      <Route path='/tables/new'>
        <NewTable />
      </Route>

      <Route path='/search'>
        <Search />
      </Route>

      <Route>
        <NotFound />
      </Route>
    </Switch>
  );
}

export default Routes;
