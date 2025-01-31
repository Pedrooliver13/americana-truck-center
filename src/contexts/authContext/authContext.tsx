// Packages
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { auth } from 'config/firebase';
import { onAuthStateChanged } from 'firebase/auth';

// Hooks
import { useGetAllUsers } from 'hooks/users/useGetAllUsers';

// Models
import { ERoles } from 'models/auth/auth';

interface AuthProviderProps {
  children: React.ReactNode;
}

type currentUser = {
  email: string;
  uid: string;
};

interface AuthContextProps {
  currentUser: currentUser | null;

  isAdmin: boolean;
  isUserLoggedIn: boolean;
  isLoading: boolean;
}

const AuthContext = createContext({
  currentUser: null,
  isUserLoggedIn: false,
  isLoading: true,
} as AuthContextProps);

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const { data: allUsers } = useGetAllUsers();

  const [isLoading, setIsLoading] = useState(true);
  const [isUserLoggedIn, setUserLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState<currentUser | null>(null);

  const isAdmin = useMemo(() => {
    if (!currentUser?.email || !allUsers) {
      return false;
    }

    return allUsers.some(
      (user) =>
        currentUser?.email === user?.email && user?.roles.includes(ERoles.ADMIN)
    );
  }, [allUsers, currentUser]);

  const initializeUser = useCallback(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (userParam: any) => {
      if (userParam) {
        setCurrentUser(userParam);
        setUserLoggedIn(true);
      } else {
        setCurrentUser(null);
        setUserLoggedIn(false);
      }

      setIsLoading(false);
    },
    []
  );

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, initializeUser);
    return unsubscribe;
  }, [initializeUser]);

  return (
    <AuthContext.Provider
      value={{ currentUser, isAdmin, isUserLoggedIn, isLoading }}
    >
      {!isLoading && children}
    </AuthContext.Provider>
  );
};
