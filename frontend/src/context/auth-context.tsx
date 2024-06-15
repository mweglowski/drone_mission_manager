import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface AuthContextType {
  email: string | null;
  token: string | null;
  login: (email: string, token: string) => void;
  logout: () => void;
}

interface AuthProviderProps {
  children: ReactNode;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [email, setEmail] = useState<string | null>(null);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const storedEmail = localStorage.getItem('email');
    const storedToken = localStorage.getItem('token');
    if (storedEmail && storedToken) {
      setEmail(storedEmail);
      setToken(storedToken);
    }
  }, []);

  const login = (email: string, token: string) => {
    setEmail(email);
    setToken(token);
    localStorage.setItem('email', email);
    localStorage.setItem('token', token);
  };

  const logout = () => {
    setEmail(null);
    setToken(null);
    localStorage.removeItem('email');
    localStorage.removeItem('token');
  };

  return (
    <AuthContext.Provider value={{ email, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// CUSTOM HOOK
const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export { AuthProvider, useAuth };
