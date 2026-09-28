"use client";

import { useRouter } from "next/navigation";
import { type ReactNode, useEffect } from "react";

import { useAuth } from "@/hooks/use-auth";
import type { UserRole } from "@/types/auth";

interface RoleGuardProps {
  children: ReactNode;
  roles: UserRole[];
}

export function RoleGuard({ children, roles }: RoleGuardProps) {
  const router = useRouter();
  const { user, isLoading } = useAuth();

  const allowed = user?.roles.some((role) => roles.includes(role)) ?? false;

  useEffect(() => {
    if (!isLoading && user && !allowed) {
      router.replace("/dashboard");
    }
  }, [allowed, isLoading, router, user]);

  if (isLoading || !user || !allowed) {
    return null;
  }

  return children;
}
