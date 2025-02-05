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

interface GlobalProviderProps {
  children: React.ReactNode;
}

type currentUser = {
  email: string;
  uid: string;
};

interface GlobalContextProps {
  currentUser: currentUser | null;
  theme: 'light' | 'dark';
  setTheme: (theme: 'light' | 'dark') => void;

  isAdmin: boolean;
  isUserLoggedIn: boolean;
  isLoading: boolean;
}

const GlobalContext = createContext({
  currentUser: null,
  isUserLoggedIn: false,
  isLoading: true,
} as GlobalContextProps);

export const useGlobalContext = () => {
  return useContext(GlobalContext);
};

export const GlobalProvider = ({ children }: GlobalProviderProps) => {
  const { data: allUsers } = useGetAllUsers();

  const currentTheme = localStorage.getItem(
    '@americana-truck-center:theme-state-1.0.0'
  ) as 'light' | 'dark';

  const [theme, setTheme] = useState(currentTheme);
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
    <GlobalContext.Provider
      value={{
        currentUser,
        theme,
        setTheme,

        isAdmin,
        isUserLoggedIn,
        isLoading,
      }}
    >
      {!isLoading && children}
    </GlobalContext.Provider>
  );
};
