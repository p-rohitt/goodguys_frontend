import { Dashboard } from "@/components/dashboard";
import Image from "next/image";

export default function DashboardPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
     <Dashboard />
    </main>
  );
}
