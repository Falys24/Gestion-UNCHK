import React, { createContext, useContext, useState, useEffect } from 'react';

// Define user roles
export type UserRole = 'admin' | 'faculty' | 'student';

// Define user type
export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}

// Sample users for demo purposes
const sampleUsers = [
  { 
    id: '1', 
    email: 'admin@university.edu', 
    password: 'admin123', 
    name: 'Admin User',
    role: 'admin' as UserRole 
  },
  { 
    id: '2', 
    email: 'faculty@university.edu', 
    password: 'faculty123', 
    name: 'Faculty User',
    role: 'faculty' as UserRole 
  },
  { 
    id: '3', 
    email: 'student@university.edu', 
    password: 'student123', 
    name: 'Student User',
    role: 'student' as UserRole 
  }
];

// Define context type
interface AuthContextType {
  user: User | null;
  loading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

// Create context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Auth provider component
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Check for saved user in localStorage on initial load
  useEffect(() => {
    const savedUser = localStorage.getItem('universityUser');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  // Login function
  const login = async (email: string, password: string) => {
    setLoading(true);
    setError(null);
    
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Find user with matching credentials
      const matchedUser = sampleUsers.find(
        u => u.email === email && u.password === password
      );
      
      if (matchedUser) {
        // Create user object without password
        const { password: _, ...userWithoutPassword } = matchedUser;
        
        // Save user to state and localStorage
        setUser(userWithoutPassword);
        localStorage.setItem('universityUser', JSON.stringify(userWithoutPassword));
      } else {
        throw new Error('Invalid email or password');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  // Logout function
  const logout = () => {
    setUser(null);
    localStorage.removeItem('universityUser');
  };

  return (
    <AuthContext.Provider value={{ user, loading, error, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};