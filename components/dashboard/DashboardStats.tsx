"use client";

import React from "react";
import { Card, Chip, cn } from "@heroui/react";
import { Icon } from "@iconify/react";

type Props = {
  totalInterviews: number;
  completionRate: number;
  subscriptionStatus: string;
};

export default function DashboardStats({
  totalInterviews,
  completionRate,
  subscriptionStatus,
}: Props) {
  const capitalizeFirstLetter = (string: string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const data = [
    {
      title: "Total Interviews",
      value: totalInterviews || 0,
      bgColor: "bg-primary-50",
      iconColor: "text-primary",
      iconName: "solar:users-group-rounded-linear",
    },
    {
      title: "Completion Rate",
      value: completionRate ? `${completionRate}%` : "0%",
      bgColor: "bg-warning-50",
      iconColor: "text-warning",
      iconName: "solar:users-group-two-rounded-bold",
    },
    {
      title: "Subscription",
      value: subscriptionStatus
        ? capitalizeFirstLetter(subscriptionStatus)
        : "No Subscription",
      bgColor: "bg-success-50",
      iconColor: "text-success",
      iconName: "solar:dollar-minimalistic-broken",
      change: "$9.99",
    },
  ];
  return (
    <div className="grid w-full grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3">
      {data.map(
        ({ title, value, bgColor, iconColor, iconName, change }, index) => (
          <Card
            key={index}
            className="border border-transparent dark:border-default-100"
          >
            <div className="flex p-4">
              <div
                className={cn(
                  "mt-1 flex h-8 w-8 items-center justify-center rounded-md",
                  bgColor
                )}
              >
                <Icon className={iconColor} icon={iconName} width={20} />
              </div>

              <div className="flex flex-col gap-y-2">
                <dt className="mx-4 text-small font-medium text-default-500">
                  {title}
                </dt>
                <dd className="px-4 text-2xl font-semibold text-default-700">
                  {value}
                </dd>
              </div>

              {change && (
                <Chip
                  className={"absolute right-4 top-4"}
                  classNames={{
                    content: "font-semibold text-[0.8rem]",
                  }}
                  color={"success"}
                  radius="sm"
                  size="sm"
                  variant="flat"
                >
                  {change}
                </Chip>
              )}
            </div>
          </Card>
        )
      )}
    </div>
  );
}
