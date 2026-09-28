import type { AuthUser } from "@/types/auth";

const TOKEN_KEY = "vizo_auth_token";
const USER_KEY = "vizo_auth_user";

function isBrowser(): boolean {
  return typeof window !== "undefined";
}

function activeStorage(): Storage | null {
  if (!isBrowser()) {
    return null;
  }

  if (window.localStorage.getItem(TOKEN_KEY)) {
    return window.localStorage;
  }

  if (window.sessionStorage.getItem(TOKEN_KEY)) {
    return window.sessionStorage;
  }

  return null;
}

export function saveAuth(token: string, user: AuthUser, remember = true): void {
  if (!isBrowser()) {
    return;
  }

  clearAuth();

  const storage = remember ? window.localStorage : window.sessionStorage;

  storage.setItem(TOKEN_KEY, token);
  storage.setItem(USER_KEY, JSON.stringify(user));
}

export function getToken(): string | null {
  if (!isBrowser()) {
    return null;
  }

  return (
    window.localStorage.getItem(TOKEN_KEY) ??
    window.sessionStorage.getItem(TOKEN_KEY)
  );
}

export function getStoredUser(): AuthUser | null {
  const storage = activeStorage();

  if (!storage) {
    return null;
  }

  const value = storage.getItem(USER_KEY);

  if (!value) {
    return null;
  }

  try {
    return JSON.parse(value) as AuthUser;
  } catch {
    clearAuth();

    return null;
  }
}

export function updateStoredUser(user: AuthUser): void {
  const storage = activeStorage();

  if (!storage) {
    return;
  }

  storage.setItem(USER_KEY, JSON.stringify(user));
}

export function clearAuth(): void {
  if (!isBrowser()) {
    return;
  }

  window.localStorage.removeItem(TOKEN_KEY);
  window.localStorage.removeItem(USER_KEY);

  window.sessionStorage.removeItem(TOKEN_KEY);
  window.sessionStorage.removeItem(USER_KEY);
}

/*
 * Compatibility functions for the older authentication context.
 * New code should use saveAuth(), getToken() and clearAuth().
 */

export function saveAuthToken(token: string): void {
  if (!isBrowser()) {
    return;
  }

  window.localStorage.setItem(TOKEN_KEY, token);
  window.sessionStorage.removeItem(TOKEN_KEY);
}

export function getAuthToken(): string | null {
  return getToken();
}

export function removeAuthToken(): void {
  clearAuth();
}
