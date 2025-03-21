"use client";

import { Line, LineChart, ResponsiveContainer, XAxis, Tooltip } from "recharts";

export function MiniChart({ data }) {
  return (
    <div className="w-full max-w-[200px] h-[80px]">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <XAxis dataKey="day" />
          <Tooltip />
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