import { Navigate } from 'react-router-dom';
import { useAuth } from '../auth/authprovider';

export function PrivateRoute({ children }){
  const { userLoggedIn, authLoading } = useAuth();
  

  if (authLoading) {
    return <div>Loading...</div>;
  }

  return userLoggedIn ? children : <Navigate to="/login" />;
};

