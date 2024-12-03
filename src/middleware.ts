import { getToken } from "next-auth/jwt";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(req : NextRequest) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  const manualToken = (await cookies()).get('Manual Token');//manual token also can be get from here

  // Redirect unauthenticated users to login
  if (!token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // Role-based restriction for `/user-dashboard`
  const { pathname } = req.nextUrl;
  if (pathname.startsWith("/dashboard") && token.role !== "admin") {
    return NextResponse.redirect(new URL("/", req.url)); // Redirect non-admin users
  }

  return NextResponse.next(); // Allow authorized users
}

export const config = {
  matcher: ["/", "/user-dashboard/:path*"], // Protect homepage and dashboard routes
};
