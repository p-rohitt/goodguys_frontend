
"use client"

import { useEffect, useState } from "react"
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion"
import { Badge } from "@/components/ui/badge"
import { AlertCircle, AlertTriangleIcon } from "lucide-react"

export function Reports() {
  const [selectedReport, setSelectedReport] = useState(null)

  const [REPORTS,setREPORTS] = useState([])

  const [isLoading,setIsLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setIsLoading(true);
        const response = await fetch("http://127.0.0.1:8000/reports/");
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json(); // Parse the JSON data
        setREPORTS(data); // Set the parsed JSON data
      } catch (error) {
        console.error('Fetch error:', error); // Log any errors
      } finally {
        setIsLoading(false); // Set loading to false whether there is an error or not
      }
    };

    fetchDashboardData();
  }, []); 
  
  const handleRowClick = (report) => {
    setSelectedReport(report)
  }
  return (
    (<div className="flex flex-col h-full">
      <header className="bg-primary text-primary-foreground py-4 px-6">
        <h1 className="text-2xl font-bold">Scan Reports</h1>
      </header>
      <main className="flex-1 overflow-auto">
        <div className="p-6">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-muted text-muted-foreground">
                <th className="py-2 px-4 text-left">Timestamp</th>
                <th className="py-2 px-4 text-left">Alerts</th>
                <th className="py-2 px-4 text-left">Endpoints scanned</th>
              </tr>
            </thead>
            <tbody>
              {REPORTS.map((report, index) => (
                <tr
                  key={index}
                  className="border-b hover:bg-muted/50 cursor-pointer"
                  onClick={() => handleRowClick(report)}>
                  <td className="py-3 px-4">{report.timestamp}</td>
                  <td className="py-3 px-4 text-2xl font-bold flex items-center gap-2">{report.totalAlerts} <span><AlertTriangleIcon /></span></td>
                  <td className="py-3 px-4 text-2xl font-bold">{report.numEndpoints}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
      {selectedReport && (
        <div
          className="fixed inset-0 bg-background/80 flex items-center justify-center z-50 overflow-auto">
          <div
            className="bg-background p-8 rounded-lg shadow-lg w-[90vw] max-w-4xl h-[90vh] flex flex-col">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Scan Report - {selectedReport.timestamp}</h2>
              <button
                className="text-muted-foreground hover:text-foreground"
                onClick={() => setSelectedReport(null)}>
                <XIcon className="w-6 h-6" />
              </button>
            </div>
            <div className="flex-1 overflow-auto">
              <div className="grid gap-6">
                {selectedReport.report.map((detail, index) => (
                  <div key={index} className="border rounded-lg p-6">
                    <h3 className="text-md font-medium text-white bg-black p-2">{detail.endpoint}</h3>
                    <Accordion type="single" collapsible className="w-full">
                      {detail.alerts.map((alert, alertIndex) => (
                        <AccordionItem key={alert.id} value={`alert-${alertIndex}`}>
                          <AccordionTrigger>
                            <div className="flex items-center gap-2">
                              <span className="font-small"> {alertIndex + 1} </span>
                              <span className="text-sm">{alert.name}</span>
                              <div>
                              <RiskBadge risk={alert.risk}/>
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
                                <p className="text-muted-foreground">Evidence:</p>
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
                                <p className="text-muted-foreground">Risk Score:</p>
                                <p>{alert.risk_score ? alert.risk_score : "NA"}</p>
                              </div>
                              <div>
                                <p className="text-muted-foreground">Description:</p>
                                <p>{alert.description ? alert.description : "NA"}</p>
                              </div>
                              <div>
                                <p className="text-muted-foreground">Solution:</p>
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
    </div>)
  );
}

function XIcon(props) {
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
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
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
    case "Informational":
      colorClass = "bg-blue-200 text-white-50";
      break;
    case "Resolved":
      colorClass = "bg-green-500 text-green-50";
      break;
    default:
      colorClass = "";
  }
  return <Badge variant="outline" className={colorClass}>{risk}</Badge>;

}