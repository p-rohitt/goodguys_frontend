"use client"
import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip"
import Link from "next/link"
import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbSeparator, BreadcrumbPage } from "@/components/ui/breadcrumb"
import { Input } from "@/components/ui/input"
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuItem } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { CalendarIcon, CloudCog, Loader, ScanIcon, Sidebar } from "lucide-react"
import SidebarNav from "./sidebar"
import { useEffect, useState } from "react"
import { UserButton } from "@clerk/nextjs"


export function Dashboard() {

  const [API_DATA, setAPI_DATA] = useState({
    totalAPI:10,
    vulnerableAPI:4,
    secureAPI:6,
    apiEndpoints:[]
  });


  const [TICKETS, setTICKETS] = useState([])

  const [isLoading,setIsLoading] = useState(true);
  const [msg,setMsg] = useState(false)
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setIsLoading(true);
        const response = await fetch("http://127.0.0.1:8000/api_data/");
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json(); // Parse the JSON data
        setAPI_DATA(data); // Set the parsed JSON data
      } catch (error) {
        console.error('Fetch error:', error); // Log any errors
      } finally {
        setIsLoading(false); // Set loading to false whether there is an error or not
      }
    };

    const fetchTickets = async () => {
      const response = await fetch("http://127.0.0.1:8000/api_tickets/")
      if(!response.ok){
        console.log("Cannot fetch tickets");
        return;
      }

      const data = await response.json();
      data.reverse()
      setTICKETS(data);
    }

    fetchTickets();

    

    fetchDashboardData();
  }, []); 


  const handleFullScan = async () => {
    setMsg(true);

    const response = await fetch("http://127.0.0.1:8000/full_scan")

    if(!response.ok){
      console.log("Full Scan could not complete");
      return;
    }

    setMsg(false)
  }
  return (
    (<div className={`flex min-h-screen ${isLoading ? 'items-center justify-center' : 'w-full'}`}> 

    {
      isLoading ? <Loader className="animate-spin" /> :
    
      <div className="flex flex-1 flex-col sm:gap-4 sm:py-4 sm:pl-14">
        <header
          className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
          <Breadcrumb className="hidden md:flex">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link href="#" prefetch={false}>
                    Dashboard
                  </Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>API Inventory</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          <div className="relative ml-auto flex-1 md:grow-0 flex items-center gap-2">
            <div>
              <p> 
                {msg ? "Running a full scan.... " : ""}
                </p>
            </div>
          <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="outline" size="icon" className="h-9 w-9 rounded-lg">
                    <ScanIcon className="h-5 w-5" />
                    <span className="sr-only">Start a full scan</span>
                  </Button>
                </TooltipTrigger>
                <TooltipContent onClick= {handleFullScan}>Start a full scan</TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="outline" size="icon" className="h-9 w-9 rounded-lg">
                    <CalendarIcon className="h-5 w-5" />
                    <span className="sr-only">Schedule a full scan</span>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Schedule a full scan</TooltipContent>
              </Tooltip>
            <div className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search APIs..."
              className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[336px]" />
              </TooltipProvider>
          </div>
          <div>
            <UserButton />
          </div>
        </header>
        <main
          className="grid flex-1 grid-cols-1 gap-4 p-4 sm:px-6 sm:py-0 md:grid-cols-[1fr_300px] md:gap-8">
          <div className="grid gap-4">
            <Card>
              <CardHeader>
                <CardTitle>API Inventory</CardTitle>
                <CardDescription>Overview of your API ecosystem, including vulnerable APIs.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  <Card>
                    <CardHeader>
                      <CardTitle>Total APIs</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-4xl font-bold">{API_DATA.totalAPI}</div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader>
                      <CardTitle>Vulnerable APIs</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-4xl font-bold text-red-500">{API_DATA.vulnerableAPI}</div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader>
                      <CardTitle>Secure APIs</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-4xl font-bold text-green-500">{API_DATA.secureAPI}</div>
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>API Endpoints</CardTitle>
                <CardDescription>
                  View details of all your API endpoints, including their methods, headers, and vulnerability status.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Endpoint</TableHead>
                      <TableHead>Method</TableHead>
                      <TableHead>Headers</TableHead>
                      <TableHead>Vulnerability</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                  {API_DATA.apiEndpoints?.map((api, index) => (
          <TableRow key={index}>
            <TableCell>
              <div className="font-medium">{api.endpoint}</div>
            </TableCell>
            <TableCell>
              <Badge variant="outline">{api.method}</Badge>
            </TableCell>
            <TableCell>
              <div className="flex flex-wrap gap-1">
                {api.headers.map((header, i) => (
                  <Badge key={i} variant="secondary">{header}</Badge>
                ))}
              </div>
            </TableCell>
            <TableCell>
              <RiskBadge risk={api.risk} />
            </TableCell>
          </TableRow>
        ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Recent API Scan</CardTitle>
                <CardDescription>
                  View the results of the latest API security scan, including the number of vulnerabilities found and
                  the timestamp.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <div className="text-4xl font-bold">12</div>
                    <div className="text-muted-foreground">Vulnerabilities Found</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold">2023-04-15 10:23 AM</div>
                    <div className="text-muted-foreground">Scan Timestamp</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          <div className="grid gap-4">
            <Card>
              <CardHeader>
                <CardTitle> Tickets</CardTitle>
                <CardDescription>View and manage your API-related tickets.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4">
                {TICKETS.map((ticket, index) => (
        <div
          key={index}
          className={`flex items-center gap-4 rounded-lg bg-muted p-4 ${
            ticket.status === "Resolved" ? "opacity-50 pointer-events-none" : ""
          }`}
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-accent text-accent-foreground">
            <TicketIcon className="h-5 w-5" />
          </div>
          <div className="flex-1">
            <div className="font-medium">
              {ticket.endpoint}: {ticket.title}
            </div>
            <div className="text-sm text-muted-foreground">{ticket.title}</div>
            <div className="mt-2 flex items-center gap-2">
              <Badge
                variant="outline"
                className={`${
                  ticket.risk === "High"
                    ? "bg-red-500 text-red-50"
                    : ticket.risk === "Low"
                    ? "bg-yellow-500 text-yellow-50 w-[8vw]"
                    : "bg-green-500 text-yellow-50"
                }`}
              >
                {ticket.status === "Resolved" ? "Resolved" : `${ticket.risk}`}
              </Badge>
            </div>
          </div>
          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8"
            onClick={() => {}}
          >
            <EyeIcon className="h-4 w-4" />
            <span className="sr-only">View Ticket</span>
          </Button>
        </div>
      ))}
                  
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
      }
    </div>)
  );
}

function BugIcon(props) {
  return (
    (<svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round">
      <path d="m8 2 1.88 1.88" />
      <path d="M14.12 3.88 16 2" />
      <path d="M9 7.13v-1a3.003 3.003 0 1 1 6 0v1" />
      <path
        d="M12 20c-3.3 0-6-2.7-6-6v-3a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v3c0 3.3-2.7 6-6 6" />
      <path d="M12 20v-9" />
      <path d="M6.53 9C4.6 8.8 3 7.1 3 5" />
      <path d="M6 13H2" />
      <path d="M3 21c0-2.1 1.7-3.9 3.8-4" />
      <path d="M20.97 5c0 2.1-1.6 3.8-3.5 4" />
      <path d="M22 13h-4" />
      <path d="M17.2 17c2.1.1 3.8 1.9 3.8 4" />
    </svg>)
  );
}


function CodeIcon(props) {
  return (
    (<svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round">
      <polyline points="16 18 22 12 16 6" />
      <polyline points="8 6 2 12 8 18" />
    </svg>)
  );
}


function EyeIcon(props) {
  return (
    (<svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round">
      <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
      <circle cx="12" cy="12" r="3" />
    </svg>)
  );
}


function LayoutDashboardIcon(props) {
  return (
    (<svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round">
      <rect width="7" height="9" x="3" y="3" rx="1" />
      <rect width="7" height="5" x="14" y="3" rx="1" />
      <rect width="7" height="9" x="14" y="12" rx="1" />
      <rect width="7" height="5" x="3" y="16" rx="1" />
    </svg>)
  );
}


function PiIcon(props) {
  return (
    (<svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round">
      <line x1="9" x2="9" y1="4" y2="20" />
      <path d="M4 7c0-1.7 1.3-3 3-3h13" />
      <path d="M18 20c-1.7 0-3-1.3-3-3V4" />
    </svg>)
  );
}


function SettingsIcon(props) {
  return (
    (<svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round">
      <path
        d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
      <circle cx="12" cy="12" r="3" />
    </svg>)
  );
}


function TicketIcon(props) {
  return (
    (<svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round">
      <path
        d="M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z" />
      <path d="M13 5v2" />
      <path d="M13 17v2" />
      <path d="M13 11v2" />
    </svg>)
  );
}


function RiskBadge({ risk }) {
  let colorClass;
  switch (risk) {
    case "High":
      colorClass = "bg-red-500 text-red-50";
      break;
    case "Medium":
      colorClass = "bg-yellow-500 text-yellow-50";
      break;
    case "Low":
      colorClass = "bg-green-500 text-green-50";
      break;
    case "Secure":
      colorClass = "bg-green-900 text-green-50";
      break;
    case "Resolved":
      colorClass = "bg-green-500 text-green-50";
      break;
    default:
      colorClass = "";
  }
  return <Badge variant="outline" className={colorClass}>{risk}</Badge>;
}