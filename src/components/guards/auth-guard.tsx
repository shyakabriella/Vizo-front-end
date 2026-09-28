"use client";

import { LoaderCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { type ReactNode, useEffect } from "react";

import { useAuth } from "@/hooks/use-auth";

export function AuthGuard({ children }: { children: ReactNode }) {
  const router = useRouter();
  const { user, isLoading } = useAuth();

  useEffect(() => {
    if (!isLoading && !user) {
      router.replace("/login");
    }
  }, [isLoading, router, user]);

  if (isLoading || !user) {
    return (
      <div className="grid min-h-screen place-items-center bg-[#f6f8fc]">
        <LoaderCircle className="size-8 animate-spin text-[#08758a]" />
      </div>
    );
  }

  return children;
}
