import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/header";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "sonner";
import { ThemeProvider } from "@/components/theme-provider";
import { AIChatPopup } from "@/components/ai-chat-popup";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Budget Buddy",
  description: "An AI-Powered Finance Tracking Solution for Smarter Money Management",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <head>
          <link rel="icon" href="/logo.png" sizes="any" />
        </head>
        <body className={`${inter.className}`}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <Header />
            <main className="min-h-screen">{children}</main>
          <Toaster richColors />

          <footer className="bg-emerald-50 dark:bg-emerald-950/20 py-12">
            <div className="container mx-auto px-4 text-center text-emerald-600/80">
              <p className="flex items-center justify-center gap-2 font-medium">Made with <span className="text-red-500 text-xl animate-pulse">❤️</span> by Budget Buddy</p>
            </div>
          </footer>
          <AIChatPopup />
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
