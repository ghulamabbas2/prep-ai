import { getInvoices } from "@/backend/controllers/payment.controller";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const res = await getInvoices(request);

  if (res?.error) {
    return NextResponse.json(
      {
        error: { message: res?.error?.message },
      },
      { status: res.error?.statusCode }
    );
  }

  return NextResponse.json({ invoices: res?.invoices });
}
