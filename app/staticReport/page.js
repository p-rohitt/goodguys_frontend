"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { StaticReport } from "@/components/static-report";

export default function StaticReportSinglePage() {
  const searchParams = useSearchParams();

  const id = searchParams.get("id");
  console.log("id ", id);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <StaticReport id={id} />
    </main>
  );
}
