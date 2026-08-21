import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import User from "@/models/User";
import { hashPassword } from "@/lib/password";
import { hashAuthToken } from "@/lib/auth-tokens";

export async function POST(req) {
  try {
    const body = await req.json();

    const token =
      typeof body?.token === "string" ? body.token.trim() : "";

    const password =
      typeof body?.password === "string"
        ? body.password
        : "";

    if (!token || !password) {
      return NextResponse.json(
        {
          success: false,
          error: "Reset token and new password are required.",
        },
        { status: 400 }
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

    const tokenHash = hashAuthToken(token);

    const user = await User.findOne({
      resetTokenHash: tokenHash,
      resetTokenExpiresAt: { $gt: new Date() },
    }).select("+resetTokenHash +resetTokenExpiresAt");

    if (!user) {
      return NextResponse.json(
        { success: false, error: "Invalid or expired reset token." },
        { status: 400 }
      );
    }

    user.passwordHash = await hashPassword(password);
    user.resetTokenHash = null;
    user.resetTokenExpiresAt = null;

    await user.save();

    return NextResponse.json({
      success: true,
      message: "Password reset successfully.",
    });
  } catch (error) {
    console.error("Reset password error:", error);

    return NextResponse.json(
      { success: false, error: "Unable to reset password." },
      { status: 500 }
    );
  }
}
