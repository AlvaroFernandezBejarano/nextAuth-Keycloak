"use client";

import "./globals.scss";
import { Navbar } from "@/components/Navbar/Navbar";
import { SessionProvider } from "next-auth/react";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <div className="grid-container">
          <SessionProvider>
            <Navbar />
            {children}
          </SessionProvider>
        </div>
      </body>
    </html>
  );
}
