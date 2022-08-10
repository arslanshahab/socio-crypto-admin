import React from 'react';
import { Route, Switch } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import LoginPage from './pages/Login';
import Dashboard from './pages/Dashboard';
import { ProtectedRoute } from './components/ProtectedRoute';
import ErrorAlert from './components/Alerts/ErrorAlert/ErrorAlert';
import SuccessAlert from './components/Alerts/SuccessAlert/SuccessAlert';
import AppLoader from './components/AppLoader';
import ForgetPage from './pages/Forget';
import VerifyEmail from './pages/VerifyEmail.tsx';
import RegisterPage from './pages/Register';

const App: React.FC = () => {
  return (
    <div>
      <ErrorAlert />
      <SuccessAlert />
      <AppLoader />
      <BrowserRouter>
        <Switch>
          <Route exact path={'/'} component={LoginPage} />
          <Route exact path={'/register'} component={RegisterPage} />
          <Route exact path={'/forget-password'} component={VerifyEmail} />
          <Route exact path={'/reset-password'} component={ForgetPage} />
          <ProtectedRoute path={'/dashboard'} component={Dashboard} />
        </Switch>
      </BrowserRouter>
    </div>
  );
};

export default App;
