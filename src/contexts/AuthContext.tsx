import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, login as loginService, logout as logoutService, 
         getCurrentUser, initAuth } from '../services/authService';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  isMember: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  loading: boolean;
  error: string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Initialize auth state on component mount
  useEffect(() => {
    initAuth();
    setUser(getCurrentUser());
    setLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    try {
      setLoading(true);
      setError(null);
      const authState = await loginService(email, password);
      setUser(authState.user);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    logoutService();
    setUser(null);
  };

  const isAuthenticated = !!user;
  const isAdmin = user?.role === 'admin';
  const isMember = user?.role === 'member';

  const value = {
    user,
    isAuthenticated,
    isAdmin,
    isMember,
    login,
    logout,
    loading,
    error
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// import React, { 
//     createContext, 
//     useState, 
//     useContext, 
//     ReactNode 
//   } from 'react';
  
//   interface User {
//     id: string;
//     username: string;
//     email: string;
//     role: 'ADMIN' | 'MEMBER' | 'GUEST';
//   }
  
//   interface AuthContextType {
//     user: User | null;
//     isAuthenticated: boolean;
//     login: (username: string, password: string) => Promise<void>;
//     logout: () => void;
//   }
  
//   const AuthContext = createContext<AuthContextType | undefined>(undefined);
  
//   export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
//     const [user, setUser] = useState<User | null>(null);
//     const [isAuthenticated, setIsAuthenticated] = useState(false);
  
//     const login = async (username: string, password: string) => {
//       // Mock login - replace with actual authentication logic
//       if (username === 'admin' && password === 'password') {
//         const adminUser: User = {
//           id: '1',
//           username: 'admin',
//           email: 'admin@example.com',
//           role: 'ADMIN'
//         };
//         setUser(adminUser);
//         setIsAuthenticated(true);
//       } else if (username === 'member' && password === 'password') {
//         const memberUser: User = {
//           id: '2',
//           username: 'member2025',
//           email: 'member@example.com',
//           role: 'MEMBER'
//         };
//         setUser(memberUser);
//         setIsAuthenticated(true);
//       } else {
//         throw new Error('Invalid credentials');
//       }
//     };
  
//     const logout = () => {
//       setUser(null);
//       setIsAuthenticated(false);
//     };
  
//     return (
//       <AuthContext.Provider value={{ 
//         user, 
//         isAuthenticated, 
//         login, 
//         logout 
//       }}>
//         {children}
//       </AuthContext.Provider>
//     );
//   };
  
//   export const useAuth = () => {
//     const context = useContext(AuthContext);
//     if (context === undefined) {
//       throw new Error('useAuth must be used within an AuthProvider');
//     }
//     return context;
//   };