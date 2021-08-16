import React from 'react';
import { Redirect, Route, RouteProps, useHistory } from 'react-router';
import { useQuery } from '@apollo/client';
import { VERIFY_SESSION } from '../operations/queries/firebase';
import AppLoader from './AppLoader';

export const UserContext = React.createContext({ role: null, company: null, tempPass: null });

interface Props extends RouteProps {
  adminOnly?: boolean;
}

export const ProtectedRoute: React.FC<Props> = (props) => {
  const history = useHistory();
  const { loading, data, error } = useQuery(VERIFY_SESSION);

  const renderRoute = () => {
    if (loading) return <AppLoader message="Setting up everything. Please wait!" />;
    if (data) {
      if (props.adminOnly) {
        if (data.verifySession.company.toLowerCase() !== 'raiinmaker') history.push('/dashboard');
      }
      return (
        <UserContext.Provider value={data.verifySession}>
          <Route {...props} />
        </UserContext.Provider>
      );
    } else if (error) {
      return <Redirect to={{ pathname: '/' }} />;
    }
  };

  return <div>{renderRoute()}</div>;
};
