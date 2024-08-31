/**
 * v0 by Vercel.
 * @see https://v0.dev/t/TGoayeVZk89
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
"use client";

import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Select } from "@/components/ui/select";
import { Card } from "@/components/ui/card";
import { redirect } from "next/dist/server/api-utils";
import Link from "next/link"
export function Signup() {
  const [organizationType, setOrganizationType] = useState("new");
  const [selectedRole, setSelectedRole] = useState(null);

  const roles = [
    {
      id: "admin",
      title: "Admin",
      description: "Manage users, settings, and organization-wide features.",
    },
    {
      id: "securityAnalyst",
      title: "Security Analyst",
      description: "Monitor and analyze security events and incidents.",
    },
    {
      id: "developer",
      title: "Developer",
      description: "Build and deploy applications using our platform.",
    },
    {
      id: "supportAgent",
      title: "Support Agent",
      description: "Provide technical support to users and customers.",
    },
  ];

  const handleSelectRole = (role) => {
    setSelectedRole(role);
  };

  const handleSubmit = (e) => {
    e.preventDefault()
     redirect("login");
  };
  return (
    <div className="mx-auto max-w-[800px] space-y-8 mt-40 mb-40">
      <div className="space-y-2 text-center">
        <h1 className="text-4xl font-bold">Sign Up</h1>
        <p className="text-muted-foreground">
          Create your account and join our platform.
        </p>
      </div>
      <div className="space-y-6">
        <form className="grid gap-6" onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                placeholder="example@acme.com"
                
              />
              <p className="text-xs text-muted-foreground">
                Your email will be your primary identifier.
              </p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="********"
                
                pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*d)(?=.*[@$!%*?&])[A-Za-zd@$!%*?&]{8,}$"
                title="Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character."
              />
              <p className="text-xs text-muted-foreground">
                Your password must be at least 8 characters long and contain at
                least one uppercase letter, one lowercase letter, one number,
                and one special character.
              </p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="confirm-password">Confirm Password</Label>
              <Input
                id="confirm-password"
                type="password"
                placeholder="********"
                
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="full-name">Full Name</Label>
              <Input id="full-name" placeholder="John Doe"  />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="job-title">Job Title</Label>
              <Input id="job-title" placeholder="Software Engineer"  />
            </div>
            <div className="space-y-2">
              <Label htmlFor="company-name">Company Name</Label>
              <Input id="company-name" placeholder="Acme Inc."  />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone-number">Phone Number (optional)</Label>
            <Input
              id="phone-number"
              type="tel"
              placeholder="+1 (555) 555-5555"
            />
          </div>
        </form>
      </div>
      <div>
        <div className="space-y-2 text-center">
          <h2 className="text-2xl font-bold">Organization Setup</h2>
          <p className="text-muted-foreground">
            Set up your organization or join an existing one.
          </p>
        </div>
        <form className="grid gap-6">
          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="organization-type">Organization Type</Label>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="w-full justify-between">
                    <span>
                      {organizationType === "new"
                        ? "Create New Organization"
                        : "Join Existing Organization"}
                    </span>
                    <ChevronDownIcon className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start">
                  <DropdownMenuItem onSelect={() => setOrganizationType("new")}>
                    Create New Organization
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onSelect={() => setOrganizationType("join")}
                  >
                    Join Existing Organization
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            {organizationType === "new" && (
              <div className="space-y-2">
                <Label htmlFor="organization-name">Organization Name</Label>
                <Input
                  id="organization-name"
                  placeholder="Acme Inc."
                  
                />
              </div>
            )}
            {organizationType === "join" && (
              <div className="space-y-2">
                <Label htmlFor="organization-invite">
                  Organization Invite Code
                </Label>
                <Input id="organization-invite" placeholder="ABCD1234" />
              </div>
            )}
          </div>
          {organizationType === "new" && (
            <div className="grid grid-cols-2 gap-6">
              {/* <div className="space-y-2">
                <Label htmlFor="industry-sector">Industry Sector</Label>
                <select id="industry-sector">
                  <option value="">Select Industry Sector</option>
                  <option value="technology">Technology</option>
                  <option value="healthcare">Healthcare</option>
                  <option value="finance">Finance</option>
                  <option value="retail">Retail</option>
                  <option value="manufacturing">Manufacturing</option>
                </select>
              </div> */}
              <div className="space-y-2">
                <Label htmlFor="api-count">Approximate Number of APIs</Label>
                <Input id="api-count" type="number" placeholder=""  />
              </div>
              <div className="space-y-2">
                <Label htmlFor="api-count">Github URL</Label>
                <Input id="api-count" type="text" placeholder=""  />
              </div>
              <div className="space-y-2">
                <Label htmlFor="api-count"> Access Token</Label>
                <Input id="api-count" type="password" placeholder=""  />
                <p className="text-xs text-muted-foreground">
                  We need a GitHub personal access token to securely discover
                  and monitor APIs in your organization's repositories.
                  Important: Ensure you have admin access to the GitHub
                  organization you provided earlier. The token you create must
                  have sufficient permissions for this organization.
                </p>
              </div>
            </div>
          )}

          <div className="space-y-6">
            <div className="space-y-2 text-center">
              <h2 className="text-2xl font-bold">Role Selection</h2>
              <p className="text-muted-foreground">
                Choose your role within the organization.
              </p>
            </div>
            <div className="grid gap-4">
              <div className="grid grid-cols-2 gap-4">
                {roles.slice(0, 2).map((role) => (
                  <Card
                    key={role.id}
                    className={`p-4 flex flex-col gap-2 ${
                      selectedRole === role.id
                        ? "bg-blue-100 border border-blue-500"
                        : ""
                    }`}
                  >
                    <div className="text-lg font-bold">{role.title}</div>
                    <p className="text-muted-foreground">{role.description}</p>
                    <Button
                      variant="outline"
                      onClick={() => handleSelectRole(role.id)}
                    >
                      {selectedRole === role.id ? "Selected" : "Select Role"}
                    </Button>
                  </Card>
                ))}
              </div>
              <div className="grid grid-cols-2 gap-4">
                {roles.slice(2).map((role) => (
                  <Card
                    key={role.id}
                    className={`p-4 flex flex-col gap-2 ${
                      selectedRole === role.id
                        ? "bg-blue-100 border border-blue-500"
                        : ""
                    }`}
                  >
                    <div className="text-lg font-bold">{role.title}</div>
                    <p className="text-muted-foreground">{role.description}</p>
                    <Button
                      variant="outline"
                      onClick={() => handleSelectRole(role.id)}
                    >
                      {selectedRole === role.id ? "Selected" : "Select Role"}
                    </Button>
                  </Card>
                ))}
              </div>
            </div>
          </div>
          <Link href='verify' className="w-full bg-white text-black p-4 rounded-md text-center">
            Complete Setup
          </Link>
        </form>
      </div>
    </div>
  );
}

function ChevronDownIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}
