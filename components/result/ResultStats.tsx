"use client";

import type { CardProps } from "@heroui/react";

import React from "react";
import {
  ResponsiveContainer,
  RadialBarChart,
  RadialBar,
  Cell,
  PolarAngleAxis,
} from "recharts";
import { Card, cn } from "@heroui/react";
import { IInterview } from "@/backend/models/interview.model";
import { calculateAverageScore, calculateDuration } from "@/helpers/interview";

interface CircleChartProps {
  title: string;
  color: string;
  total?: number;
  strValue?: string;
  chartData: {
    name: string;
    value: number;
    fill: string;
  }[];
}

export default function ResultTable({ interview }: { interview: IInterview }) {
  const averageScore = calculateAverageScore(interview?.questions);

  const durationData = calculateDuration(
    interview?.duration,
    interview?.durationLeft
  );

  const data: CircleChartProps[] = [
    {
      title: "Questions",
      color: "default",
      total: interview?.numOfQuestions,
      strValue: `${interview?.answered} / ${interview?.numOfQuestions}`,
      chartData: [
        {
          name: "Questions",
          value: interview?.answered,
          fill: "hsl(var(--heroui-primary))",
        },
      ],
    },
    {
      title: "Result",
      color: "success",
      total: 10,
      strValue: `${averageScore} / 10`,
      chartData: [
        {
          name: "Result",
          value: parseFloat(averageScore?.toString()),
          fill: "hsl(var(--heroui-success))",
        },
      ],
    },
    {
      title: "Duration",
      color: "warning",
      total: durationData.total,
      strValue: durationData.strValue,
      chartData: [
        {
          name: "Time",
          value: durationData.chartDataValue,
          fill: "hsl(var(--heroui-warning))",
        },
      ],
    },
    {
      title: "Difficulty",
      color: "danger",
      total: 3,
      strValue: interview?.difficulty,
      chartData: [
        {
          name: "Difficulty",
          value:
            interview?.difficulty === "Entry Level"
              ? 1
              : interview?.difficulty === "Mid Level"
              ? 2
              : 3,
          fill: "hsl(var(--heroui-danger))",
        },
      ],
    },
  ];

  return (
    <div className="grid w-full grid-cols-1 gap-5 md:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-5">
      {data.map((item, index) => (
        <CircleChartCard key={index} {...item} />
      ))}
    </div>
  );
}

const formatTotal = (value: number | undefined) => {
  return value?.toLocaleString() ?? "0";
};

const CircleChartCard: React.FC<CircleChartProps> = ({
  title,
  color,
  chartData,
  total,
  strValue,
  ...props
}) => {
  return (
    <Card
      className={cn(
        "h-[220px] border border-transparent dark:border-default-100"
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
            endAngle={-45}
            innerRadius={90}
            outerRadius={70}
            startAngle={225}
          >
            <PolarAngleAxis
              angleAxisId={0}
              domain={[0, total ?? 0]}
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
                  {strValue ?? formatTotal(total)}
                </tspan>
              </text>
            </g>
          </RadialBarChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
};
