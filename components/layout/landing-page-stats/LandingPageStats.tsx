"use client";

import type { ButtonProps, CardProps } from "@heroui/react";

import React from "react";
import {
  ResponsiveContainer,
  RadialBarChart,
  RadialBar,
  Cell,
  PolarAngleAxis,
} from "recharts";
import { Card, cn } from "@heroui/react";

type ChartData = {
  name: string;
  value: number;
  [key: string]: string | number;
};

type CircleChartProps = {
  title: string;
  color: ButtonProps["color"];
  chartData: ChartData[];
  total: number;
};

const data: CircleChartProps[] = [
  {
    title: "Activity",
    color: "default",
    total: 10000,
    chartData: [
      {
        name: "Active Users",
        value: 10000,
        fill: "hsl(var(--heroui-primary))",
      },
    ],
  },
  {
    title: "Interviews",
    color: "primary",
    total: 650000,
    chartData: [
      {
        name: "Interviews Created",
        value: 650000,
        fill: "hsl(var(--heroui-primary))",
      },
    ],
  },
  {
    title: "Companies",
    color: "secondary",
    total: 65,
    chartData: [
      {
        name: "Companies",
        value: 3150,
        fill: "hsl(var(--heroui-secondary))",
      },
    ],
  },
  {
    title: "Ratings",
    color: "success",
    total: 4.8,
    chartData: [
      { name: "Ratings", value: 4.5, fill: "hsl(var(--heroui-success))" },
    ],
  },
];

export default function LandingPageStats() {
  return (
    <>
      <hr className="my-10" />
      <dl className="grid w-full grid-cols-1 gap-5 md:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {data.map((item, index) => (
          <CircleChartCard key={index} {...item} />
        ))}
      </dl>
    </>
  );
}

const formatTotal = (value: number | undefined) => {
  return value?.toLocaleString() ?? "0";
};

const CircleChartCard = React.forwardRef<
  HTMLDivElement,
  Omit<CardProps, "children"> & CircleChartProps
>(({ className, title, color, chartData, total, ...props }, ref) => {
  return (
    <Card
      ref={ref}
      className={cn(
        "h-[240px] border border-transparent dark:border-default-100",
        className
      )}
      {...props}
    >
      <div className="flex h-full gap-x-3">
        <ResponsiveContainer
          className="[&_.recharts-surface]:outline-none"
          height="100%"
          width="100%"
        >
          <RadialBarChart
            barSize={10}
            cx="50%"
            cy="50%"
            data={chartData}
            endAngle={-270}
            innerRadius={90}
            outerRadius={70}
            startAngle={90}
          >
            <PolarAngleAxis
              angleAxisId={0}
              domain={[0, total]}
              tick={false}
              type="number"
            />
            <RadialBar
              angleAxisId={0}
              animationDuration={1000}
              animationEasing="ease"
              background={{
                fill: "hsl(var(--heroui-default-100))",
              }}
              cornerRadius={12}
              dataKey="value"
            >
              {chartData.map((_, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={`hsl(var(--heroui-${
                    color === "default" ? "foreground" : color
                  }))`}
                />
              ))}
            </RadialBar>
            <g>
              <text textAnchor="middle" x="50%" y="48%">
                <tspan
                  className="fill-default-500 text-tiny"
                  dy="-0.5em"
                  x="50%"
                >
                  {chartData?.[0].name}
                </tspan>
                <tspan
                  className="fill-foreground text-medium font-semibold"
                  dy="1.5em"
                  x="50%"
                >
                  {formatTotal(total)}+
                </tspan>
              </text>
            </g>
          </RadialBarChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
});

CircleChartCard.displayName = "CircleChartCard";
