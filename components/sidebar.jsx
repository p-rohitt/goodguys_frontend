"use client"

import React, { useState } from 'react';
import Link from 'next/link';
import { LayoutDashboardIcon, PiIcon, BugIcon, TicketIcon, SettingsIcon, Infinity } from 'lucide-react';

const SidebarNav = () => {
  const [isCollapsed, setIsCollapsed] = useState(true);

  return (
    <aside
      className={`fixed inset-y-0 left-0 z-10 flex flex-col border-r bg-background ${isCollapsed ? 'w-16' : 'w-44'} transition-all duration-300 ease-in-out`}
      onMouseEnter={() => setIsCollapsed(false)}
      onMouseLeave={() => setIsCollapsed(true)}
      style={{ overflowX: 'hidden' }} // Prevent overflow when expanding
    >
      <nav className="flex flex-col items-start gap-4 px-4 py-5">
        <Link
          href="dashboard"
          className="flex items-center gap-4 p-2 rounded-2xl hover:bg-accent transition-colors"
          prefetch={false}
        >
          <LayoutDashboardIcon className={`h-5 w-5 ${isCollapsed ? 'mr-2' : ''}`} />
          {!isCollapsed && <span className="text-base text-white font-medium">Dashboard</span>}
        </Link>
        <Link
          href="scan"
          className="flex items-center gap-4 p-2 rounded-2xl hover:bg-accent transition-colors"
          prefetch={false}
        >
          <PiIcon className={`h-5 w-5 ${isCollapsed ? 'mr-2' : ''}`} />
          {!isCollapsed && <span className="text-base font-medium text-white">API Test</span>}
        </Link>
        <Link
          href="reports"
          className="flex items-center gap-4 p-2 rounded-2xl hover:bg-accent transition-colors"
          prefetch={false}
        >
          <BugIcon className={`h-5 w-5 ${isCollapsed ? 'mr-2' : ''}`} />
          {!isCollapsed && <span className="text-base font-medium text-white">Reports</span>}
        </Link>
        <Link
          href="tickets"
          className="flex items-center gap-4 p-2 rounded-2xl hover:bg-accent transition-colors"
          prefetch={false}
        >
          <TicketIcon className={`h-5 w-5 ${isCollapsed ? 'mr-2' : ''}`} />
          {!isCollapsed && <span className="text-base font-medium text-white">Tickets</span>}
        </Link>
        <Link
          href="ci-cd-integration"
          className="flex items-center gap-4 p-2 rounded-2xl hover:bg-accent transition-colors"
          prefetch={false}
        >
          <Infinity className={`h-5 w-5 ${isCollapsed ? 'mr-2' : ''}`} />
          {!isCollapsed && <span className="text-base font-medium text-white">CI/CD</span>}
        </Link>
      </nav>
      
      <nav className="mt-auto flex flex-col items-start gap-4 px-4 py-5">
        <Link
          href="#"
          className="flex items-center gap-4 p-2 rounded-2xl hover:bg-accent transition-colors"
          prefetch={false}
        >
          <SettingsIcon className={`h-5 w-5 ${isCollapsed ? 'mr-2' : ''}`} />
          {!isCollapsed && <span className="text-base font-medium text-white">Settings</span>}
        </Link>
      </nav>
    </aside>
  );
};

export default SidebarNav;
