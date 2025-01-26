"use client";

import React from "react";
import DashboardStats from "./DashboardStats";
import { useSession } from "next-auth/react";
import { IUser } from "@/backend/models/user.model";
import DashboardStatsChart from "./DashboardStatsChart";
import StatsDatePicker from "../date-picker/StatsDatePicker";

type DashboardProps = {
  data: {
    totalInterviews: number;
    completionRate: number;
    stats: Array<{
      date: string;
      totalInterviews: number;
      completedQuestion: number;
      unasweredQuestion: number;
      completionRate: number;
    }>;
  };
};

const Dashboard = ({ data }: DashboardProps) => {
  const session = useSession();
  const user = session.data?.user as IUser;
  const subscriptionStatus = user?.subscription?.status;

  return (
    <div className="mt-5">
      <DashboardStats
        totalInterviews={data?.totalInterviews}
        completionRate={data?.completionRate}
        subscriptionStatus={subscriptionStatus}
      />

      <div className="flex justify-between items-center my-16">
        <h1 className="text-xl font-bold leading-none tracking-tight text-gray-900 md:text-2xl lg:text-3xl dark:text-white">
          Your Interview Stats
        </h1>

        <StatsDatePicker />
      </div>

      {data?.stats?.length > 0 ? (
        <DashboardStatsChart stats={data.stats} />
      ) : (
        <div className="flex justify-center items-center h-80">
          <p className="text-gray-500 dark:text-gray-400">
            No interview stats available for the selected date range.
          </p>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
