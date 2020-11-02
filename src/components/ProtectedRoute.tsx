import React, { useEffect, useState } from 'react';
import { Redirect, Route, RouteProps } from 'react-router';
import { getCurrentUser } from '../firebase';

export type ProtectedRouteProps = RouteProps;

export const ProtectedRoute: React.FC<ProtectedRouteProps> = (props) => {
  const [user, setUser] = useState<unknown>(null);
  const [redirectPath, setRedirectPath] = useState('');

  useEffect(() => {
    const getUser = async () => {
      const user = await getCurrentUser();
      if (!user) {
        setRedirectPath('/');
      } else {
        setUser(user);
      }
    };
    getUser();
  }, []);

  if (redirectPath) {
    const renderComponent = () => <Redirect to={{ pathname: redirectPath }} />;
    return <Route {...props} component={renderComponent} render={undefined} />;
  } else {
    return <Route {...props} />;
  }
};
