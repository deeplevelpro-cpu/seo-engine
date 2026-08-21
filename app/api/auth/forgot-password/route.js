import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import User from "@/models/User";
import { createPasswordResetToken } from "@/lib/auth-tokens";

export async function POST(req) {
  try {
    const body = await req.json();
    const email =
      typeof body?.email === "string"
        ? body.email.trim().toLowerCase()
        : "";

    if (!email) {
      return NextResponse.json(
        { success: false, error: "Email is required." },
        { status: 400 }
      );
    }

    await connectDB();

    const user = await User.findOne({ email }).select(
      "+resetTokenHash +resetTokenExpiresAt"
    );

    // Deliberately generic response to avoid account enumeration.
    if (!user) {
      return NextResponse.json({
        success: true,
        message:
          "If an account exists, password reset instructions can be generated.",
        deliveryReady: false,
      });
    }

    const generated = createPasswordResetToken();

    user.resetTokenHash = generated.tokenHash;
    user.resetTokenExpiresAt = generated.expiresAt;

    await user.save();

    return NextResponse.json({
      success: true,
      message:
        "Password reset token generated. Email delivery is not configured yet.",
      deliveryReady: false,
    });
  } catch (error) {
    console.error("Forgot password error:", error);

    return NextResponse.json(
      { success: false, error: "Unable to process password reset." },
      { status: 500 }
    );
  }
}
