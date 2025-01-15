import withAuth from "next-auth/middleware";
import { IUser } from "./backend/models/user.model";

export default withAuth(function middleware(req) {
  const url = req?.nextUrl?.pathname;
  const user = req?.nextauth?.token?.user as IUser;
});

export const config = {
  matcher: ["/app/:path*"],
};
