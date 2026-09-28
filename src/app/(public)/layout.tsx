import type { ReactNode } from "react";

import { PublicFooter } from "@/components/public/public-footer";
import { PublicHeader } from "@/components/public/public-header";

type PublicLayoutProps = {
  children: ReactNode;
};

export default function PublicLayout({ children }: PublicLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      <PublicHeader />

      <div className="flex-1">{children}</div>

      <PublicFooter />
    </div>
  );
}
