import React from 'react';
// import { BrowserRouter, Switch, Redirect, Route } from 'react-router-dom';

import renderRoutes from './routes';

const App = () => (
  <div>
    <span>App</span>
    {renderRoutes()}
  </div>
);

export default App;
