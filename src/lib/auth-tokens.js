import crypto from "crypto";

const VERIFICATION_TTL_MS = 1000 * 60 * 60 * 24;
const RESET_TTL_MS = 1000 * 60 * 30;

function createRawToken() {
  return crypto.randomBytes(32).toString("hex");
}

function hashToken(token) {
  return crypto
    .createHash("sha256")
    .update(token)
    .digest("hex");
}

export function createVerificationToken() {
  const token = createRawToken();

  return {
    token,
    tokenHash: hashToken(token),
    expiresAt: new Date(Date.now() + VERIFICATION_TTL_MS),
  };
}

export function createPasswordResetToken() {
  const token = createRawToken();

  return {
    token,
    tokenHash: hashToken(token),
    expiresAt: new Date(Date.now() + RESET_TTL_MS),
  };
}

export function hashAuthToken(token) {
  if (!token || typeof token !== "string") return null;
  return hashToken(token);
}
