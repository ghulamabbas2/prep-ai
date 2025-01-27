import Dashboard from "@/components/dashboard/Dashboard";
import ListInterviews from "@/components/interview/ListInterviews";
import { getAuthHeader } from "@/helpers/auth";
import { cookies } from "next/headers";
import React from "react";

async function getDashboardStats(searchParams: string) {
  try {
    const urlParams = new URLSearchParams(searchParams);
    const queryStr = urlParams.toString();

    const nextCookies = await cookies();
    const authHeader = getAuthHeader(nextCookies);

    const response = await fetch(
      `${process.env?.API_URL}/api/dashboard/stats?${queryStr}`,
      authHeader
    );

    if (!response.ok) {
      throw new Error("An error occurred while fetching the data");
    }

    const data = await response.json();
    return data;
  } catch (error: any) {
    throw new Error(error?.message);
  }
}

const DashboardPage = async ({
  searchParams,
}: {
  searchParams: Promise<string>;
}) => {
  const searchParamsValue = await searchParams;

  const data = await getDashboardStats(searchParamsValue);

  return <Dashboard data={data?.data} />;
};

export default DashboardPage;
