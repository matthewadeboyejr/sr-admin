import { NextResponse } from "next/server";

export default function middleware(req) {
  const token = req.cookies.get("accessToken");
  const url = req.nextUrl;

  if (!token && url.pathname.startsWith("/dashboard")) {
    return NextResponse.redirect(new URL("/", req.url));
  }
  return NextResponse.next();
}

export const config = { matcher: ["/dashboard/:path*"] };
