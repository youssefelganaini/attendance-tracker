"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { PlusCircle, MinusCircle, Users } from "lucide-react";

type ChangeEvent = {
  type: "increment" | "decrement";
  timestamp: Date;
};

export const AttendeeTracker = () => {
  const [count, setCount] = useState(0);
  const [changes, setChanges] = useState<ChangeEvent[]>([]);
  const [chartData, setChartData] = useState<{ time: string; count: number }[]>(
    []
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setChartData((prev) => {
        const newData = [
          ...prev,
          { time: new Date().toLocaleTimeString(), count },
        ];
        return newData.slice(-10); // Keep only the last 10 data points
      });
    }, 5000); // Update every 5 seconds

    return () => clearInterval(interval);
  }, [count]);

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <Card className="max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-center">
            Fitstar Schwabing Capacity Tracker
          </CardTitle>
          <CardDescription className="text-center">
            Track and manage gym capacity in real-time
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-8">
          <div className="flex justify-center items-center space-x-4">
            <Card className="w-40 h-40 flex items-center justify-center">
              <CardContent className="text-center">
                <Users className="h-12 w-12 mx-auto mb-2" />
                <div className="text-4xl font-bold">{count}</div>
                <div className="text-sm text-muted-foreground">Attendees</div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle>Recent Changes</CardTitle>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[200px]">
                  {changes.map((change, index) => (
                    <div
                      key={index}
                      className="flex justify-between items-center py-2 border-b last:border-b-0"
                    >
                      <span className="capitalize">{change.type}</span>
                      <span className="text-sm text-muted-foreground">
                        {change.timestamp.toLocaleTimeString()}
                      </span>
                    </div>
                  ))}
                </ScrollArea>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Capacity Over Time</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[200px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={chartData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="time" />
                      <YAxis />
                      <Tooltip />
                      <Line type="monotone" dataKey="count" stroke="#8884d8" />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AttendeeTracker;
