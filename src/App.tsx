import React from 'react';
import { Route, Switch } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import LoginPage from './pages/Login';
import Dashboard from './pages/Dashboard';
import { ProtectedRoute } from './components/ProtectedRoute';
import ErrorAlert from './components/Alerts/ErrorAlert/ErrorAlert';
import SuccessAlert from './components/Alerts/SuccessAlert/SuccessAlert';
import AppLoader from './components/AppLoader';
import useStoreSettingsSelector from './hooks/useStoreSettingsSelector';
import 'bootstrap/dist/css/bootstrap.min.css';

export const App: React.FC = () => {
  const storeSettings = useStoreSettingsSelector();
  return (
    <div>
      <ErrorAlert />
      <SuccessAlert />
      {storeSettings.appLoader && <AppLoader message={storeSettings.loadingMessage} />}
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
