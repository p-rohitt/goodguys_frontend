'use client'
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useSignIn } from '@clerk/nextjs';
// import {signIn} from "@clerk/nextjs"
import { useState } from "react";
import { redirect } from "next/navigation"
import { useRouter } from 'next/navigation'
import Link from "next/link"
export function Login() {

  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();


      router.push('dashboard');

      return;
  };
  return (
    (<Card className="w-full max-w-md mx-auto">
      <form onSubmit={handleSubmit}>
      <CardHeader className="space-y-2 text-center">
        <CardTitle className="text-3xl font-bold">API Security Shield</CardTitle>
        <CardDescription>Enter your email and password to access your account.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
              id="email"
              type="email"
              placeholder="m@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
        </div>
        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            {error && <p className="text-red-500 text-center">{error}</p>}
        </div>
      </CardContent>
      <CardFooter className="flex flex-col gap-2 items-center justify-center">
        <Button type="submit" className="w-full">
          Sign in
        </Button>
        <Link href="signup" className="w-full text-center  gap-2">
          Not a member?  <span className="underline">
            
             Register
            </span>
        </Link>
        
      </CardFooter>
      
      </form>
      
    </Card>)
  );
}
