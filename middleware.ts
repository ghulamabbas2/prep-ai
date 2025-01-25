import withAuth from "next-auth/middleware";
import { IUser } from "./backend/models/user.model";
import { isUserAdmin, isUserSubscribed } from "./helpers/auth";
import { NextResponse } from "next/server";

export default withAuth(function middleware(req) {
  const url = req?.nextUrl?.pathname;
  const user = req?.nextauth?.token?.user as IUser;

  const isSubscribed = isUserSubscribed(user);
  const isAdminUser = isUserAdmin(user);

  if (url?.startsWith("/app") && !isSubscribed && !isAdminUser) {
    return NextResponse.redirect(new URL("/", req?.url));
  }
});

export const config = {
  matcher: ["/app/:path*", "/api/interivews/:path*"],
};
