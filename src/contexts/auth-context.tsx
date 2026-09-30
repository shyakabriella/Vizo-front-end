"use client";

import {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

import { authService } from "@/services/auth.service";
import {
  getAuthToken,
  removeAuthToken,
  saveAuthToken,
} from "@/lib/auth-storage";
import type { LoginPayload, RegisterPayload, User } from "@/types/auth";

interface AuthContextValue {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  isAdmin: boolean;
  login: (payload: LoginPayload, remember?: boolean) => Promise<User>;
  register: (payload: RegisterPayload) => Promise<User>;
  logout: () => Promise<void>;
  refreshUser: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const refreshUser = useCallback(async () => {
    const token = getAuthToken();

    if (!token) {
      setUser(null);
      setIsLoading(false);
      return;
    }

    try {
      const data = await authService.me();
      setUser(data.user);
    } catch {
      removeAuthToken();
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    void refreshUser();
  }, [refreshUser]);

  async function login(payload: LoginPayload, remember = true): Promise<User> {
    const data = await authService.login(payload, remember);

    setUser(data.user);

    return data.user;
  }

  async function register(payload: RegisterPayload): Promise<User> {
    const data = await authService.register(payload);

    saveAuthToken(data.token);
    setUser(data.user);

    return data.user;
  }

  async function logout(): Promise<void> {
    try {
      if (getAuthToken()) {
        await authService.logout();
      }
    } finally {
      removeAuthToken();
      setUser(null);
    }
  }

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      isLoading,
      isAuthenticated: Boolean(user),
      isAdmin: Boolean(
        user?.roles.some((role) => ["admin", "super_admin"].includes(role)),
      ),
      login,
      register,
      logout,
      refreshUser,
    }),
    [user, isLoading, refreshUser],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
