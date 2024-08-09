import { NextRequest, NextResponse } from "next/server"

const API_URL = process.env.API_URL || "http://localhost:3001"

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl

  if (pathname.startsWith("/api/")) {
    const apiPath = pathname.replace("/api/", "")
    const url = `${API_URL}/${apiPath}`

    console.log("Rewriting to", url)
    return NextResponse.rewrite(new URL(url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: "/api/:path*",
}
