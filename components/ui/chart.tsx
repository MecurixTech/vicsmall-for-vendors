"use client";

import { TooltipProps } from "recharts";
import {
  NameType,
  ValueType,
} from "recharts/types/component/DefaultTooltipContent";

export type ChartConfig = {
  [key: string]: {
    label: string;
    color: string;
  };
};

interface ChartContainerProps {
  config: ChartConfig;
  children: React.ReactNode;
  className?: string;
}

export function ChartContainer({
  config,
  children,
  className,
}: ChartContainerProps) {
  return <div className={className}>{children}</div>;
}

export function ChartTooltipContent({
  active,
  payload,
  hideLabel,
}: TooltipProps<ValueType, NameType> & { hideLabel?: boolean }) {
  if (!active || !payload?.length) return null;

  const data = payload[0];
  const name = data.name as string;
  const value = data.value as number;

  return (
    <div className="rounded-lg border bg-background p-2 shadow-sm">
      {!hideLabel && (
        <div className="text-sm text-muted-foreground">{name}</div>
      )}
      <div className="text-sm font-bold">${value}</div>
    </div>
  );
}
