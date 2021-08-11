import React from 'react';
import { Route, Switch } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import LoginPage from './pages/Login';
import Dashboard from './pages/Dashboard';
import { ProtectedRoute } from './components/ProtectedRoute';
import ErrorAlert from './components/Alerts/ErrorAlert/ErrorAlert';
import SuccessAlert from './components/Alerts/SuccessAlert/SuccessAlert';

export const App: React.FC = () => {
  return (
    <div>
      <ErrorAlert />
      <SuccessAlert />
      <BrowserRouter>
        <Switch>
          <Route exact path={'/'} component={LoginPage} />
          <ProtectedRoute path={'/dashboard'} component={Dashboard} />
        </Switch>
      </BrowserRouter>
    </div>
  );
};

export default App;
