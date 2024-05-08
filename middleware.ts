import authMiddleware, { type NextRequestWithAuth} from "next-auth/middleware"
import { NextResponse } from "next/server"

/* @see https://www.propelauth.com/post/getting-url-in-next-server-components */
export default async function middleware(request: NextRequestWithAuth) {
  await authMiddleware(request)
  const headers = new Headers(request.headers)
  headers.set("x-current-path", request.nextUrl.pathname)
  return NextResponse.next({ headers })
}

export const config = {
  matcher: [
    // match all routes except static files and APIs
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
    "/t/:path*",
    "/s/:path*",
    "/settings/:path*",
  ],
};
