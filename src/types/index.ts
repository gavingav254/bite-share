// src/types/index.ts
export type UserRole = 'student' | 'donor';

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  avatar?: string;
  karmaPoints?: number;
  studentId?: string;
  preferences?: string[];
}

export interface Request {
  id: string;
  studentId: string;
  studentName: string;
  type: 'food' | 'money' | 'essentials';
  title: string;
  description: string;
  urgency: 'low' | 'medium' | 'high';
  status: 'pending' | 'accepted' | 'fulfilled';
  createdAt: string;
  amount?: number;
  items?: string[];
}

export interface Donation {
  id: string;
  donorId: string;
  requestId: string;
  amount: number;
  message?: string;
  createdAt: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

export interface AppState {
  auth: AuthState;
  requests: Request[];
  donations: Donation[];
  karmaLeaderboard: User[];
}