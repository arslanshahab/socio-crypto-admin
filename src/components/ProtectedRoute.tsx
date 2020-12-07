import React from 'react';
import { Redirect, Route, RouteProps, useHistory } from 'react-router';
import { useQuery } from '@apollo/client';
import { VERIFY_SESSION } from '../operations/queries/firebase';

export const UserContext = React.createContext({ role: null, company: null });

interface Props extends RouteProps {
  adminOnly?: boolean;
}

export const ProtectedRoute: React.FC<Props> = (props) => {
  const history = useHistory();
  const { loading, data, error } = useQuery(VERIFY_SESSION);
  const routeState = props.location && props.location.state && props.location.state ? props.location.state : null;
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
      if (props.adminOnly) {
        if (data.verifySession.company.toLowerCase() !== 'raiinmaker') history.push('/dashboard');
      }
      return (
        <UserContext.Provider value={data.verifySession}>
          <Route routeState={routeState} company={data.verifySession.company} {...props} />
        </UserContext.Provider>
      );
    } else if (error) {
      console.log('ERROR: ', error);
      return redirect();
    }
  };

  return <div>{renderRoute()}</div>;
};
