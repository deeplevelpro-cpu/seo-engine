import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import User from "@/models/User";
import { hashAuthToken } from "@/lib/auth-tokens";

export async function POST(req) {
  try {
    const body = await req.json();
    const token = typeof body?.token === "string" ? body.token.trim() : "";

    if (!token) {
      return NextResponse.json(
        { success: false, error: "Verification token is required." },
        { status: 400 }
      );
    }

    await connectDB();

    const tokenHash = hashAuthToken(token);

    const user = await User.findOne({
      verificationTokenHash: tokenHash,
      verificationTokenExpiresAt: { $gt: new Date() },
    }).select("+verificationTokenHash +verificationTokenExpiresAt");

    if (!user) {
      return NextResponse.json(
        { success: false, error: "Invalid or expired verification token." },
        { status: 400 }
      );
    }

    user.emailVerified = true;
    user.verificationTokenHash = null;
    user.verificationTokenExpiresAt = null;

    await user.save();

    return NextResponse.json({
      success: true,
      message: "Email verified successfully.",
    });
  } catch (error) {
    console.error("Verify email error:", error);

    return NextResponse.json(
      { success: false, error: "Unable to verify email." },
      { status: 500 }
    );
  }
}
