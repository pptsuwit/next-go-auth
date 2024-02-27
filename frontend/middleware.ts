import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  try {
    const token = request.cookies.get(process.env.TOKEN_NAME as string);
    if (token) return NextResponse.next();
    else
      return NextResponse.redirect(
        new URL(process.env.REDIRECT_TO_LOGIN as string, request.url)
      );
  } catch (err) {
    return NextResponse.redirect(
      new URL(process.env.REDIRECT_TO_LOGIN as string, request.url)
    );
  }
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|favicon.ico|login|register).*)",
  ],
};
