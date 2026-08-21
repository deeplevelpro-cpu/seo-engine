import { NextResponse } from "next/server";
import { sessionCookieOptions, sessionCookieName } from "@/lib/auth";

export async function POST() {
  const response = NextResponse.json({
    success: true,
  });

  response.cookies.set({
    ...sessionCookieOptions(),
    name: sessionCookieName(),
    value: "",
    maxAge: 0,
  });

  return response;
}
