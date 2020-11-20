import React from 'react';
import { Redirect, Route, RouteProps } from 'react-router';
import { useQuery } from '@apollo/client';
import { VERIFY_SESSION } from '../operations/queries/firebase';

export type ProtectedRouteProps = RouteProps;
export const UserContext = React.createContext('');

export const ProtectedRoute: React.FC<ProtectedRouteProps> = (props) => {
  const { loading, data, error } = useQuery(VERIFY_SESSION);

  const redirect = () => {
    const renderComponent = () => <Redirect to={{ pathname: '/' }} />;
    return (
      <div>
        <Route {...props} component={renderComponent} render={undefined} />;
      </div>
    );
  };
  const renderRoute = () => {
    if (loading) return <div />;
    if (data) {
      return (
        <UserContext.Provider value={data.verifySession}>
          <Route {...props} />
        </UserContext.Provider>
      );
    } else if (error) {
      console.log('ERROR: ', error);
      return redirect();
    }
  };

  return <div>{renderRoute()}</div>;
};
