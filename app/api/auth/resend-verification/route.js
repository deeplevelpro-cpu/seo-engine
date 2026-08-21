import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import User from "@/models/User";
import { createVerificationToken } from "@/lib/auth-tokens";

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
      "+verificationTokenHash +verificationTokenExpiresAt"
    );

    // Do not leak whether an account exists.
    if (!user) {
      return NextResponse.json({
        success: true,
        message:
          "If an account exists, a verification message can be sent.",
      });
    }

    if (user.emailVerified) {
      return NextResponse.json({
        success: true,
        message: "This email is already verified.",
      });
    }

    const generated = createVerificationToken();

    user.verificationTokenHash = generated.tokenHash;
    user.verificationTokenExpiresAt = generated.expiresAt;

    await user.save();

    // Delivery will be connected to an email provider later.
    return NextResponse.json({
      success: true,
      message:
        "Verification token generated. Email delivery is not configured yet.",
      deliveryReady: false,
    });
  } catch (error) {
    console.error("Resend verification error:", error);

    return NextResponse.json(
      { success: false, error: "Unable to create verification request." },
      { status: 500 }
    );
  }
}
