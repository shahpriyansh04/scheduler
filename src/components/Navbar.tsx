import React from "react";
import { Button } from "./ui/button";
import Link from "next/link";

export default function Navbar() {
  return (
    <header className="bg-primary text-primary-foreground py-4 px-6 shadow">
      <div className="container mx-auto flex items-center justify-between">
        <Link href="#" className="text-xl font-bold" prefetch={false}>
          College Class Scheduler
        </Link>
        <nav className="flex items-center gap-4">
          <Link href="#" className="hover:underline" prefetch={false}>
            Admin Dashboard
          </Link>
          <Link href="#" className="hover:underline" prefetch={false}>
            Schedule Search
          </Link>
          <Button variant="secondary" size="sm">
            Login
          </Button>
        </nav>
      </div>
    </header>
  );
}
