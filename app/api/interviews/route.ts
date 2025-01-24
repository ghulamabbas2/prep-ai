import { getInterviews } from "@/backend/controllers/interview.controller";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const res = await getInterviews(request);

  const { interviews, resPerPage, filteredCount } = res;

  return NextResponse.json({ interviews, resPerPage, filteredCount });
}
