import React from 'react';

import AuthenticationProvider from 'providers/authentication';
import renderRoutes from 'routes';

function App() {
  return (
    <div>
      <div className="app-main-container">
        <AuthenticationProvider>{renderRoutes()}</AuthenticationProvider>
      </div>
    </div>
  );
}

export default App;
