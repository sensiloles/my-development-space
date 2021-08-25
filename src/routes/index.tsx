import React from 'react';
import { BrowserRouter, Switch, Redirect, Route } from 'react-router-dom';

import { Home, Test } from '../pages';

const routersData = [
  { key: 1, path: '/home', component: Home },
  { key: 2, path: '/test', component: Test }
];

const renderRoutes = () => (
  <BrowserRouter>
    <Switch>
      <Redirect exact from="/" to="home" />
      {routersData.map(({ key, path, component }) => (
        <Route key={key} path={path} component={component} />
      ))}
    </Switch>
  </BrowserRouter>
);

export default renderRoutes;
