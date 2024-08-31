// This is the root layout component for your Next.js app.
// Learn more: https://nextjs.org/docs/app/building-your-application/routing/pages-and-layouts#root-layout-required
import { Inter } from "next/font/google";
import { cn } from "@/lib/utils";
import "./globals.css";
import SidebarNav from "@/components/sidebar";
import { SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import { ClerkProvider } from "@clerk/nextjs";
import { Roboto } from 'next/font/google'
import { Work_Sans } from 'next/font/google';
import { Toaster } from "@/components/ui/sonner"
const fontHeading = Work_Sans({
  subsets: ["latin"],
  weight: ["400", "700"], // Specify the weights you need, e.g., regular (400) and bold (700)
  display: "swap",
  variable: "--font-heading",
});

const fontBody = Work_Sans({
  subsets: ["latin"],
  weight: ["300", "400"], // Specify the weights you need, e.g., light (300) and regular (400)
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
        <Toaster />
      </body>
    </html>
        </ClerkProvider>
  );
}
