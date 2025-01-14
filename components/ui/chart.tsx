"use client";

import { ReactNode } from "react";
import { TooltipProps } from "recharts";
import { Card } from "@/components/ui/card";

export type ChartConfig = {
  [key: string]: {
    label: string;
    color?: string;
  };
};

interface ChartContainerProps {
  children: ReactNode;
  config: ChartConfig;
  className?: string;
}

export function ChartContainer({
  children,
  config,
  className,
}: ChartContainerProps) {
  return (
    <div
      className={className}
      style={
        {
          ...Object.fromEntries(
            Object.entries(config).map(([key, value]) => [
              `--color-${key}`,
              value.color,
            ]),
          ),
        } as React.CSSProperties
      }
    >
      {children}
    </div>
  );
}

export function ChartTooltip({
  active,
  payload,
  content,
}: TooltipProps<number, string>) {
  if (!active || !payload) return null;
  return content;
}

interface ChartTooltipContentProps {
  label?: string;
  payload?: Array<{ value: number; name: string }>;
  indicator?: "dot" | "line";
  hideLabel?: boolean;
}

export function ChartTooltipContent({
  label,
  payload,
  indicator = "dot",
  hideLabel = false,
}: ChartTooltipContentProps) {
  return (
    <Card className="border-none shadow-none">
      <div className="grid gap-2 px-3 py-2">
        {!hideLabel && (
          <div className="text-[0.70rem] uppercase text-muted-foreground">
            {label}
          </div>
        )}
        <div className="grid gap-1">
          {payload?.map(({ value, name }, i) => (
            <div key={i} className="flex items-center gap-2">
              <div
                className={`h-1.5 w-1.5 rounded-full ${
                  indicator === "line" ? "h-0.5 w-2" : ""
                }`}
                style={{
                  background: `var(--color-${name.toLowerCase()})`,
                }}
              />
              <span className="font-medium">{value}</span>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
}
