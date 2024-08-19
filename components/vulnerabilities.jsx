"use client"
import {useState, useEffect} from "react"
export function Vulnerabilities() {
  const [vulnerabilities,setVulnerabilities] = useState([]);


  useEffect(()=> {
    const fetchAttacks = async () => {

      const response = await fetch("http://127.0.0.1:8000/api_reports/")
      
      if(!response.ok){
        console.log("Attacks cannot be fetched");
        return;
      }

      const data = await response.json();
      setVulnerabilities(data);
      return;
    }

    fetchAttacks();
  },[])

  return (
    (<div className="container mx-auto py-8 px-4 md:px-6">
      <h1 className="text-3xl font-bold mb-6">Vulnerable API Attacks</h1>
      <div className="grid gap-6">
      {vulnerabilities.map((vuln, index) => (
        <div key={index} className="bg-background rounded-lg shadow-lg p-6 mb-4">
          <h2 className="text-xl font-bold mb-4">{vuln.message}</h2>
          <div className="grid grid-cols-1 gap-4">
            <div>
              <h3 className="text-sm font-medium text-muted-foreground">Endpoint</h3>
              <p className="text-base font-medium">{vuln.api_endpoint}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-muted-foreground">Status Code</h3>
              <p className="text-base font-medium">{vuln.status}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-muted-foreground">Headers</h3>
              <ul className="text-base font-medium space-y-2">
                {vuln.headers?.map((header, i) => (
                  <li key={i}>{header}</li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-medium text-muted-foreground">Message</h3>
              <p className="text-base font-medium">{vuln.message}</p>
            </div>
          </div>
        </div>
      ))}
      </div>
    </div>)
  );
}
