import { useState, useEffect, createContext, useContext } from 'react';

// todo: remove mock functionality - replace with real auth

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}

export function useAuthProvider() {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for stored user on mount
    const stored = localStorage.getItem('cricketUser');
    if (stored) {
      setUser(JSON.parse(stored));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, _password: string) => {
    // Mock login - in production this would call an API
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 500));
    const mockUser: User = {
      id: '1',
      name: email.split('@')[0],
      email,
    };
    localStorage.setItem('cricketUser', JSON.stringify(mockUser));
    setUser(mockUser);
    setIsLoading(false);
  };

  const signup = async (name: string, email: string, _password: string) => {
    // Mock signup - in production this would call an API
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 500));
    const mockUser: User = {
      id: crypto.randomUUID(),
      name,
      email,
    };
    localStorage.setItem('cricketUser', JSON.stringify(mockUser));
    setUser(mockUser);
    setIsLoading(false);
  };

  const logout = () => {
    localStorage.removeItem('cricketUser');
    setUser(null);
  };

  return { user, isLoading, login, signup, logout };
}

export { AuthContext };
