import { Inter } from "next/font/google";
import { cn } from "@/lib/utils";
import "./../globals.css";
import SidebarNav from "@/components/sidebar";
import { useAuth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs/server";
import { Scan } from "lucide-react";

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

export default async function Layout({ children }) {
    const { userId } = auth();
    // if (!userId) {
    //   return redirect("/login");
    // }
  return (
    <html lang="en">
      <body
        className={cn("", fontHeading.variable, fontBody.variable)}
        >
      <div className="flex">

      <SidebarNav />
      <main className="flex-grow">
        {children}
      </main>
      </div>
      </body>
    </html>
  );
}
