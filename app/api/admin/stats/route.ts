import { getDashboardStats } from "@/backend/controllers/auth.controller";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const res = await getDashboardStats(request);

  if (res?.error) {
    return NextResponse.json(
      {
        error: { message: res?.error?.message },
      },
      { status: res.error?.statusCode }
    );
  }

  return NextResponse.json({ data: res });
}
