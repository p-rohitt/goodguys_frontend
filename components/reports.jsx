"use client";

import React, { useEffect, useState } from "react";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { AlertCircle, AlertTriangleIcon, DownloadIcon, FileJsonIcon, FileTextIcon, Loader2, SearchIcon } from "lucide-react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "./ui/tabs";

import { TrendingUp } from "lucide-react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  LabelList,
  XAxis,
  YAxis,
} from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

import { Label, Pie, PieChart } from "recharts";
import { useRouter } from "next/navigation";
import downloadJSON from "@/constants/downloadjson";
import { Button } from "./ui/button";
import { IconFileTypeCsv, IconFileTypePdf } from "@tabler/icons-react";
import downloadPDF from "@/constants/downloadpdf";
import downloadText from "@/constants/downloadtxt";

export function Reports() {
  const [selectedReport, setSelectedReport] = useState(null);

  const [REPORTS, setREPORTS] = useState([]);
  const [STATIC_REPORTS, setSTATIC_REPORTS] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("dynamic");

  const [chartData, setChartData] = useState([]);
  const [owaspChartData, setOwaspChartData] = useState([]);
  const [cwecount, setCweCount] = useState(0);
  const [owaspcount, setOwaspCount] = useState(0);
  const [uniquefiles,setUniquefiles]  = useState(0);
  const [totalAlerts, setTotalAlerts] = useState(0);
  const [staticCweChart,setStaticCweChart] = useState([])
  const [staticOwaspChart, setStaticOwaspChart] = useState([])
  const router = useRouter();
  useEffect(() => {
    const fetchDataAndProcess = async () => {
      try {
        setIsLoading(true);
  
        // Fetch dynamic reports data
        const dashboardResponse = await fetch(
          "http://127.0.0.1:8000/data/dynamicReports/"
        );
        if (!dashboardResponse.ok) {
          throw new Error(`HTTP error! Status: ${dashboardResponse.status}`);
        }
        const dashboardData = await dashboardResponse.json();
        setREPORTS(dashboardData.reports);
  
        const colorArray = [
          "var(--color-chrome)",
          "var(--color-safari)",
          "var(--color-firefox)",
          "var(--color-edge)",
          "var(--color-other)",
          "var(--color-chrome)",
          "var(--color-safari)",
          "var(--color-firefox)",
          "var(--color-other)",
          "var(--color-safari)",
        ];
  
        let index = 0;
        let cd = [];
        let cwenum = 0;
        dashboardData["overallCweidArray"].forEach((row) => {
          cd.push({
            browser: "CWE-" + row.cweid,
            visitors: row.count,
            fill: colorArray[index++],
          });
          cwenum += row.count;
        });
  
        setChartData(cd);
        setCweCount(cwenum);
  
        index = 0;
        let owasp_d = [];
        let owasp_num = 0;
        dashboardData["overallOwaspTagArray"].forEach((row) => {
          owasp_d.push({
            browser: row.tag,
            visitors: row.count,
            fill: colorArray[index++],
          });
          owasp_num += row.count;
        });
        setOwaspChartData(owasp_d);
        setOwaspCount(owasp_num);
  
        // Fetch static reports data
        const staticReportsResponse = await fetch(
          "http://127.0.0.1:8000/data/staticReports/"
        );
        if (!staticReportsResponse.ok) {
          throw new Error(`HTTP error! Status: ${staticReportsResponse.status}`);
        }
        const staticReportsData = await staticReportsResponse.json();
        setSTATIC_REPORTS(staticReportsData);

        index = 0;
        let static_cwe_d = [];
        let static_cwe_num = 0;
        staticReportsData["cwe_counts"].forEach((row) => {
          static_cwe_d.push({
            browser: row.cwe_id,
            visitors: row.count,
            fill: colorArray[index++],
          });
          static_cwe_num += row.count;
        });

        setStaticCweChart(static_cwe_d);
  
        // Process the filenames from static reports
        let i = 0;
        const filenames = staticReportsData.reports.forEach((report) => {
          report.files.forEach((file)=>  i++ )
        })

        const totalFindings = staticReportsData?.reports?.reduce((acc, report) => {
          return acc + report.findings.length;
        }, 0);



       
        console.log("first report ", staticReportsData?.reports[0]);
  
        // Get unique filenames
        const uniqueFilenames = new Set(filenames);
  
        // Count unique filenames
        const uniqueFilenamesCount = i
        console.log("TOTAL ALERTS", totalFindings)
        setUniquefiles(uniqueFilenamesCount);
        setTotalAlerts(totalFindings)
  
      } catch (error) {
        console.error("Fetch error:", error);
      } finally {
        setIsLoading(false);
      }
    };
  
    fetchDataAndProcess();
  }, []);

  

  const handleRowClick = (report) => {
    // setSelectedReport(report);
    router.push(`http://localhost:3000/report?id=${report.id}`);
  };

  const handleStaticRowClick = (report)=> {
    router.push(`http://localhost:3000/staticReport?id=${report._id}`);
  }
  return (
    <div className="flex flex-col h-full">
      <header className=" text-white py-4 px-6">
        <h1 className="text-2xl font-bold flex items-center justidy-center gap-3">
          <SearchIcon />
          Scan Reports
        </h1>
      </header>
      {!isLoading ? (
        <main className="flex-1 overflow-auto">
          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="border-b"
          >
            <TabsList className="flex mt-2 gap-5 w-[45vw] mx-auto rounded-2xl">
              <TabsTrigger
                value="static"
                className=" rounded-2xl w-[20vw] py-2 text-center font-medium hover:bg-muted/50 data-[state=active]:border-b-2 data-[state=active]:border-black data-[state=active]:text-black data-[state=active]:bg-white"
              >
                Static
              </TabsTrigger>
              <TabsTrigger
                value="dynamic"
                className=" rounded-2xl w-[20vw] py-2 text-center font-medium transition-colors hover:bg-muted/50 data-[state=active]:border-b-2 data-[state=active]:border-black data-[state=active]:text-black data-[state=active]:bg-white"
              >
                Dynamic
              </TabsTrigger>
            </TabsList>
            <TabsContent value="dynamic" className="py-6">
              <div className="w-[50vw] mx-auto ">
                <div className="flex flex-col gap-2 items-center justify-center">
                  <div className="flex gap-5">
                    <ReportCweChart chartData={chartData} />
                    <ReportOwaspChart chartData={owaspChartData} />
                  </div>
                </div>
                <p className="text-xs tracking-wide">
                Our DAST tool tests running applications to identify security vulnerabilities and weaknesses in real-time. It generates detailed reports, listing all detected CWE and OWASP vulnerabilities, to ensure that deployed applications are secure and resilient.
                </p>
              </div>
              <div className="p-6">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-muted text-muted-foreground">
                      <th className="py-2 px-4 text-left">Timestamp</th>
                      <th className="py-2 px-4 text-left">Alerts</th>
                      <th className="py-2 px-4 text-left">Endpoints scanned</th>
                      <th className="py-2 px-4 text-left">Download Report</th>
                    </tr>
                  </thead>
                  <tbody>
                    {REPORTS.slice().reverse().map((report, index) => (
                      <tr
                        key={index}
                        className="border-b hover:bg-muted/50 cursor-pointer"
                        onClick={() => handleRowClick(report)}
                      >
                        <td className="py-3 px-4">{report.timestamp}</td>
                        <td className="py-3 px-4 text-2xl font-bold flex items-center gap-2">
                          {report.totalAlerts}{" "}
                          <span>
                            <AlertTriangleIcon />
                          </span>
                        </td>
                        <td className="py-3 px-4 text-2xl font-bold">
                          {report.numEndpoints}
                        </td>
                        <td className="">
                          <Button  variant="ghost" onClick={()=>downloadJSON("report.json",report)} className="">
                            <FileJsonIcon />
                            
                          </Button>
                          <Button variant="ghost" onClick={()=>downloadPDF("report.pdf",JSON.stringify(report))} className="">
                            <IconFileTypePdf />
                          </Button>
                          <Button variant="ghost" onClick={()=>downloadText("report.txt",JSON.stringify(report))} className="">
                            <FileTextIcon />
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </TabsContent>
            <TabsContent value="static" className="py-6">
              <div className="w-[50vw] mx-auto ">
                <div className="flex flex-col gap-2 items-center justify-center">
                  <div className="flex gap-5 items-center">
                    
                    <p className="text-md tracking-wide h-[30vh] w-[20vw]">
                    Our SAST tool analyzes source code to identify security vulnerabilities and weaknesses before deployment. It provides a detailed report, listing all detected CWE and OWASP vulnerabilities, helping to ensure comprehensive code security and integrity.
                </p>
                <ReportCweChart chartData={staticCweChart} />
                  </div>
                </div>
              
              </div>
              <div className="p-6">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-muted text-muted-foreground">
                      <th className="py-2 px-4 text-left">Timestamp</th>
                      <th className="py-2 px-4 text-left">Vulnerable Files</th>
                      <th className="py-2 px-4 text-left">Total Alerts</th>
                      <th className="py-2 px-4 text-left">Endpoints scanned</th>
                    </tr>
                  </thead>
                  <tbody>
                    {STATIC_REPORTS?.reports?.map((report, index) => {

                          const date = new Date(report.timestamp.$date);
                          const formattedDate = date.toLocaleString();

                          let i = 0;
                          report.files.map((file)=> i+=file.findings.length)

                      return (
                      <tr
                        key={index}
                        className="border-b hover:bg-muted/50 cursor-pointer"
                        onClick={() => handleStaticRowClick(report)}
                      >
                        <td className="py-3 px-4">{formattedDate}</td>
                        <td className="py-3 px-4">{report.files.length}</td>
                        <td className="py-3 px-4 text-2xl font-bold flex items-center gap-2">
                        {i}
                  
                          <span>
                            <AlertTriangleIcon />
                          </span>
                        </td>
                        <td className="py-3 px-4 text-2xl font-bold">
                          {report.numEndpoints}
                        </td>
                      </tr>
)})}
                  </tbody>
                </table>
              </div>
            </TabsContent>
          </Tabs>
        </main>
      ) : (
        <div className="flex justify-center items-center h-[80vh]"> <Loader2 size={50} className="animate-spin"/></div>
      )}
      {selectedReport && (
        <div className="fixed inset-0 bg-background/80 flex items-center justify-center z-50 overflow-auto">
          <div className="bg-background p-8 rounded-lg shadow-lg w-[90vw] max-w-4xl h-[90vh] flex flex-col">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">
                Scan Report - {selectedReport.timestamp}
              </h2>
              <button
                className="text-muted-foreground hover:text-foreground"
                onClick={() => setSelectedReport(null)}
              >
                <XIcon className="w-6 h-6" />
              </button>
            </div>
            <div className="flex-1 overflow-auto">
              <div className="grid gap-6">
                {selectedReport.report.map((detail, index) => (
                  <div key={index} className="border rounded-lg p-6">
                    <h3 className="text-md font-medium text-white bg-black p-2">
                      {detail.endpoint}
                    </h3>
                    <Accordion type="single" collapsible className="w-full">
                      {detail.alerts.map((alert, alertIndex) => (
                        <AccordionItem
                          key={alert.id}
                          value={`alert-${alertIndex}`}
                        >
                          <AccordionTrigger>
                            <div className="flex items-center gap-2">
                              <span className="font-small">
                                {" "}
                                {alertIndex + 1}{" "}
                              </span>
                              <span className="text-sm">{alert.name}</span>
                              <div>
                                <RiskBadge risk={alert.risk} />
                              </div>
                            </div>
                          </AccordionTrigger>
                          <AccordionContent>
                            <div className="grid gap-2">
                              <div>
                                <p className="text-muted-foreground">
                                  Method: {alert.method} | URL: {alert.url}
                                </p>
                              </div>
                              <div>
                                <p className="text-muted-foreground">
                                  Evidence:
                                </p>
                                <p>{alert.evidence ? alert.evidence : "NA"} </p>
                              </div>
                              <div>
                                <p className="text-muted-foreground">CWEID:</p>
                                <p>{alert.cweid ? alert.cweid : "NA"}</p>
                              </div>
                              <div>
                                <p className="text-muted-foreground">WASCID:</p>
                                <p>{alert.wascid ? alert.wascid : "NA"}</p>
                              </div>
                              <div>
                                <p className="text-muted-foreground">Param:</p>
                                <p>{alert.param ? alert.param : "NA"}</p>
                              </div>
                              <div>
                                <p className="text-muted-foreground">
                                  Risk Score:
                                </p>
                                <p>
                                  {alert.risk_score ? alert.risk_score : "NA"}
                                </p>
                              </div>
                              <div>
                                <p className="text-muted-foreground">
                                  Description:
                                </p>
                                <p>
                                  {alert.description ? alert.description : "NA"}
                                </p>
                              </div>
                              <div>
                                <p className="text-muted-foreground">
                                  Solution:
                                </p>
                                <p>{alert.solution ? alert.solution : "NA"}</p>
                              </div>
                            </div>
                          </AccordionContent>
                        </AccordionItem>
                      ))}
                    </Accordion>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function XIcon(props) {
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
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
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
    case "Informational":
      colorClass = "bg-blue-200 text-white-50";
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

function ReportCweChart({ chartData, cwecount }) {
  const chartConfig = {
    visitors: {
      label: "Visitors",
    },
    chrome: {
      label: "Chrome",
      color: "hsl(var(--chart-1))",
    },
    safari: {
      label: "Safari",
      color: "hsl(var(--chart-2))",
    },
    firefox: {
      label: "Firefox",
      color: "hsl(var(--chart-3))",
    },
    edge: {
      label: "Edge",
      color: "hsl(var(--chart-4))",
    },
    other: {
      label: "Other",
      color: "hsl(var(--chart-5))",
    },
  };
  const totalVisitors = React.useMemo(() => {
    return chartData.reduce((acc, curr) => acc + curr.visitors, 0);
  }, []);
  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>CWE Vulnerabilites</CardTitle>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey="visitors"
              nameKey="browser"
              innerRadius={60}
              strokeWidth={5}
            >
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-3xl font-bold"
                        >
                          {totalVisitors.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          CWEs
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}

function ReportOwaspChart({ chartData, cwecount }) {
  const chartConfig = {
    visitors: {
      label: "Visitors",
    },
    chrome: {
      label: "Chrome",
      color: "hsl(var(--chart-1))",
    },
    safari: {
      label: "Safari",
      color: "hsl(var(--chart-2))",
    },
    firefox: {
      label: "Firefox",
      color: "hsl(var(--chart-3))",
    },
    edge: {
      label: "Edge",
      color: "hsl(var(--chart-4))",
    },
    other: {
      label: "Other",
      color: "hsl(var(--chart-5))",
    },
  };
  const totalVisitors = React.useMemo(() => {
    return chartData.reduce((acc, curr) => acc + curr.visitors, 0);
  }, []);
  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>OWASP Vulnerabilites</CardTitle>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey="visitors"
              nameKey="browser"
              innerRadius={60}
              strokeWidth={5}
            >
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-3xl font-bold"
                        >
                          {totalVisitors.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          OWASPs
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
