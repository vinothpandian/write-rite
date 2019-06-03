import * as React from 'react';
import { Route, Switch } from 'react-router-dom';
import * as ROUTES from './constants/routes';
import HomePage from './containers/HomePage';
import DashboardPage from './containers/DashboardPage';
import WritePage from './containers/WritePage';
import ErrorPage from './containers/ErrorPage';

export default function Routes() {
  return (
    <Switch>
      <Route exact path={ROUTES.LANDING} component={HomePage} />
      <Route path={ROUTES.DASHBOARD} component={DashboardPage} />
      <Route path={ROUTES.WRITE} component={WritePage} />
      <Route component={ErrorPage} />
    </Switch>
  );
}
