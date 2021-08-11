import React, { useEffect, useMemo } from 'react';
import { useHistory } from 'react-router-dom';
import { useAuth } from '@app/hooks';

const AuthPage: React.FC = () => {
  const history = useHistory();
  const { isAuthenticated, logout } = useAuth();

  const isAuth = useMemo(() => isAuthenticated(), [isAuthenticated]);

  useEffect(() => {
    if (isAuth) {
      history.push('/home');
    } else {
      logout();
      history.push('/login');
    }
  }, [history, isAuth, logout]);

  return <div>Loading...</div>;
};

export default AuthPage;
