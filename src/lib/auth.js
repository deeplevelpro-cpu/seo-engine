import { SignJWT, jwtVerify } from "jose";

const SESSION_COOKIE = "aie_session";
const SESSION_MAX_AGE = 60 * 60 * 24 * 30;

function getSecret() {
  const value = process.env.AUTH_SECRET;

  if (!value || value.length < 32) {
    throw new Error(
      "AUTH_SECRET must be configured and at least 32 characters long."
    );
  }

  return new TextEncoder().encode(value);
}

export async function createSession(user) {
  return new SignJWT({
    userId: String(user._id),
    role: user.role || "user",
    email: user.email,
  })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(`${SESSION_MAX_AGE}s`)
    .sign(getSecret());
}

export async function verifySession(token) {
  if (!token) return null;

  try {
    const { payload } = await jwtVerify(token, getSecret());

    if (!payload.userId) return null;

    return {
      userId: String(payload.userId),
      role: String(payload.role || "user"),
      email: String(payload.email || ""),
    };
  } catch {
    return null;
  }
}

export function sessionCookieOptions() {
  return {
    name: SESSION_COOKIE,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: SESSION_MAX_AGE,
  };
}

export function sessionCookieName() {
  return SESSION_COOKIE;
}
