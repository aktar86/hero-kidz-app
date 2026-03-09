import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

const privetRoutes = ["/dashboard", "/cart", "/checkout"];

export async function proxy(req) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  const isAuthenticated = Boolean(token);
  const reqPath = req.nextUrl.pathname;
  const isPrivate = privetRoutes.some((route) => reqPath.startsWith(route));

  if (!isAuthenticated && isPrivate) {
    const loginUrl = new URL("/login", req.url);
    loginUrl.searchParams.set("callbackUrl", reqPath);
    return NextResponse.redirect(loginUrl);
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/cart/:path*", "/checkout/:path*"],
};
