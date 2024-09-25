// Packages
import { Navigate } from 'react-router-dom';

// Contexts
import { useAuth } from 'contexts/authContext';

interface PrivateRouteProps {
  children: React.ReactNode;
}

export const PrivateRoute = (props: PrivateRouteProps) => {
  const { isUserLoggedIn } = useAuth();

  if (isUserLoggedIn) {
    return props.children;
  }

  return <Navigate to="/login" />;
};
