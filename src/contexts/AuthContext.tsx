import { createContext, useContext, useState, ReactNode } from 'react';

export type UserRole = 'learner' | 'recruiter' | 'instructor';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  streak: number;
  points: number;
  rank: number;
  level: number;
  joinDate: string;
  bio?: string;
  company?: string;
  jobTitle?: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => void;
  signup: (name: string, email: string, password: string, role: UserRole) => void;
  logout: () => void;
  setRole: (role: UserRole) => void;
  selectedRole: UserRole | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const mockUsers: Record<UserRole, User> = {
  learner: {
    id: '1',
    name: 'Alex Thompson',
    email: 'alex@example.com',
    role: 'learner',
    streak: 5,
    points: 2450,
    rank: 42,
    level: 12,
    joinDate: '2025-09-15',
    bio: 'Full-stack developer passionate about learning new technologies',
    company: 'TechCorp',
    jobTitle: 'Software Engineer',
  },
  recruiter: {
    id: '2',
    name: 'Sarah Chen',
    email: 'sarah@company.com',
    role: 'recruiter',
    streak: 0,
    points: 0,
    rank: 0,
    level: 0,
    joinDate: '2025-11-01',
    company: 'InnovateTech',
    jobTitle: 'Senior Recruiter',
  },
  instructor: {
    id: '3',
    name: 'Dr. Michael Park',
    email: 'michael@edu.com',
    role: 'instructor',
    streak: 0,
    points: 0,
    rank: 0,
    level: 0,
    joinDate: '2025-06-10',
    company: 'CodeAcademy Pro',
    jobTitle: 'Lead Instructor',
  }
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [selectedRole, setSelectedRole] = useState<UserRole | null>(null);

  const login = (_email: string, _password: string) => {
    const role = selectedRole || 'learner';
    setUser(mockUsers[role]);
  };

  const signup = (name: string, email: string, _password: string, role: UserRole) => {
    setUser({ ...mockUsers[role], name, email });
  };

  const logout = () => {
    setUser(null);
    setSelectedRole(null);
  };

  const setRole = (role: UserRole) => {
    setSelectedRole(role);
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, login, signup, logout, setRole, selectedRole }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
}
