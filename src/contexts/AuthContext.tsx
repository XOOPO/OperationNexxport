import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import * as OTPAuth from 'otpauth';

interface User {
  username: string;
  email: string;
  password: string;
  displayName: string;
  isAdmin?: boolean;
  lastLoginIP?: string;
  lastLoginAt?: string;
  createdDate?: string;
  updatedDate?: string;
  twoFactorEnabled?: boolean;
  twoFactorSecret?: string;
}

interface AuthContextType {
  user: User | null;
  users: User[];
  login: (email: string, password: string, totpCode?: string) => Promise<{ success: boolean; requires2FA?: boolean }>;
  logout: () => void;
  updateUserPassword: (email: string, newPassword: string) => void;
  updateUserInfo: (email: string, username: string, displayName: string) => boolean;
  addUser: (newUser: User) => boolean;
  deleteUser: (email: string) => boolean;
  isAdmin: boolean;
  toggleTwoFactor: (email: string) => { enabled: boolean; secret?: string; uri?: string };
  verifyTOTP: (email: string, token: string) => boolean;
}

const AUTHORIZED_USERS: User[] = [
  { username: 'PE_NICC', email: 'Claudionicholas12@gmail.com', password: 'AAaa1234**', displayName: 'PE_NICC', isAdmin: true },
  { username: 'BM_YULITA', email: 'yulitagreacelia0507@gmail.com', password: 'AAaa1234**', displayName: 'BM_YULITA' },
  { username: 'PE_YOHANA', email: 'fyohana09@gmail.com', password: 'AAaa1234**', displayName: 'PE_YOHANA' },
  { username: 'PE_XANN', email: 'shengwangli2002@gmail.com', password: 'AAaa1234**', displayName: 'PE_XANN' },
  { username: 'M1_MATTHEW', email: 'matthewl010713@gmail.com', password: 'AAaa1234**', displayName: 'M1_MATTHEW' },
  { username: 'WP_REBECCA', email: 'evewong123001@gmail.com', password: 'AAaa1234**', displayName: 'WP_REBECCA' },
  { username: 'WP_ERIC', email: 'ericleong147258@gmail.com', password: 'AAaa1234**', displayName: 'WP_ERIC' },
  { username: 'BM_DANIAL', email: 'crsnnexmax@gmail.com', password: 'AAaa1234**', displayName: 'BM_DANIAL' },
  { username: 'BM_JANET', email: 'sreynichchin66@gmail.com', password: 'AAaa1234**', displayName: 'BM_JANET' },
  { username: 'PE_MICHELLE', email: 'chellisblessed@gmail.com', password: 'AAaa1234**', displayName: 'Payment Executive' }
];

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [users, setUsers] = useState<User[]>(() => {
    const stored = localStorage.getItem('authorized_users');
    return stored ? JSON.parse(stored) : AUTHORIZED_USERS;
  });

  useEffect(() => {
    localStorage.setItem('authorized_users', JSON.stringify(users));
  }, [users]);

  useEffect(() => {
    const storedUser = localStorage.getItem('current_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const verifyTOTP = (email: string, token: string): boolean => {
    const targetUser = users.find(u => u.email === email);
    if (!targetUser || !targetUser.twoFactorEnabled || !targetUser.twoFactorSecret) {
      return false;
    }

    try {
      const totp = new OTPAuth.TOTP({
        issuer: 'NEXXPORT',
        label: email,
        algorithm: 'SHA1',
        digits: 6,
        period: 30,
        secret: targetUser.twoFactorSecret
      });

      const delta = totp.validate({ token, window: 1 });
      return delta !== null;
    } catch (error) {
      console.error('TOTP verification error:', error);
      return false;
    }
  };

  const login = async (email: string, password: string, totpCode?: string): Promise<{ success: boolean; requires2FA?: boolean }> => {
    const storedUsers = localStorage.getItem('authorized_users');
    const latestUsers = storedUsers ? JSON.parse(storedUsers) : AUTHORIZED_USERS;
    
    const foundUser = latestUsers.find((u: User) => u.email === email && u.password === password);
    if (!foundUser) {
      return { success: false };
    }

    // Check if 2FA is enabled
    if (foundUser.twoFactorEnabled) {
      if (!totpCode) {
        return { success: false, requires2FA: true };
      }

      // Verify TOTP code
      if (!verifyTOTP(email, totpCode)) {
        return { success: false };
      }
    }

    let ipAddress = 'Unknown';
    try {
      const response = await fetch('https://api.ipify.org?format=json');
      const data = await response.json();
      ipAddress = data.ip;
    } catch (error) {
      console.error('Failed to fetch IP:', error);
    }

    const now = new Date().toISOString();
    const updatedUser = {
      ...foundUser,
      lastLoginIP: ipAddress,
      lastLoginAt: now,
      updatedDate: now,
      createdDate: foundUser.createdDate || now
    };

    const updatedUsers = latestUsers.map((u: User) => 
      u.email === email ? updatedUser : u
    );

    setUser(updatedUser);
    setUsers(updatedUsers);
    localStorage.setItem('current_user', JSON.stringify(updatedUser));
    localStorage.setItem('authorized_users', JSON.stringify(updatedUsers));
    return { success: true };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('current_user');
  };

  const updateUserPassword = (email: string, newPassword: string) => {
    const now = new Date().toISOString();
    setUsers(prevUsers => {
      const updated = prevUsers.map(u => 
        u.email === email ? { ...u, password: newPassword, updatedDate: now } : u
      );
      return updated;
    });
    
    if (user && user.email === email) {
      const updatedUser = { ...user, password: newPassword, updatedDate: now };
      setUser(updatedUser);
      localStorage.setItem('current_user', JSON.stringify(updatedUser));
    }
  };

  const updateUserInfo = (email: string, username: string, displayName: string): boolean => {
    const now = new Date().toISOString();
    setUsers(prevUsers => {
      const updated = prevUsers.map(u => 
        u.email === email ? { ...u, username, displayName, updatedDate: now } : u
      );
      return updated;
    });
    
    if (user && user.email === email) {
      const updatedUser = { ...user, username, displayName, updatedDate: now };
      setUser(updatedUser);
      localStorage.setItem('current_user', JSON.stringify(updatedUser));
    }
    
    return true;
  };

  const addUser = (newUser: User): boolean => {
    if (!user?.isAdmin) {
      return false;
    }
    
    const userExists = users.some(u => u.email === newUser.email);
    if (userExists) {
      return false;
    }
    
    const now = new Date().toISOString();
    const userToAdd = {
      ...newUser,
      isAdmin: newUser.isAdmin || false,
      createdDate: now,
      updatedDate: now
    };
    
    setUsers(prevUsers => {
      const updated = [...prevUsers, userToAdd];
      localStorage.setItem('authorized_users', JSON.stringify(updated));
      return updated;
    });
    
    return true;
  };

  const deleteUser = (email: string): boolean => {
    if (!user?.isAdmin) {
      return false;
    }
    
    if (email === 'Claudionicholas12@gmail.com') {
      return false;
    }
    
    setUsers(prevUsers => prevUsers.filter(u => u.email !== email));
    return true;
  };

  const toggleTwoFactor = (email: string) => {
    const targetUser = users.find(u => u.email === email);
    if (!targetUser) {
      return { enabled: false };
    }

    const newEnabled = !targetUser.twoFactorEnabled;
    let secret = targetUser.twoFactorSecret;
    let uri = '';

    if (newEnabled) {
      if (!secret) {
        // Generate a new secret using OTPAuth
        const totp = new OTPAuth.TOTP({
          issuer: 'NEXXPORT',
          label: email,
          algorithm: 'SHA1',
          digits: 6,
          period: 30
        });
        secret = totp.secret.base32;
      }

      // Generate URI for QR code
      const totp = new OTPAuth.TOTP({
        issuer: 'NEXXPORT',
        label: email,
        algorithm: 'SHA1',
        digits: 6,
        period: 30,
        secret: secret
      });
      uri = totp.toString();
    }

    setUsers(prevUsers => {
      const updated = prevUsers.map(u => 
        u.email === email ? { ...u, twoFactorEnabled: newEnabled, twoFactorSecret: secret } : u
      );
      return updated;
    });

    if (user && user.email === email) {
      const updatedUser = { ...user, twoFactorEnabled: newEnabled, twoFactorSecret: secret };
      setUser(updatedUser);
      localStorage.setItem('current_user', JSON.stringify(updatedUser));
    }

    return { enabled: newEnabled, secret: newEnabled ? secret : undefined, uri: newEnabled ? uri : undefined };
  };

  const isAdmin = user?.isAdmin === true;

  return (
    <AuthContext.Provider value={{ user, users, login, logout, updateUserPassword, updateUserInfo, addUser, deleteUser, isAdmin, toggleTwoFactor, verifyTOTP }}>
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