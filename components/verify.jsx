/**
* This code was generated by v0 by Vercel.
* @see https://v0.dev/t/OtNF5dfalAU
* Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
*/

/** Add fonts into your Next.js project:

import { Arimo } from 'next/font/google'

arimo({
  subsets: ['latin'],
  display: 'swap',
})

To read more about using these font, please visit the Next.js documentation:
- App Directory: https://nextjs.org/docs/app/building-your-application/optimizing/fonts
- Pages Directory: https://nextjs.org/docs/pages/building-your-application/optimizing/fonts
**/

import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useState } from "react";
import {useRouter} from "next/navigation"

export function Verify() {
  const [isLoading, setIsLoading] = useState(false);
  const [msg, setMsg] = useState("");
  const router = useRouter(); // Initialize the router

  const handleVerify = () => {
    setIsLoading(true);
    setMsg("Please wait while we verify your code...");

    // Simulate a 5-second verification process
    setTimeout(() => {
      setIsLoading(false);
      setMsg(""); // Clear the message

      // Redirect to the dashboard
      router.push("/ci-cd-integration");
    }, 5000);
  };

  return (
    <div className="flex min-h-[100dvh] flex-col items-center justify-center bg-background px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-md space-y-6 text-center">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl">Verify your email</h1>
          <p className="text-muted-foreground">
            We've sent a verification code to your email. Enter the code below to confirm your identity.
          </p>
        </div>
        <div className="space-y-4 flex justify-center flex-col">
          <div className="ml-20">
            <InputOTP maxLength={6} pattern="^[0-9]+$" className="flex justify-center">
              <InputOTPGroup className="flex space-x-2">
                <InputOTPSlot index={0} />
                <InputOTPSlot index={1} />
                <InputOTPSlot index={2} />
                <InputOTPSlot index={3} />
                <InputOTPSlot index={4} />
                <InputOTPSlot index={5} />
              </InputOTPGroup>
            </InputOTP>
          </div>
          <div className="flex items-center justify-between">
            <Button type="submit" className="w-full" onClick={handleVerify}>
              {isLoading ? "Verifying..." : "Verify"}
            </Button>
          </div>
          {msg && <p className="text-sm text-muted-foreground mt-4">{msg}</p>}
          <p className="text-sm text-muted-foreground">
            Didn't receive the code?{" "}
            <Link
              href="#"
              className="font-medium underline underline-offset-4"
              prefetch={false}>
              Resend code
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}