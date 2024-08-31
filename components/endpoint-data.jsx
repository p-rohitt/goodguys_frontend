import { useEffect, useState } from "react";
import Link from "next/link";
import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbSeparator, BreadcrumbPage } from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu";

export function APIDetails({ endpointId }) {
  const [endpointData, setEndpointData] = useState(null);

  useEffect(() => {
    const fetchEndpointData = async () => {
      const final_endpoint = ("/" + endpointId).toString();
      console.log("sending payload ", final_endpoint);
      try {
        const response = await fetch("http://127.0.0.1:8000/data/endpoint-info/", {
          method: "POST",
          body: JSON.stringify({
            "endpoint": final_endpoint
          }),
        });
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

  const { endpoint_info, owasp_results, requests, spider_scan_reports } = endpointData;

  return (
    <div className="flex flex-col min-h-screen bg-muted/40">
      <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
        <Breadcrumb className="hidden md:flex">
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
          <Button size="sm" variant="outline" className="h-8 gap-1">
            <div className="h-3.5 w-3.5" />
            <span className="sr-only sm:not-sr-only">Scan</span>
          </Button>
        </div>
      </header>
      <main className="flex-1 p-4 sm:px-6 sm:py-4 md:gap-8">
        <div className="grid gap-8">
          <Card>
            <CardHeader>
              <CardTitle>Endpoint Details</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-sm text-muted-foreground">URL</div>
                    <div className="font-medium">{endpoint_info.url}</div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">Method</div>
                    <div className="font-medium">{endpoint_info.method}</div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-sm text-muted-foreground">Status</div>
                    <div className="font-medium">
                      <Badge variant="secondary">{endpoint_info.status}</Badge>
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">Last Scanned</div>
                    <div className="font-medium">{endpoint_info.last_scanned}</div>
                  </div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Description</div>
                  <div className="font-medium">{endpoint_info.description}</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>OWASP Reports</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Report</TableHead>
                    <TableHead>Score</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Last Scanned</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {owasp_results.map((report, index) => (
                    <TableRow key={index}>
                      <TableCell>
                        <div className="font-medium">{report.name}</div>
                        <div className="text-sm text-muted-foreground">{report.description}</div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="secondary">{report.score}</Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{report.status}</Badge>
                      </TableCell>
                      <TableCell>{report.last_scanned}</TableCell>
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
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Method</TableHead>
                    <TableHead>URL</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Duration</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {requests.map((request, index) => (
                    <TableRow key={index}>
                      <TableCell>
                        <div className="font-medium">{request.method}</div>
                      </TableCell>
                      <TableCell>
                        <div className="font-medium">{request.url}</div>
                        <div className="text-sm text-muted-foreground">{request.versioned_url}</div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="secondary">{request.status}</Badge>
                      </TableCell>
                      <TableCell>
                        <div className="font-medium">{request.duration}</div>
                      </TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button size="icon" variant="ghost">
                              <div className="h-4 w-4" />
                              <span className="sr-only">More actions</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>View Request</DropdownMenuItem>
                            <DropdownMenuItem>View Response</DropdownMenuItem>
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
              <CardTitle>Spider Scan Reports</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Report</TableHead>
                    <TableHead>Findings</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Last Scanned</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {spider_scan_reports.map((report, index) => (
                    <TableRow key={index}>
                      <TableCell>
                        <div className="font-medium">{report.name}</div>
                        <div className="text-sm text-muted-foreground">{report.description}</div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="secondary">{report.findings}</Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{report.status}</Badge>
                      </TableCell>
                      <TableCell>{report.last_scanned}</TableCell>
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
        </div>
      </main>
    </div>
  );
}
