import React from 'react';
import {
  Route,
  Redirect,
  RouteProps,
  RouteComponentProps,
} from 'react-router-dom';

const PrivateRoute = ({ component, ...rest }: RouteProps) => {
  if (!component) {
    throw Error('component is undefined');
  }

  const token: string | null = localStorage.getItem('token');

  const Component = component; // JSX Elements have to be uppercase.
  const render = (props: RouteComponentProps<any>): React.ReactNode => {
    if (token) {
      return <Component {...props} />;
    } else if (!token) {
      return <Redirect to={{ pathname: '/login' }} />;
    }
  };

  return <Route {...rest} render={render} />;
};

export default PrivateRoute;
