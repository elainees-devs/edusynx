// server/src/utils/tokenGenerator.ts
import crypto from "crypto";

export function generateResetToken(): string {
  return crypto.randomBytes(32).toString("hex"); // 64 characters long
}
