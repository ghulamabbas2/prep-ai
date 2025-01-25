import { subscriptionWebhook } from "@/backend/controllers/payment.controller";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { success } = await subscriptionWebhook(request);

  return NextResponse.json({ success });
}
