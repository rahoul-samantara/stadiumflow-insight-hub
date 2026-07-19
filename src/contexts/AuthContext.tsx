import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { demoUsers } from "@/data/mockData";
import type { DemoUser, Role } from "@/types";

interface AuthState {
  user: DemoUser | null;
  login: (userId: string) => DemoUser | null;
  logout: () => void;
  hasRole: (role: Role) => boolean;
}

const AuthContext = createContext<AuthState | null>(null);
const STORAGE_KEY = "stadiumflow.user";

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<DemoUser | null>(null);

  useEffect(() => {
    try {
      const id = typeof window !== "undefined" ? window.localStorage.getItem(STORAGE_KEY) : null;
      if (id) {
        const found = demoUsers.find((u) => u.id === id) ?? null;
        setUser(found);
      }
    } catch {
      // ignore
    }
  }, []);

  const login = (userId: string) => {
    const found = demoUsers.find((u) => u.id === userId) ?? null;
    setUser(found);
    if (found && typeof window !== "undefined") {
      window.localStorage.setItem(STORAGE_KEY, found.id);
    }
    return found;
  };

  const logout = () => {
    setUser(null);
    if (typeof window !== "undefined") window.localStorage.removeItem(STORAGE_KEY);
  };

  const hasRole = (role: Role) => user?.role === role;

  return (
    <AuthContext.Provider value={{ user, login, logout, hasRole }}>{children}</AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
}