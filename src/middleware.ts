import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { isTokenExpired } from "./utils/jwt-function";

export async function middleware(req: NextRequest) {
  const token = await getToken({ req });
  if (!token) {
    return NextResponse.redirect(new URL("/sign-in", req.url));
  }

  //@ts-ignore
  const decode = JSON?.parse(atob(token.access_token.split(".")[1]));

  if (decode.exp * 1000 < new Date().getTime()) {
    return NextResponse.redirect(new URL("/sign-in", req.url));
  }
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/user/:path*", "/playlist-player/:path*"],
};
