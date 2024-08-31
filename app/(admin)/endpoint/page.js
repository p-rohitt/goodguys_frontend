"use client";

import { APIDetails } from "@/components/apidetails";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useSearchParams } from 'next/navigation'

export default function EndpointDataPage() {
  const searchParams = useSearchParams()
 
  const path = searchParams.get('path')
  console.log("path ",path)

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <APIDetails endpointId={path} />
    </main>
  );
}
