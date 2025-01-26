import { getInterviews } from "@/backend/controllers/interview.controller";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const res = await getInterviews(request, "admin");

  if (res?.error) {
    return NextResponse.json(
      {
        error: { message: res?.error?.message },
      },
      { status: res.error?.statusCode }
    );
  }

  const { interviews, filteredCount, resPerPage } = res;

  return NextResponse.json({ interviews, filteredCount, resPerPage });
}
