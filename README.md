# API Security Management Dashboard

## Overview

The **API Security Management Dashboard** is a powerful tool designed to help organizations manage, monitor, and secure their APIs. With real-time traffic monitoring, comprehensive endpoint details, automated security processes, and seamless CI/CD integration, this dashboard provides everything you need to keep your APIs secure and compliant.

## Features

- **Endpoint Management:** 
  - View all the endpoints across your organization in one centralized location.
  - Monitor real-time traffic for each endpoint.
  - Access comprehensive details about the history and status of each endpoint.

- **Real-Time Notifications:**
  - Get instant notifications whenever a new endpoint is added to your Software Development Life Cycle (SDLC).

- **CI/CD Integration:**
  - Automate the extraction and scanning of new endpoints by integrating the dashboard with your CI/CD pipeline.
  - Start and schedule full scans as part of your continuous security practices.

- **Security Scanning:**
  - Perform detailed DAST (Dynamic Application Security Testing) and SAST (Static Application Security Testing) scans.
  - View comprehensive reports and insights from these scans directly within the dashboard.

- **Ticket Management:**
  - Generate and resolve custom tickets for security issues, tailored by our platform to fit your specific needs.
  - Track the status and resolution of these tickets within the dashboard.





# Steps to reproduce

Install the required dependencies

```bash

npm install

```

First, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) on your browser to see the result.

- Make sure you have the backend server running at http:127.0.0.1:8000
- Link to the backend server (here)[https://github.com/Shivayayy/goodguys_backend]



# Screenshots


## The Dashboard

![The Dashboard](/public/image.png)

## DAST and SAST reports

![DAST and SAST reports](/public/image-7.png)

## A DAST report in detail

![A DAST report in detail](/public/image-1.png)

## Custom Ticketing System

![Custom Ticketing System](/public/image-2.png)

## A ticket in detail with an option to add comments

![A ticket in detail with an option to add comments](/public/image-3.png)

## SDLC Integration

![SDLC Integration](/public/image-4.png)

## Detailed history and status of each endpoint

![Detailed history and status of each endpoint](/public/image-5.png)

## Schedule your scans

![Schedule your scans](/public/image-6.png)
