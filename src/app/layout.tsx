import type { Metadata } from "next";
import { Toaster } from "sonner";

import "./globals.css";

import { AuthProvider } from "@/contexts/auth-context";

export const metadata: Metadata = {
  title: {
    default: "Vizo",
    template: "%s | Vizo",
  },
  description:
    "Organize, publish and improve your business visibility across AI platforms.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="antialiased">
      <body className="min-h-screen bg-[#f6f8fc] font-sans text-[#10233f] antialiased">
        <AuthProvider>
          {children}

          <Toaster position="top-right" richColors closeButton />
        </AuthProvider>
      </body>
    </html>
  );
}
