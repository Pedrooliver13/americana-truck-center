// Packages
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
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

interface AuthContextProps {
  currentUser: {
    email: string;
    uid: string;
  } | null;

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

  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isUserLoggedIn, setUserLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

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

      if (Array.isArray(allUsers)) {
        const isAdmin = allUsers.some(
          (user) =>
            userParam?.email === user?.email &&
            user?.roles.includes(ERoles.ADMIN)
        );

        setIsAdmin(isAdmin);
      }

      setIsLoading(false);
    },
    [allUsers]
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
