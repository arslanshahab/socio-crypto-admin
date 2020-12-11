import React from 'react';
import { Route, Switch } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import { Login } from './screens/Login';
import { RegisterBrand } from './screens/RegisterBrand';
import { Dashboard } from './screens/Dashboard';
import { ProtectedRoute } from './components/ProtectedRoute';

export const App: React.FC = () => {
  return (
    <div>
      <BrowserRouter>
        <Switch>
          <Route exact path={'/'} component={Login} />
          <Route path={'/register'} component={RegisterBrand} />
          <ProtectedRoute path={'/dashboard'} component={Dashboard} />
        </Switch>
      </BrowserRouter>
    </div>
  );
};

export default App;
