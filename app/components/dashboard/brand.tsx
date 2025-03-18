"use client";

import { Pie, PieChart, Tooltip, Cell } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltipContent,
} from "@/components/ui/chart";

const chartData = [
  { name: "Clothing", value: 0, products: 0 },
  { name: "Lingerie", value: 0, products: 0 },
  { name: "Footwear", value: 0, products: 0 },
  { name: "Accessories", value: 0, products: 0 },
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

export function Brand() {
  const total = chartData.reduce((sum, item) => sum + item.value, 0);

  return (
    <Card className="w-full p-4">
      <CardHeader className="flex flex-col items-center justify-between space-y-3 sm:flex-row sm:space-y-0">
        <CardTitle className="text-lg font-semibold sm:text-xl">
          Brand Category
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
            {/* ✅ Centering Fix for Total Amount */}
            <div
              className="absolute inset-0 flex w-full items-center justify-center text-center"
              style={{ left: "50%", transform: "translateX(-50%)" }}
            >
              <div className="flex h-full items-center justify-center">
                <div className="text-center">
                  <div className="text-xl font-bold sm:text-2xl">${total}</div>
                </div>
              </div>
            </div>

            {/* Pie Chart */}
            <PieChart
              width={200}
              height={200}
              className="mx-auto sm:h-[240px] sm:w-[240px]"
            >
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
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip content={<ChartTooltipContent />} />
            </PieChart>
          </ChartContainer>

          {/* Labels */}
          <div className="flex w-full flex-col px-4 sm:px-0">
            {chartData.map((item) => (
              <CustomLabel key={item.name} {...item} />
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default Brand;
