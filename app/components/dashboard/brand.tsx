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
style={{ backgroundColor: chartConfig[name.toLowerCase() as keyof typeof chartConfig].color }}
      />
      <div className="flex flex-col">
        <span className="font-medium">{name}</span>
        <span className="text-xs text-gray-400">{products} PRODUCTS</span>
      </div>
    </div>
    <span className="font-medium">${value}</span>
  </div>
);

export function Brand() {
  const total = chartData.reduce((sum, item) => sum + item.value, 0);

  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
        <CardTitle className="text-xl font-semibold">Brand Category</CardTitle>
        <select className="rounded-md border border-gray-200 px-3 py-1 text-sm outline-none">
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
              >
                {chartData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
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
