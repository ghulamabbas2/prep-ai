"use client";

import React from "react";
import DashboardStats from "./DashboardStats";
import StatsDatePicker from "@/components/date-picker/StatsDatePicker";

type Props = {
  data: {
    totalUsers: number;
    activeSubscriptions: number;
    subscriptionWorth: number;
    totalInterviews: number;
    interviewCompletionRate: number;
    averageInterviewsPerUser: number;
  };
};

const Dashboard = ({ data }: Props) => {
  return (
    <div>
      <div className="flex justify-between items-center my-16">
        <h1 className="text-xl font-bold leading-none tracking-tight text-gray-900 md:text-2xl lg:text-3xl dark:text-white">
          Stats Overview:
        </h1>

        <StatsDatePicker />
      </div>

      <DashboardStats data={data} />
    </div>
  );
};

export default Dashboard;
