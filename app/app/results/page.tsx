import ListInterviews from "@/components/interview/ListInterviews";
import ListResults from "@/components/result/ListResults";
import { getAuthHeader } from "@/helpers/auth";
import { cookies } from "next/headers";
import React from "react";

async function getInterviews() {
  try {
    const nextCookies = await cookies();
    const authHeader = getAuthHeader(nextCookies);

    const response = await fetch(
      `${process.env?.API_URL}/api/interviews`,
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

const ResultsPage = async () => {
  const data = await getInterviews();
  return <ListResults data={data} />;
};

export default ResultsPage;
