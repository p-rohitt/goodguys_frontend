"use client"

import { TrendingUp } from "lucide-react"
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
const chartData = [
    { attack: "A01", count: 3, fill: "var(--color-brokenAccessControl)" },
    { attack: "A02", count: 1, fill: "var(--color-cryptographicFailures)" },
    { attack: "A03", count: 23, fill: "var(--color-injection)" },
    { attack: "A04", count: 10, fill: "var(--color-insecureDesign)" },
    { attack: "A05", count: 16, fill: "var(--color-securityMisconfig)" },
    { attack: "A06", count: 0, fill: "var(--color-vulnerableComponents)" },
    {
      attack: "A07",
      count: 2,
      fill: "var(--color-identificationAuthFailures)",
    },
    { attack: "A08", count: 1, fill: "var(--color-softwareIntegrityFailures)" },
    {
      attack: "A09",
      count: 0,
      fill: "var(--color-loggingMonitoringFailures)",
    },
    { attack: "A10", count: 3, fill: "var(--color-serverSideRequestForgery)" },
]

const chartConfig = {
        brokenAccessControl: { label: "Broken Access Control", color: "hsl(var(--chart-1))" },
        cryptographicFailures: { label: "Cryptographic Failures", color: "hsl(var(--chart-2))" },
        injection: { label: "Injection", color: "hsl(var(--chart-3))" },
        insecureDesign: { label: "Insecure Design", color: "hsl(var(--chart-4))" },
        securityMisconfig: { label: "Security Misconfiguration", color: "hsl(var(--chart-5))" },
        vulnerableComponents: { label: "Vulnerable and Outdated Components", color: "hsl(var(--chart-2))" },
        identificationAuthFailures: {
          label: "Identification and Authentication Failures",
          color: "hsl(var(--chart-1))",
        },
        softwareIntegrityFailures: { label: "Software and Data Integrity Failures", color: "hsl(var(--chart-3))" },
        loggingMonitoringFailures: { label: "Security Logging and Monitoring Failures", color: "hsl(var(--chart-4))" },
        serverSideRequestForgery: { label: "Server-Side Request Forgery (SSRF)", color: "hsl(var(--chart-3))" },
      
}

export function APIDetailsChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>OWASP Attacks Prevented</CardTitle>
        <CardDescription>For this endpoint</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent />}
            />
            <Bar dataKey="count" radius={3} />
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Showing total visitors for the last 6 months
        </div>
      </CardFooter>
    </Card>
  )
}
