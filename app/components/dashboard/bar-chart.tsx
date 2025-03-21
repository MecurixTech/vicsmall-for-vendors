"use client";

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts";

interface BarChartData {
  name: string;
  value: number;
}

interface CustomBarChartProps {
  data: BarChartData[];
}

export function CustomBarChart({ data }: CustomBarChartProps) {
  return (
    <div className="w-full h-[300px]">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="value" fill="#4ade80" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}