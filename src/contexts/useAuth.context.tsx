import { useState, useContext, createContext, ReactNode } from 'react';

import User from '@/types/user.types';

type Auth = {
  isAuthenticated: boolean;
  user: User | null;
  login: (user: User) => void;
  logout: () => void;
};

const defaultValue: Auth = {
  isAuthenticated: false,
  user: null,
  login: (user: User) => {},
  logout: () => {},
};

const AuthContext = createContext(defaultValue);

type Props = {
  children: ReactNode;
};

const AuthProvider = ({ children }: Props) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  const login = (user: User) => {
    setIsAuthenticated(true);
    setUser(user);
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  return useContext(AuthContext);
};

export default AuthProvider;
