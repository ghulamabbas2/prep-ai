import { getToken } from "next-auth/jwt";
import { NextRequest } from "next/server";
import { IUser } from "../models/user.model";

export const getCurrentUser = async (request: Request) => {
  const nextRequest = new NextRequest(request.url, {
    headers: request.headers,
    method: request.method,
  });

  const session = await getToken({ req: nextRequest });

  if (!session) {
    throw new Error("No session found");
  }

  return session?.user as IUser;
};
