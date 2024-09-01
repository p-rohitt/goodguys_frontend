"use client"

import React, { useState, useEffect } from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const TOTAL_POINTS = 30 // Increased to show more data points horizontally

export default function Demochart() {
  const [data, setData] = useState(Array(TOTAL_POINTS).fill(0).map((_, i) => ({ time: i, value: 0 })))

  useEffect(() => {
    const interval = setInterval(() => {
      setData(prevData => {
        const newData = [...prevData.slice(1), {
          time: prevData[prevData.length - 1].time + 1,
          value: Math.floor(Math.random() * 1000)
        }]
        return newData
      })
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  return (
    <Card className="w-full max-w-5xl mx-auto"> {/* Increased max-width */}
      <CardHeader className="pb-4">
        <CardTitle className="text-lg">Real Time API Traffic</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={250}> {/* Reduced height */}
          <LineChart 
            data={data}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            {/* <CartesianGrid /> */}
            <XAxis 
              dataKey="time" 
              domain={['dataMin', 'dataMax']}
              type="number"
              tickFormatter={(value) => ``}
            />
            <YAxis spacing={50} />
            <Tooltip 
            labelStyle={{color:"#000"}}
              formatter={(value, name) => [`${value}`, 'Traffic']}
              labelFormatter={(label) => `Time: ${label}s`}
                itemStyle={{color:"#000"}}
            />
            <Line 
              type="monotone" 
              dataKey="value" 
              stroke="hsl(var(--primary))" 
              strokeWidth={1}
              dot={false}
              isAnimationActive={false}
                animateNewValues
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}

//sjnlsjen