import React from "react";
import { Button } from "./ui/button";
import { PenBox, LayoutDashboard, Bot } from "lucide-react";
import Link from "next/link";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import { checkUser } from "@/lib/checkUser";
import { ThemeToggle } from "./theme-toggle";
import Image from "next/image";

const Header = async () => {
  await checkUser();

  return (
    <header className="fixed top-0 w-full bg-white/80 backdrop-blur-md z-50 border-b">
      <nav className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center justify-between">
          <Image
            src={"/logo.png"}
            alt="Budget Buddy Logo"
            width={200}
            height={100}
            className="h-16 w-auto object-contain"
          />
          <p className="font-montserrat text-3xl font-bold gradient-title" >Budget Buddy</p>
        </Link>

        {/* Navigation Links - Different for signed in/out users */}
        <div className="hidden md:flex items-center space-x-8">
          <SignedOut>
            <a href="#features" className="text-gray-600 hover:text-emerald-600">
              Features
            </a>
            <a
              href="#testimonials"
              className="text-gray-600 hover:text-emerald-600"
            >
              Testimonials
            </a>
          </SignedOut>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center space-x-4">
          <SignedIn>
            <Link
              href="/dashboard"
              className="text-gray-600 hover:text-emerald-600 flex items-center gap-2"
            >
              <Button variant="outline">
                <LayoutDashboard size={18} />
                <span className="hidden md:inline">Dashboard</span>
              </Button>
            </Link>
            <a href="/transaction/create">
              <Button className="flex items-center gap-2">
                <PenBox size={18} />
                <span className="hidden md:inline">Add Transaction</span>
              </Button>
            </a>
            <Link href="/advisor">
              <Button variant="outline" className="flex items-center gap-2 border-emerald-500 text-emerald-600 hover:bg-emerald-50">
                <Bot size={18} />
                <span className="hidden md:inline">AI Advisor</span>
              </Button>
            </Link>
          </SignedIn>
          <SignedOut>
            <SignInButton forceRedirectUrl="/dashboard">
              <Button variant="outline">Login</Button>
            </SignInButton>
          </SignedOut>
          <SignedIn>
            <UserButton
              appearance={{
                elements: {
                  avatarBox: "w-10 h-10",
                },
              }}
            />
          </SignedIn>
          <ThemeToggle />
        </div>
      </nav>
    </header>
  );
};

export default Header;
