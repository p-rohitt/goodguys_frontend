"use client"

import React, { useState } from 'react';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import { Label } from './ui/label';
import { Input } from './ui/input';
export function Scanner() {
  const [url, setUrl] = useState("");
  const [headers, setHeaders] = useState([{ key: "", value: "" }]);
  const [payload, setPayload] = useState("");

  const [apiResponse,setApiResponse] = useState("");

  const addHeader = () => {
    setHeaders([...headers, { key: "", value: "" }]);
  };

  const removeHeader = (index) => {
    const newHeaders = [...headers];
    newHeaders.splice(index, 1);
    setHeaders(newHeaders);
  };

  const handleHeaderChange = (index, field, value) => {
    const newHeaders = [...headers];
    newHeaders[index][field] = value;
    setHeaders(newHeaders);
  };

  const handlePayloadChange = (e) => {
    setPayload(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    

    const headersObject = headers.reduce((acc, header) => {
      if (header.key && header.value) {
        acc[header.key] = header.value;
      }
      return acc;
    }, {});


      const response = await fetch(url, {
        method: 'POST', 
        headers: {
          ...headersObject,
        },
        body: JSON.stringify(payload)
      });

      const data =  await response.json();
      console.log("Response : ", data.results)
      const stringifiedData  = JSON.stringify(data.results)
      setApiResponse(stringifiedData)
    
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-6 md:p-8">
      <h1 className="text-3xl font-bold mb-6">On Demand API Testing</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="url">URL</Label>
          <Input
            id="url"
            type="url"
            placeholder="Enter a URL"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            required
          />
        </div>
        <div className="space-y-2">
          <Label>Headers</Label>
          <div className="space-y-4">
            {headers.map((header, index) => (
              <div key={index} className="flex items-center gap-4">
                <Input
                  type="text"
                  placeholder="Key"
                  value={header.key}
                  onChange={(e) => handleHeaderChange(index, "key", e.target.value)}
                  required
                />
                <Input
                  type="text"
                  placeholder="Value"
                  value={header.value}
                  onChange={(e) => handleHeaderChange(index, "value", e.target.value)}
                  required
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => removeHeader(index)}
                >
                  <TrashIcon className="w-5 h-5" />
                </Button>
              </div>
            ))}
          </div>
          <Button type="button" onClick={addHeader}>
            <PlusIcon className="w-5 h-5 mr-2" />
            Add Header
          </Button>
        </div>
        <div className="space-y-2">
          <Label htmlFor="payload">Payload</Label>
          <Textarea
            id="payload"
            placeholder="Enter the payload"
            value={payload}
            onChange={handlePayloadChange}
            className={"h-[20vh]"}
          />
        </div>
        <div className="flex justify-end">
          <Button type="submit">Submit</Button>
        </div>
      </form>

      <div className=''>
       <p>
         {apiResponse}
        </p>
      </div>
    </div>
  );
}


function PlusIcon(props) {
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
      <path d="M5 12h14" />
      <path d="M12 5v14" />
    </svg>)
  );
}


function TrashIcon(props) {
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
      <path d="M3 6h18" />
      <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
      <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
    </svg>)
  );
}
