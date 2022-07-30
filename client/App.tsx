import React from 'react';
import AuthenticationProvider from 'providers/authentication';

import renderRoutes from './routes';

const App = () => (
  <div>
    <div className="app-main-container">
      <AuthenticationProvider>{renderRoutes()}</AuthenticationProvider>
    </div>
  </div>
);

export default App;
