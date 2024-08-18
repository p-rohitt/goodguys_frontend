export const  REPORTS = [
    {
      id: "1",
      timestamp: "2024-08-18T10:15:30Z",
      num:2,
      report: [
        {
          endpoint: "/api/items/123",

          alerts: [
            {
              id: "101",
              method: "GET",
              evidence: "public, max-age=0, must-revalidate",
              cweid: "525",
              wascid: "13",
              description: "The cache-control header has not been set properly or is missing, allowing the content to be cached.",
              url: "https://example.com/api/items/123",
              alert: "Re-examine Cache-control Directives",
              solution: "For secure content, ensure the cache-control HTTP header is set with 'no-store' or 'no-cache'.",
              param: "cache-control",
              name: "Re-examine Cache-control Directives",
              risk: "Informational",
              risk_score: "1"
            },
            {
              id: "102",
              method: "GET",
              evidence: "X-Frame-Options header missing",
              cweid: "1021",
              wascid: "15",
              description: "The X-Frame-Options header is missing, which could allow clickjacking attacks.",
              url: "https://example.com/api/items/123",
              alert: "Missing X-Frame-Options Header",
              solution: "Ensure that the X-Frame-Options header is set to 'DENY' or 'SAMEORIGIN' to prevent clickjacking.",
              param: "X-Frame-Options",
              name: "Missing X-Frame-Options Header",
              risk: "Medium",
              risk_score: "3"
            }
          ]
        },
        {
          endpoint: "/api/users",
          alerts: [
            {
              id: "103",
              method: "POST",
              evidence: "X-Content-Type-Options header missing",
              cweid: "16",
              wascid: "15",
              description: "The X-Content-Type-Options header is missing, which allows the browser to perform content-type sniffing.",
              url: "https://example.com/api/users",
              alert: "Missing X-Content-Type-Options Header",
              solution: "Ensure that the X-Content-Type-Options header is set to 'nosniff' in the response.",
              param: "X-Content-Type-Options",
              name: "Missing X-Content-Type-Options Header",
              risk: "Low",
              risk_score: "2"
            },
            {
              id: "104",
              method: "POST",
              evidence: "Strict-Transport-Security header missing",
              cweid: "311",
              wascid: "5",
              description: "The Strict-Transport-Security (HSTS) header is missing, which could allow man-in-the-middle attacks.",
              url: "https://example.com/api/users",
              alert: "Missing Strict-Transport-Security Header",
              solution: "Ensure that the Strict-Transport-Security header is set in the response.",
              param: "Strict-Transport-Security",
              name: "Missing Strict-Transport-Security Header",
              risk: "Medium",
              risk_score: "3"
            }
          ]
        }
      ]
    },
    {
      id: "2",
      timestamp: "2024-08-18T10:45:00Z",
      num:2,
      report: [
        {
          endpoint: "/api/login",
          alerts: [
            {
              id: "105",
              method: "POST",
              evidence: "Password field sent in plaintext",
              cweid: "319",
              wascid: "9",
              description: "Sensitive data such as passwords are being transmitted in plaintext.",
              url: "https://example.com/api/login",
              alert: "Sensitive Data Exposure",
              solution: "Ensure that sensitive data is encrypted in transit using SSL/TLS.",
              param: "password",
              name: "Sensitive Data Exposure",
              risk: "High",
              risk_score: "4"
            },
            {
              id: "106",
              method: "POST",
              evidence: "No rate limiting on login attempts",
              cweid: "307",
              wascid: "7",
              description: "The login endpoint is vulnerable to brute force attacks due to the lack of rate limiting.",
              url: "https://example.com/api/login",
              alert: "Lack of Rate Limiting",
              solution: "Implement rate limiting on the login endpoint to mitigate brute force attacks.",
              param: "login",
              name: "Lack of Rate Limiting",
              risk: "High",
              risk_score: "4"
            }
          ]
        },
        {
          endpoint: "/api/orders",
          alerts: [
            {
              id: "107",
              method: "GET",
              evidence: "Strict-Transport-Security header missing",
              cweid: "311",
              wascid: "5",
              description: "The Strict-Transport-Security (HSTS) header is missing, which could allow man-in-the-middle attacks.",
              url: "https://example.com/api/orders",
              alert: "Missing Strict-Transport-Security Header",
              solution: "Ensure that the Strict-Transport-Security header is set in the response.",
              param: "Strict-Transport-Security",
              name: "Missing Strict-Transport-Security Header",
              risk: "Medium",
              risk_score: "3"
            },
            {
              id: "108",
              method: "GET",
              evidence: "X-Content-Type-Options header missing",
              cweid: "16",
              wascid: "15",
              description: "The X-Content-Type-Options header is missing, which allows the browser to perform content-type sniffing.",
              url: "https://example.com/api/orders",
              alert: "Missing X-Content-Type-Options Header",
              solution: "Ensure that the X-Content-Type-Options header is set to 'nosniff' in the response.",
              param: "X-Content-Type-Options",
              name: "Missing X-Content-Type-Options Header",
              risk: "Low",
              risk_score: "2"
            }
          ]
        }
      ]
    }
  ];
  