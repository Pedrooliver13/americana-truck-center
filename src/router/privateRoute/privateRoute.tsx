// Packages
import { Navigate } from 'react-router-dom';

// Contexts
import { useGlobalContext } from 'contexts/globalContext';

interface PrivateRouteProps {
  children: React.ReactNode;
}

export const PrivateRoute = (props: PrivateRouteProps) => {
  const { isUserLoggedIn } = useGlobalContext();

  if (isUserLoggedIn) {
    return props.children;
  }

  return <Navigate to="/login" />;
};
