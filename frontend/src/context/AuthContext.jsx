import { createContext, useContext, useState, useCallback } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(() => sessionStorage.getItem('jwt'));
  const [isAuthenticated, setIsAuthenticated] = useState(!!sessionStorage.getItem('jwt'));
  const [preferLogin, setPreferLogin] = useState(false);

  const login = (jwt) => {
    sessionStorage.setItem('jwt', jwt);
    setToken(jwt);
    setIsAuthenticated(true);
  };

  const logout = () => {
    sessionStorage.removeItem('jwt');
    setToken(null);
    setIsAuthenticated(false);
    setPreferLogin(true);
  };

  const clearPreferLogin = useCallback(() => setPreferLogin(false), []);

  return (
    <AuthContext.Provider value={{ token, isAuthenticated, login, logout, preferLogin, clearPreferLogin }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};
