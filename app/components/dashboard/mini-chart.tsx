"use client";

import { Line, LineChart, ResponsiveContainer } from "recharts";

const data = [
  { value: 30 },
  { value: 20 },
  { value: 40 },
  { value: 25 },
  { value: 35 },
  { value: 50 },
  { value: 45 },
  { value: 60 },
];

export function MiniChart() {
  return (
    <div style={{ width: "120px", height: "60px" }}>
      <ResponsiveContainer>
        <LineChart data={data}>
          <Line
            type="monotone"
            dataKey="value"
            stroke="#4ade80"
            strokeWidth={2}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
