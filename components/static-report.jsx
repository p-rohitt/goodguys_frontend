import { useEffect, useState } from "react";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import {
  AlertCircle,
  AlertTriangleIcon,
  EyeIcon,
  TicketIcon,
  TrendingDown,
} from "lucide-react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "./ui/tabs";
import { DynamicReportChart } from "./charts/dynamicReportChart";

import { TrendingUp } from "lucide-react";
import { LabelList, Pie, PieChart } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Button } from "./ui/button";
import MarkdownRenderer from "@/lib/markdown";
import CodeBlock from "./ui/codeblock";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export function StaticReport({ id }) {
  const [detail, setDetail] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [chartData, setChartData] = useState([]);
  const [owaspChartData, setOwaspChartData] = useState([]);
  const [cwecount, setCweCount] = useState(0);
  const [owaspcount, setOwaspCount] = useState(0);
  useEffect(() => {
    const fetchSingleReport = async () => {
      const response = await fetch(
        `http://127.0.0.1:8000/data/staticReportById/?report_id=${id}`
      );

      // if(!response.ok){
      //     console.log("could not fetch a single report");
      //     return;
      // }

      const data = await response.json();
      console.log("data", data);
      setDetail(data);

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
      data["cwe_counts"].forEach((row) => {
        cd.push({
          browser: "CWE-" + row.id,
          visitors: row.count,
          fill: colorArray[index++],
        });
        cwenum += row.count;
      });

      setChartData(cd);
      setCweCount(cwenum);

      //   index = 0;
      //   let owasp_d = [];
      //   let owasp_num = 0;
      //   data["overallOwaspTagArray"].forEach((row) => {
      //     owasp_d.push({
      //       browser: row.tag,
      //       visitors: row.count,
      //       fill: colorArray[index++],
      //     });
      //     owasp_num += row.count;
      //   });
      //   setOwaspChartData(owasp_d);
      //   setOwaspCount(owasp_num);
      setIsLoading(false);
    };

    fetchSingleReport();
    // const cd = Object.entries(detail.reports[0]).map(([browser, count]) => ({
    //     browser,
    //     visitors: count,
    //     fill: colorMap[browser] || "var(--color-default)" // Use a default color if the browser is not in colorMap
    //   }));
  }, []);

  return (
    <div
      key={id}
      className="border rounded-lg p-6 bg-[var(--primary)] mt-[-80px] ml-[-15px]"
    >
      {!isLoading ? (
        <div className="flex gap-2 items-center justify-center ">
          <div className=" bg-background/80 flex items-center justify-center overflow-auto">
            <div className="bg-background p-8 rounded-lg shadow-lg w-[70vw] flex flex-col mt-[-30px]">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">
                  Scan Report - {new Date(detail.timestamp).toLocaleString()}
                </h2>
              </div>
              <div className="flex-1 overflow-auto">
                <div className="grid gap-6">
                  <div className="flex items-center justify-center gap-3">
                    <CWEChart chartData={chartData} cwecount={cwecount} />
                    
                  </div>
                  {detail["reports"].map((report, index) => {
                    return (
                      <div>
                        <h3 className="text-md font-medium text-slate-400 bg-black p-2">
                          Filename : {report.filename}
                        </h3>

                        <Accordion type="single" collapsible className="w-full">
                          {report["findings"].map((alert, alertIndex) => (
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
                                  <span className="text-sm">{alert.title}</span>
                                  <div>
                                  <RiskBadge risk={alert.tag} />
                                </div>
                                </div>
                              </AccordionTrigger>
                              <AccordionContent>
                              <div className="grid grid-cols-1">

                
    <CodeBlock code={alert.code_extract} language={"groovy"}/>
    
  </div>
                                <div className="grid grid-cols-2 gap-2">
                                  <Card className="w-full max-w-md mx-auto bg-slate-900">
                                    <CardHeader>
                                      <CardTitle className="text-center">
                                        Description
                                      </CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                      <MarkdownRenderer
                                        markdownText={alert.description}
                                      />
                                    </CardContent>
                                  </Card>

                                  <Card className="w-full max-w-md mx-auto  bg-slate-900">
                                    <CardHeader>
                                      <CardTitle className="text-center">
                                        Alert Information
                                      </CardTitle>
                                    </CardHeader>
                                    <CardContent className="">
                                      
                                      <div className="grid grid-cols-2 gap-10 ">
                                        <div>
                                          <h3>Line Number</h3>
                                          <p>{alert.line_number}</p>
                                        </div>
                                        <div>
                                          <p className="text-muted-foreground">
                                            CWEID:
                                          </p>
                                          <p>
                                            {alert.cwe_ids.length > 0
                                              ? alert.cwe_ids[0]
                                              : "NA"}
                                          </p>
                                        </div>
                                        <div>
                                          <h3>Risk</h3>
                                          <p>{alert.tag}</p>
                                        </div>
                                        <div>
                                          <h3>Parent Line Number</h3>
                                          <p>{alert.parent_line_number}</p>
                                        </div>
                                      </div>
                                     
                                    </CardContent>
                                  </Card>

                                 
                                    <Card className="w-full max-w-md mx-auto  bg-slate-900">
                                      <CardHeader>
                                        <CardTitle className="text-center">
                                          Source Information
                                        </CardTitle>
                                      </CardHeader>
                                      <CardContent>
                                        <Table>
                                          <TableHeader>
                                            <TableRow>
                                              <TableHead className="w-[100px]">
                                                Property
                                              </TableHead>
                                              <TableHead>Start</TableHead>
                                              <TableHead>End</TableHead>
                                            </TableRow>
                                          </TableHeader>
                                          <TableBody>
                                            <TableRow>
                                              <TableCell className="font-medium">
                                                Line
                                              </TableCell>
                                              <TableCell>
                                                {alert.source.start}
                                              </TableCell>
                                              <TableCell>
                                                {alert.source.end}
                                              </TableCell>
                                            </TableRow>
                                            <TableRow>
                                              <TableCell className="font-medium">
                                                Column
                                              </TableCell>
                                              <TableCell>
                                                {alert.source.column.start}
                                              </TableCell>
                                              <TableCell>
                                                {alert.source.column.end}
                                              </TableCell>
                                            </TableRow>
                                          </TableBody>
                                        </Table>
                                      </CardContent>
                                    </Card>
                                    <Card className="w-full max-w-md mx-auto  bg-slate-900">
                                      <CardHeader>
                                        <CardTitle className="text-center">
                                          Sink Information
                                        </CardTitle>
                                      </CardHeader>
                                      <CardContent>
                                        <Table>
                                          <TableHeader>
                                            <TableRow>
                                              <TableHead className="w-[100px]">
                                                Property
                                              </TableHead>
                                              <TableHead>Start</TableHead>
                                              <TableHead>End</TableHead>
                                            </TableRow>
                                          </TableHeader>
                                          <TableBody>
                                            <TableRow>
                                              <TableCell className="font-medium">
                                                Line
                                              </TableCell>
                                              <TableCell>
                                                {alert.sink.start}
                                              </TableCell>
                                              <TableCell>
                                                {alert.sink.end}
                                              </TableCell>
                                            </TableRow>
                                            <TableRow>
                                              <TableCell className="font-medium">
                                                Column
                                              </TableCell>
                                              <TableCell>
                                                {alert.sink.column.start}
                                              </TableCell>
                                              <TableCell>
                                                {alert.sink.column.end}
                                              </TableCell>
                                            </TableRow>
                                          </TableBody>
                                        </Table>
                                      </CardContent>
                                    </Card>
                              
                                </div>
                                   
                                 
                              </AccordionContent>
                            </AccordionItem>
                          ))}
                        </Accordion>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* <div className="grid gap-4">
            <Card className="w-[20vw]">
              <CardHeader>
                <CardTitle> Tickets</CardTitle>
                <CardDescription>
                  Tickets generated in this report.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4">
                  {detail["reports"][0]["tickets"].map((ticket, index) => (
                    <div
                      onMouseEnter={() => setIsHovering(true)}
                      onMouseLeave={() => setIsHovering(false)}
                    >
                      <div
                        key={index}
                        className={`flex transition ease-in-out delay-150  hover:-translate-y-1 hover:scale-110 hover:bg-indigo-800 duration-300 ... items-center gap-4 rounded-lg bg-muted p-4 ${
                          ticket.status === "Resolved"
                            ? "opacity-50 pointer-events-none"
                            : ""
                        }`}
                      >
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-accent text-accent-foreground">
                          <TicketIcon className="h-5 w-5" />
                        </div>
                        <div className="flex-1">
                          <div className="font-small text-sm">
                            {ticket.title}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            {ticket.title}
                          </div>
                          <div className="mt-2 flex items-center gap-2">
                            <Badge
                              variant="outline"
                              className={`${
                                ticket.risk === "High"
                                  ? "bg-red-500 text-red-50"
                                  : ticket.risk === "Low"
                                  ? "bg-green-500 text-green-50 w-[8vw]"
                                  : ticket.risk === "Medium" ? "bg-yellow-500 text-yellow-50" : "bg-indigo-500 text-indigo-50"
                              }`}
                            >
                              {ticket.status === "Resolved"
                                ? "Resolved"
                                : `${ticket.risk}`}
                            </Badge>
                          </div>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => {}}
                        >
                          <EyeIcon className="h-4 w-4 " />
                          <span className="sr-only">View Ticket</span>
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div> */}
        </div>
      ) : (
        <p>Loading...</p>
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
    case "critical":
      colorClass = "bg-red-500 text-red-50";
      break;
      case "high":
        colorClass = "bg-red-700 text-red-100"
        break;
    case "medium":
      colorClass = "bg-yellow-500 text-yellow-50";
      break;
    case "low":
      colorClass = "bg-green-500 text-green-50";
      break;
    case "Informational":
      colorClass = "bg-indigo-500 text-indigo-50";
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

//   cweIdCount:[
//     {
//         id:"367",
//         count:4
//     }
//   ]

function CWEChart({ chartData, cwecount }) {
  const chartConfig = {
    visitors: {
      label: "Vulnerabilities",
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
  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle className="text-lg">CWE Vulnerabilities Detected</CardTitle>
        <CardDescription></CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <PieChart>
            <ChartTooltip
              content={<ChartTooltipContent nameKey="visitors" hideLabel />}
            />
            <Pie data={chartData} dataKey="visitors">
              <LabelList
                dataKey="browser"
                className="fill-background"
                stroke="none"
                fontSize={12}
                formatter={(value) => chartConfig[value]?.label || value}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 font-medium leading-none">
          Detected {cwecount} CWE vulnerabilites
        </div>
        <div className="flex items-center gap-2 font-medium leading-none">
          Reduced by 5.2% since last scan <TrendingDown className="h-4 w-4" />
        </div>
      </CardFooter>
    </Card>
  );
}

function OwaspChart({ chartData, owaspcount }) {
  const chartConfig = {
    visitors: {
      label: "Vulnerabilities",
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
  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle className="text-lg">
          OWASP Vulnerabilities Detected
        </CardTitle>
        <CardDescription></CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <PieChart>
            <ChartTooltip
              content={<ChartTooltipContent nameKey="visitors" hideLabel />}
            />
            <Pie data={chartData} dataKey="visitors">
              <LabelList
                dataKey="browser"
                className="fill-background"
                stroke="none"
                fontSize={12}
                formatter={(value) => chartConfig[value]?.label || value}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 font-medium leading-none">
          Detected {owaspcount} OWASP vulnerabilites
        </div>
        <div className="flex items-center gap-2 font-medium leading-none">
          Reduced by 15.6% since last scan <TrendingDown className="h-4 w-4" />
        </div>
      </CardFooter>
    </Card>
  );
}
