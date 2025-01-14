"use client";

import { Pie, PieChart, Tooltip } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltipContent,
} from "@/components/ui/chart";

const chartData = [
  { name: "Clothing", value: 250, products: 51, fill: "#FF4D4D" },
  { name: "Lingerie", value: 1050, products: 126, fill: "#1A1A66" },
  { name: "Footwear", value: 790, products: 148, fill: "#2E8B57" },
  { name: "Accessories", value: 1200, products: 305, fill: "#FFA500" },
];

const chartConfig = {
  clothing: {
    label: "Clothing",
    color: "#FF4D4D",
  },
  lingerie: {
    label: "Lingerie",
    color: "#1A1A66",
  },
  footwear: {
    label: "Footwear",
    color: "#2E8B57",
  },
  accessories: {
    label: "Accessories",
    color: "#FFA500",
  },
} satisfies ChartConfig;

const CustomLabel = ({ name, value, products }: any) => (
  <div className="flex items-center justify-between gap-4 text-sm">
    <div className="flex items-center gap-3">
      <div
        className="h-2 w-2 flex-shrink-0 rounded-full"
        style={{ backgroundColor: chartConfig[name.toLowerCase()].color }}
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
    <Card className="w-full max-w-[600px]">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
        <CardTitle className="text-xl font-semibold">Sales Category</CardTitle>
        <select
          className="rounded-md border border-gray-200 px-3 py-1 text-sm outline-none"
          defaultValue="week"
        >
          <option value="week">Week</option>
          <option value="month">Month</option>
          <option value="year">Year</option>
        </select>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-[1.2fr,1fr] gap-8">
          <ChartContainer
            config={chartConfig}
            className="relative mx-auto w-full max-w-[240px]"
          >
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div className="text-2xl font-bold">${total}</div>
              </div>
            </div>
            <PieChart width={240} height={240}>
              <Pie
                data={chartData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={85}
                paddingAngle={4}
              />
              <Tooltip content={<ChartTooltipContent />} />
            </PieChart>
          </ChartContainer>
          <div className="flex flex-col justify-center gap-4">
            {chartData.map((item) => (
              <CustomLabel key={item.name} {...item} />
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}