// src/services/authService.ts

// User types and interfaces
export interface User {
    id: string;
    username: string;
    email: string;
    role: 'admin' | 'member';
  }
  
  interface AuthState {
    user: User | null;
    token: string | null;
    isAuthenticated: boolean;
  }
  
  // Mock user database
  const USERS: User[] = [
    {
      id: '1',
      username: 'admin',
      email: 'admin@example.com',
      role: 'admin'
    },
    {
      id: '2',
      username: 'member1',
      email: 'member1@example.com',
      role: 'member'
    }
  ];
  
  const CREDENTIALS = {
    'admin@example.com': 'admin123',
    'member1@example.com': 'member123'
  };
  
  // Initial auth state
  let authState: AuthState = {
    user: null,
    token: null,
    isAuthenticated: false
  };
  
  // Login function
  export const login = async (email: string, password: string): Promise<AuthState> => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Check if credentials are valid
        // if (CREDENTIALS[email] !== password) {
        //   reject(new Error('Invalid credentials'));
        //   return;
        // }
  
        // Find user
        const user = USERS.find(u => u.email === email);
        
        if (!user) {
          reject(new Error('User not found'));
          return;
        }
  
        const token = `mock-jwt-token-${Date.now()}-${user.role}`;
        
        // Update auth state
        authState = {
          user,
          token,
          isAuthenticated: true
        };
  
        // Store in localStorage (in real app, consider security implications)
        localStorage.setItem('auth', JSON.stringify(authState));
        
        resolve(authState);
      }, 500);
    });
  };
  
  // Logout function
  export const logout = (): void => {
    // Clear auth state
    authState = {
      user: null,
      token: null,
      isAuthenticated: false
    };
    
    // Remove from localStorage
    localStorage.removeItem('auth');
  };
  
  // Check if user is authenticated
  export const isAuthenticated = (): boolean => {
    return authState.isAuthenticated;
  };
  
  // Get current user
  export const getCurrentUser = (): User | null => {
    return authState.user;
  };
  
  // Check if user has a specific role
  export const hasRole = (role: 'admin' | 'member'): boolean => {
    return authState.user?.role === role;
  };
  
  // Initialize auth state from localStorage (on app startup)
  export const initAuth = (): void => {
    const storedAuth = localStorage.getItem('auth');
    if (storedAuth) {
      try {
        authState = JSON.parse(storedAuth);
      } catch (error) {
        console.error('Failed to parse stored auth data', error);
        localStorage.removeItem('auth');
      }
    }
  };