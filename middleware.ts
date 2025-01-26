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

  if (url?.startsWith("/admin") && !isAdminUser) {
    return NextResponse.redirect(new URL("/", req?.url));
  }

  if (url?.startsWith("/api/admin") && !isAdminUser) {
    return new NextResponse(
      JSON.stringify({
        message: "You are not authorized to access this resource",
      }),
      { status: 401, headers: { "Content-Type": "application/json" } }
    );
  }
});

export const config = {
  matcher: [
    "/app/:path*",
    "/admin/:path*",
    "/subscribe",
    "/unsubscribe",
    "/api/admin/:path*",
    "/api/dashboard/:path*",
    "/api/interviews/:path*",
    "/api/invoices/:path*",
  ],
};
