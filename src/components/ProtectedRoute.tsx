import React from 'react';
import { Redirect, Route, RouteProps, useHistory } from 'react-router';
import useStoreUserSelector from '../hooks/useStoreUserSelector';

interface Props extends RouteProps {
  adminOnly?: boolean;
}

export const ProtectedRoute: React.FC<Props> = (props) => {
  const history = useHistory();
  const userData = useStoreUserSelector();

  const renderRoute = () => {
    if (userData.isLoggedIn) {
      if (props.adminOnly) {
        if (userData.company.toLowerCase() !== 'raiinmaker') history.push('/dashboard');
      }
      return <Route {...props} />;
    } else {
      return <Redirect to={{ pathname: '/' }} />;
    }
  };

  return <div>{renderRoute()}</div>;
};
