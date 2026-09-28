import type { ReactNode } from "react";

import { PublicHeader } from "@/components/public/public-header";

export default function PublicLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-white">
      <PublicHeader />
      {children}
    </div>
  );
}
