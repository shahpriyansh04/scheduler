"use client";
import Navbar from "@/components/Navbar";
import { ConvexProvider, ConvexReactClient } from "convex/react";
import { Inter } from "next/font/google";
import "./globals.css";
import { AppProgressBar as ProgressBar } from "next-nprogress-bar";

const inter = Inter({ subsets: ["latin"] });
const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ConvexProvider client={convex}>
          <ProgressBar
            height="6px"
            options={{ showSpinner: false }}
            shallowRouting
          />
          {children}
        </ConvexProvider>
      </body>
    </html>
  );
}
