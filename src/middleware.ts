import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Middleware function
export function middleware(request: NextRequest) {
  const sessionCookie =
    request.cookies.get("next-auth.session-token") ||
    request.cookies.get("__Secure-next-auth.session-token");

  const requestedRoute = request.nextUrl.pathname;

  // Jodi user login na kore thake taile login page-e pathano hobe
  if (!sessionCookie) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("callbackUrl", requestedRoute); // Requested route-ta rakha hocche
    return NextResponse.redirect(loginUrl);
  }

  // Jodi user kichu private URL na chai tahole "/" route-e pathano hobe
  if (requestedRoute === "/") {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

// See "Matching Paths" to learn more
export const config = {
  matcher: ["/my-bookings", "/my-wishlists"], // Private routes-er jonno matcher
};
