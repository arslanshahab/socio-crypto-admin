import React from 'react';
import { Route } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import { Login } from './screens/Login';
import { Register } from './screens/Register';
import { Dashboard } from './screens/Dashboard';

export const App: React.FC = () => {
  return (
    <div>
      <BrowserRouter>
        <Route exact path={'/'} component={Login} />
        <Route path={'/register'} component={Register} />
        <Route path={'/dashboard'} component={Dashboard} />
      </BrowserRouter>
    </div>
  );
};

export default App;
