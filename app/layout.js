// This is the root layout component for your Next.js app.
// Learn more: https://nextjs.org/docs/app/building-your-application/routing/pages-and-layouts#root-layout-required
import { Inter } from "next/font/google";
import { cn } from "@/lib/utils";
import "./globals.css";
import SidebarNav from "@/components/sidebar";
import { SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import { ClerkProvider } from "@clerk/nextjs";

const fontHeading = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-heading",
});

const fontBody = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-body",
});

export default function Layout({ children }) {
  return (
    <ClerkProvider>
    <html lang="en">
      <body
        className={cn("", fontHeading.variable, fontBody.variable)}
        >
        {children}
    
      </body>
    </html>
        </ClerkProvider>
  );
}
