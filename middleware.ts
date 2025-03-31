import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  return new Response(
    JSON.stringify({
      url: request.url,
      method: request.method,
      headers: Object.fromEntries(request.headers.entries()),
    }),
    { status: 200, headers: { "Content-Type": "application/json" } }
  );
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: "/about/:path*",
};
