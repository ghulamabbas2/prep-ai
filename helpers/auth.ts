import { IUser } from "@/backend/models/user.model";
import { ReadonlyRequestCookies } from "next/dist/server/web/spec-extension/adapters/request-cookies";

export const getAuthCookieName = () =>
  process.env.NODE_ENV === "production"
    ? "__Secure-next-auth.session-token"
    : "next-auth.session-token";

export const getAuthHeader = (nextCookies: ReadonlyRequestCookies) => {
  const cookieName = getAuthCookieName();

  const nextAuthSessionToken = nextCookies.get(cookieName);

  return {
    headers: {
      Cookie: `${nextAuthSessionToken?.name}=${nextAuthSessionToken?.value}`,
    },
  };
};

export const isUserAdmin = (user: IUser): boolean => {
  return user?.roles?.includes("admin");
};

export const isUserSubscribed = (user: IUser): boolean => {
  return (
    user?.subscription?.status === "active" ||
    user?.subscription?.status === "past_due"
  );
};

export const isAdminPath = (pathname: string): boolean => {
  return pathname.includes("/admin");
};
