import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import User from "@/models/User";
import { hashPassword } from "@/lib/password";
import { createSession, sessionCookieOptions } from "@/lib/auth";

const WINDOW_MS = 60_000;
const MAX_REQUESTS = 5;
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

function validEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function POST(req) {
  try {
    if (rateLimited(req)) {
      return NextResponse.json(
        { success: false, error: "Too many signup attempts. Try again shortly." },
        { status: 429 }
      );
    }

    const contentLength = Number(req.headers.get("content-length") || 0);

    if (contentLength > 10_000) {
      return NextResponse.json(
        { success: false, error: "Request too large." },
        { status: 413 }
      );
    }

    const body = await req.json();

    const name =
      typeof body?.name === "string" ? body.name.trim() : "";

    const email =
      typeof body?.email === "string"
        ? body.email.trim().toLowerCase()
        : "";

    const password =
      typeof body?.password === "string"
        ? body.password
        : "";

    if (!name || !email || !password) {
      return NextResponse.json(
        { success: false, error: "Name, email and password are required." },
        { status: 400 }
      );
    }

    if (name.length < 2 || name.length > 80) {
      return NextResponse.json(
        { success: false, error: "Name must be between 2 and 80 characters." },
        { status: 422 }
      );
    }

    if (!validEmail(email) || email.length > 254) {
      return NextResponse.json(
        { success: false, error: "Please enter a valid email address." },
        { status: 422 }
      );
    }

    if (password.length < 8 || password.length > 128) {
      return NextResponse.json(
        {
          success: false,
          error: "Password must be between 8 and 128 characters.",
        },
        { status: 422 }
      );
    }

    await connectDB();

    const existingUser = await User.findOne({ email })
      .select("_id")
      .lean();

    if (existingUser) {
      return NextResponse.json(
        {
          success: false,
          error: "An account with this email already exists.",
        },
        { status: 409 }
      );
    }

    const passwordHash = await hashPassword(password);

    const user = await User.create({
      name,
      email,
      passwordHash,
      role: "user",
      emailVerified: false,
    });

    const token = await createSession(user);
    const response = NextResponse.json(
      {
        success: true,
        user: {
          id: String(user._id),
          name: user.name,
          email: user.email,
        },
      },
      { status: 201 }
    );

    response.cookies.set({
      ...sessionCookieOptions(),
      value: token,
    });

    return response;
  } catch (error) {
    console.error("Signup error:", error);

    return NextResponse.json(
      { success: false, error: "Unable to create account." },
      { status: 500 }
    );
  }
}
