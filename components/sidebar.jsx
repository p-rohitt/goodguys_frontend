import React from 'react'
import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip"
import Link from "next/link"

import { BugIcon, CalendarIcon, CodeIcon, HomeIcon, LayoutDashboardIcon, PiIcon, ScanIcon, SettingsIcon, Sidebar, TicketIcon } from "lucide-react"



const SidebarNav = () => {
  return (
    <aside
        className="fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-background sm:flex">

<nav className="flex flex-col items-center gap-4 px-2 sm:py-5">
            <TooltipProvider>
              <Link
                href="dashboard"
                className="group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:h-8 md:w-8 md:text-base"
                prefetch={false}>
                <LayoutDashboardIcon className="h-4 w-4 transition-all group-hover:scale-110" />
                <span className="sr-only">API Dashboard</span>
              </Link>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link
                    href="dashboard"
                    className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent text-accent-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
                    prefetch={false}>
                    <LayoutDashboardIcon className="h-5 w-5" />
                    <span className="sr-only">Dashboard</span>
                  </Link>
                </TooltipTrigger>
                <TooltipContent side="right">Dashboard</TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link
                    href="scan"
                    className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
                    prefetch={false}>
                    <PiIcon className="h-5 w-5" />
                    <span className="sr-only">APIs</span>
                  </Link>
                </TooltipTrigger>
                <TooltipContent side="right"> API Scanning</TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link
                    href="reports"
                    className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
                    prefetch={false}>
                    <BugIcon className="h-5 w-5" />
                    <span className="sr-only">Reports</span>
                  </Link>
                </TooltipTrigger>
                <TooltipContent side="right">Reports</TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link
                    href="tickets"
                    className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
                    prefetch={false}>
                    <TicketIcon className="h-5 w-5" />
                    <span className="sr-only">Tickets</span>
                  </Link>
                </TooltipTrigger>
                <TooltipContent side="right">Tickets</TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </nav>
          
        <nav className="mt-auto flex flex-col items-center gap-4 px-2 sm:py-5">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  href="#"
                  className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
                  prefetch={false}>
                  <SettingsIcon className="h-5 w-5" />
                  <span className="sr-only">Settings</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">Settings</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </nav>
      </aside>
    
  )
}

export default SidebarNav


