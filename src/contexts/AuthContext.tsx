import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { authAPI, removeToken, setToken } from '@/lib/api';

interface User {
  id: string;
  email: string;
  name: string;
  role?: 'user' | 'admin';
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  register: (email: string, password: string, name: string) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
  isAdmin: boolean;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Check for existing session on mount
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = localStorage.getItem('auth_token');
        if (token) {
          const response = await authAPI.getMe();
          // `getMe` may return either a flat user object or { user: {...} }
          const u = (response && response.id) ? response : (response && response.user) ? response.user : null;
          if (u) {
            setUser({
              id: u.id || u._id?.toString() || '',
              email: u.email,
              name: u.name,
              role: u.role || 'user'
            });
          }
        }
      } catch (error) {
        // Token invalid or expired
        removeToken();
      } finally {
        setLoading(false);
      }
    };
    checkAuth();
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      const response = await authAPI.login(email, password);
      if (response && response.user) {
        setUser({
          id: response.user.id || response.user._id?.toString() || '',
          email: response.user.email,
          name: response.user.name,
          role: response.user.role || 'user'
        });
        return true;
      }
      return false;
    } catch (error: any) {
      console.error('Login error:', error);
      return false;
    }
  };

  const register = async (email: string, password: string, name: string): Promise<boolean> => {
    try {
      const response = await authAPI.register(email, password, name);
      if (response && response.user) {
        setUser({
          id: response.user.id || response.user._id?.toString() || '',
          email: response.user.email,
          name: response.user.name,
          role: response.user.role || 'user'
        });
        return true;
      }
      return false;
    } catch (error: any) {
      console.error('Register error:', error);
      // Re-throw the error so the UI can display the actual error message
      throw error;
    }
  };

  const logout = () => {
    setUser(null);
    removeToken();
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      login, 
      register, 
      logout, 
      isAuthenticated: !!user,
      isAdmin: user?.role === 'admin',
      loading
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
