import { getAllUsers } from "@/backend/controllers/auth.controller";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const res = await getAllUsers(request);

  if (res?.error) {
    return NextResponse.json(
      {
        error: { message: res?.error?.message },
      },
      { status: res.error?.statusCode }
    );
  }

  const { users, filteredCount, resPerPage } = res;

  return NextResponse.json({ users, filteredCount, resPerPage });
}
