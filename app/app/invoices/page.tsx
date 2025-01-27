import ListInterviews from "@/components/interview/ListInterviews";
import ListInvoices from "@/components/invoice/ListInvoices";
import { getAuthHeader } from "@/helpers/auth";
import { cookies } from "next/headers";
import React from "react";

async function getInvoices() {
  const nextCookies = await cookies();
  const authHeader = getAuthHeader(nextCookies);

  try {
    const response = await fetch(
      `${process.env?.API_URL}/api/invoices`,
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

const InvoicesPage = async () => {
  const data = await getInvoices();
  return <ListInvoices invoices={data?.invoices} />;
};

export default InvoicesPage;
