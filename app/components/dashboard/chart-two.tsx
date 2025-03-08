"use client";

import { Pie, PieChart, Tooltip, Cell } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltipContent,
} from "@/components/ui/chart";

const chartData = [
  { name: "Clothing", value: 250, products: 51 },
  { name: "Lingerie", value: 1050, products: 126 },
  { name: "Footwear", value: 790, products: 148 },
  { name: "Accessories", value: 1200, products: 305 },
];

const COLORS = ["#FF4D4D", "#1A1A66", "#2E8B57", "#FFA500"];

const chartConfig = {
  clothing: { label: "Clothing", color: "#FF4D4D" },
  lingerie: { label: "Lingerie", color: "#1A1A66" },
  footwear: { label: "Footwear", color: "#2E8B57" },
  accessories: { label: "Accessories", color: "#FFA500" },
} satisfies ChartConfig;

interface CustomLabelProps {
  name: string;
  value: number;
  products: number;
}

const CustomLabel = ({ name, value, products }: CustomLabelProps) => (
  <div className="flex items-center justify-between gap-4 text-sm">
    <div className="flex items-center gap-3">
      <div
        className="h-2 w-2 flex-shrink-0 rounded-full"
        style={{
          backgroundColor:
            chartConfig[name.toLowerCase() as keyof typeof chartConfig].color,
        }}
      />
      <div className="flex flex-col">
        <span className="font-medium">{name}</span>
        <span className="text-xs text-gray-400">{products} PRODUCTS</span>
      </div>
    </div>
    <span className="font-medium">${value}</span>
  </div>
);

export function Component() {
  const total = chartData.reduce((sum, item) => sum + item.value, 0);

  return (
    <Card className="w-full p-4">
      <CardHeader className="flex flex-col sm:flex-row items-center justify-between space-y-3 sm:space-y-0">
        <CardTitle className="text-lg sm:text-xl font-semibold">
          Sales Category
        </CardTitle>
        <select className="rounded-md border border-gray-200 px-3 py-1 text-sm outline-none">
          <option value="week">Week</option>
          <option value="month">Month</option>
          <option value="year">Year</option>
        </select>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col items-center gap-6 sm:grid sm:grid-cols-[1.2fr,1fr] sm:gap-8">
          <ChartContainer
            config={chartConfig}
            className="relative w-full max-w-[200px] sm:max-w-[240px]"
          >
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="flex items-center justify-center h-full">
                <div className="text-center">
                  <div className="text-xl sm:text-2xl font-bold">${total}</div>
                </div>
              </div>
            </div>
            <PieChart width={200} height={200} className="sm:w-[240px] sm:h-[240px]">
              <Pie
                data={chartData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                innerRadius={50}
                outerRadius={80}
                paddingAngle={4}
              >
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip content={<ChartTooltipContent />} />
            </PieChart>
          </ChartContainer>
          <div className="flex flex-col w-full px-4 sm:px-0">
            {chartData.map((item) => (
              <CustomLabel key={item.name} {...item} />
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}