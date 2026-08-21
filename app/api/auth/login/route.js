import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import User from "@/models/User";
import { verifyPassword } from "@/lib/password";
import { createSession, sessionCookieOptions } from "@/lib/auth";

const WINDOW_MS = 60_000;
const MAX_REQUESTS = 10;
const rateLog = new Map();

function getKey(req) {
  const forwarded = req.headers.get("x-forwarded-for");
  return (
    forwarded?.split(",")[0]?.trim() ||
    req.headers.get("x-real-ip") ||
    "unknown"
  );
}

function rateLimited(req) {
  const key = getKey(req);
  const now = Date.now();

  const recent = (rateLog.get(key) || []).filter(
    (t) => now - t < WINDOW_MS
  );

  recent.push(now);
  rateLog.set(key, recent);

  return recent.length > MAX_REQUESTS;
}

export async function POST(req) {
  try {
    if (rateLimited(req)) {
      return NextResponse.json(
        { success: false, error: "Too many login attempts. Try again shortly." },
        { status: 429 }
      );
    }

    const body = await req.json();

    const email =
      typeof body?.email === "string"
        ? body.email.trim().toLowerCase()
        : "";

    const password =
      typeof body?.password === "string"
        ? body.password
        : "";

    if (!email || !password) {
      return NextResponse.json(
        { success: false, error: "Email and password are required." },
        { status: 400 }
      );
    }

    await connectDB();

    const user = await User.findOne({ email }).select(
      "+passwordHash"
    );

    if (!user) {
      return NextResponse.json(
        { success: false, error: "Invalid email or password." },
        { status: 401 }
      );
    }

    const valid = await verifyPassword(
      password,
      user.passwordHash
    );

    if (!valid) {
      return NextResponse.json(
        { success: false, error: "Invalid email or password." },
        { status: 401 }
      );
    }

    user.lastLoginAt = new Date();
    await user.save();

    const token = await createSession(user);

    const response = NextResponse.json({
      success: true,
      user: {
        id: String(user._id),
        name: user.name,
        email: user.email,
      },
    });

    response.cookies.set({
      ...sessionCookieOptions(),
      value: token,
    });

    return response;
  } catch (error) {
    console.error("Login error:", error);

    return NextResponse.json(
      { success: false, error: "Unable to log in." },
      { status: 500 }
    );
  }
}
