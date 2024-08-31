import { useEffect, useState } from "react";
import Link from "next/link";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { APIDetailsChart } from "./charts/apiDetailChart";
import { APIAccessChart } from "./charts/apiAccessChart";
import { FileJsonIcon, FileTextIcon, SearchIcon } from "lucide-react";
import { IconFileTypePdf } from "@tabler/icons-react";
import downloadJSON from "@/constants/downloadjson";
import downloadPDF from "@/constants/downloadpdf";
import downloadText from "@/constants/downloadtxt";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
export function APIDetails({ endpointId }) {
  const [endpointData, setEndpointData] = useState(null);
  const router = useRouter()
  useEffect(() => {
    const fetchEndpointData = async () => {
      const final_endpoint = ("/" + endpointId).toString();
      console.log("sending payload ", final_endpoint);
      try {
        const response = await fetch(
          "http://127.0.0.1:8000/data/endpoint-info/",
          {
            method: "POST",
            body: JSON.stringify({
              endpoint: final_endpoint,
            }),
          }
        );
        const data = await response.json();
        setEndpointData(data);
      } catch (error) {
        console.error("Error fetching endpoint data:", error);
      }
    };
    fetchEndpointData();
  }, [endpointId]);

  if (!endpointData) {
    return <div>Loading...</div>;
  }

  const handleScan = async (endpoint_info) => {
    try{

      console.log("Scan clicked")

      toast("Scan initiated on this endpoint", {
        description: "We'll notify you on completion.",
        action: {
          label: "Undo",
          onClick: () => console.log("Undo"),
        },
      })

      const response = await fetch(`http://127.0.0.1:8000/scanSingle/`,{
        method:"POST",
        body:JSON.stringify({
          "endpoint":endpoint_info.path
        })
      })

      if(!response.ok){
       throw new Error("Cannot scan")
        return;
      }

      const data = await response.json()
      console.log("DATAA  ",data)


      toast("Scan has been completed", {
        description: "See detailed report below.",
      })

      return;




    }catch(e){
      toast("Scan failed!", {
        description: "Try again",
      })
      console.log("Cannot scan API");
      return
    }
  }

  const handleRowTap = (report)=> {
    router.push(`http://localhost:3000/report?id=${report._id}`)
  }
  const { endpoint_info, owasp_results, requests, spider_scan_reports } =
    endpointData;

  return ( 
    <div className="flex flex-col min-h-screen mt-[-60px] w-[90vw]">
      <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
        <Breadcrumb className="hidden md:flex ">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href="#" prefetch={false}>
                  Endpoints
                </Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Endpoint Details</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <div className="ml-auto flex items-center gap-2">
          <Button size="sm" variant="outline" className="h-12 gap-4" onClick={()=>handleScan(endpoint_info)}>
            <SearchIcon size={18} />
            <span className="text-md">Scan this endpoint</span>
          </Button>
        </div>
      </header>
      <main className="flex-1 p-4 sm:px-6 sm:py-4 md:gap-8 grid ">
        {/* <div className="grid gap-8"> */}
        <div className="grid grid-cols-2 gap-4 ">
          <Card>
            <CardHeader>
              <CardTitle className="">Endpoint Details</CardTitle>
            </CardHeader>
            <CardContent className="">
              <div className="grid gap-4">
                <div className="grid grid-cols-2 gap-6">
                <div>
                    <div className="text-sm text-muted-foreground">Method</div>
                    <div className="font-medium">{endpoint_info.method}</div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">URL</div>
                    <div className="font-medium">{endpoint_info.path}</div>
                  </div>
                  <div>

                  <div className="text-sm text-muted-foreground">Risk Factor</div>
                    <div className="font-medium">
                    <RiskBadge risk={endpoint_info.risk_factor} />
                    </div>
                  </div>
                  <div className="">
                    <div className="text-sm text-muted-foreground">
                      Risk Score
                    </div>
                    <div className="font-medium">
                      {endpoint_info.average_risk_score}
                    </div>
                  </div>
                
                  
                </div>
                <div className="grid grid-cols-2 gap-6">
                  <div>
                  <div>
                    <div className="text-sm text-muted-foreground">Created At</div>
                    <div className="font-medium">{new Date(endpoint_info.first_seen).toLocaleString()}</div>
                  </div>
                    
                  </div>
                  

                  
                  <div className="">
                    <div className="text-sm text-muted-foreground">
                      Last Seen
                    </div>
                    <div className="font-medium">
                      {new Date(endpoint_info.last_seen).toLocaleString()}
                    </div>
                  </div>
                  
                </div>
              </div>
              <div className="mt-4">
                <APIAccessChart />
              </div>
            </CardContent>
          </Card>
  
         
          <APIDetailsChart />
          </div>
          <div className="grid gap-8">

          <Card>
            <CardHeader>
              <CardTitle>Spider Scan Reports</CardTitle>

              <CardDescription>This table provides a detailed list of all dynamic reports that contain the scan results for this endpoint, offering insights into the vulnerabilities detected during testing.<br /> Click on a report to view more.</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Timestamp</TableHead>
                    <TableHead>Alerts</TableHead>
                    <TableHead>Download</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {endpointData.spider_scan_reports.slice().reverse().map((report, index) => (
                    <TableRow key={index} onClick={()=>handleRowTap(report)}>
                      <TableCell>
                        <div className="font-medium">{new Date(report.timestamp).toLocaleString()}</div>
                        <div className="text-sm text-muted-foreground">
                          {report.description}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{report.report[`https://onlineshop-psi-seven.vercel.app${endpoint_info.path}`].alerts.length}</Badge>
                      </TableCell>
              
                      <TableCell>
                      <Button  variant="ghost" onClick={()=>downloadJSON("report.json",report)} className="">
                            <FileJsonIcon />
                            
                          </Button>
                          <Button variant="ghost" onClick={()=>downloadPDF("report.pdf",JSON.stringify(report))} className="">
                            <IconFileTypePdf />
                          </Button>
                          <Button variant="ghost" onClick={()=>downloadText("report.txt",JSON.stringify(report))} className="">
                            <FileTextIcon />
                          </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>OWASP Reports</CardTitle>
              <CardDescription>This table provides a detailed list of all OWASP vulnerabilities detected on this endpoint, offering a comprehensive overview of the security risks identified during the scan.</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Message</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>OWASP ID</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {endpointData.owasp_results.map((report, index) => (
                    <TableRow key={index}>
                      <TableCell>
                        <div className="font-medium">{report.message}</div>
                       
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{report.status}</Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant="secondary">{report.OWASP_id}</Badge>
                      </TableCell>
                      
                      <TableCell>{report.OWASP_category}</TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button size="icon" variant="ghost">
                              <div className="h-4 w-4" />
                              <span className="sr-only">More actions</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>View Report</DropdownMenuItem>
                            <DropdownMenuItem>Rerun Scan</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Requests</CardTitle>
              <CardDescription>This table provides a comprehensive list of all requests made to that endpoint, offering a detailed record of interactions for thorough analysis and review.</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Timestamp</TableHead>
                    <TableHead>Method</TableHead>
                    <TableHead>Response Status</TableHead>
                    <TableHead>Client</TableHead>
          
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {endpointData.requests.map((request, index) => (
                    <TableRow key={index}>
                      <TableCell>
                        <div className="font-medium">{new Date(request.timestamp).toLocaleString()}</div>
                      </TableCell>
                      <TableCell>
                        <div className="font-medium">{request.method}</div>
                        <div className="text-sm text-muted-foreground">
                          
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="secondary">{request.response_status_code}</Badge>
                      </TableCell>
                      <TableCell>
                        <div className="font-medium">{"127.0.0.1"}</div>
                      </TableCell>
                     
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

        
          </div>
        {/* </div> */}
      </main>
    </div>
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
  return (
    <Badge variant="outline" className={colorClass}>
      {risk}
    </Badge>
  );
}



