// Packages
import { createContext, useContext, useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from 'config/firebase';

interface AuthProviderProps {
  children: React.ReactNode;
}

interface AuthContextProps {
  currentUser: {
    email: string;
    uid: string;
  } | null;
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
  const [currentUser, setCurrentUser] = useState(null);
  const [isUserLoggedIn, setUserLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, initializeUser);
    return unsubscribe;
  }, []);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async function initializeUser(user: any) {
    if (user) {
      setCurrentUser(user);
      setUserLoggedIn(true);
    } else {
      setCurrentUser(null);
      setUserLoggedIn(false);
    }

    setIsLoading(false);
  }

  return (
    <AuthContext.Provider value={{ currentUser, isUserLoggedIn, isLoading }}>
      {!isLoading && children}
    </AuthContext.Provider>
  );
};
