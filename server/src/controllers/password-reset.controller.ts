// server/src/controllers/password-reset.controller.ts
import { Request, Response } from "express";
import crypto from "crypto";
import { PasswordResetTokenRepository } from "../repositories/password-reset.repository";
import { passwordResetTokenSchema } from "../validation/password-reset.schema";
import { AppError, handleAsync } from "../utils";
import { sendResetTokenEmail } from "../services/email.service";

const tokenRepo = new PasswordResetTokenRepository();

export class PasswordResetTokenController {
  createToken = handleAsync(async (req: Request, res: Response) => {
    const parsed = passwordResetTokenSchema.safeParse(req.body);
    if (!parsed.success) {
      const issues = parsed.error.issues.map((e) => e.message).join(", ");
      throw new AppError(issues, 400);
    }

    const { email } = parsed.data;

    if (!email) {
      throw new AppError("Email is required", 400);
    }

    // Generate secure token
    const token = crypto.randomBytes(32).toString("hex");
    const expiresAt = new Date(Date.now() + 15 * 60 * 1000); // 15 minutes

    const newToken = await tokenRepo.create({
      email,
      token,
      expiresAt,
      used: false,
    });

    // Send reset token email
    await sendResetTokenEmail(email, token);

    res.status(201).json({ message: "Reset token created and email sent" });
  });

  verifyToken = handleAsync(async (req: Request, res: Response) => {
    const { token } = req.params;

    const found = await tokenRepo.findValidToken(token);
    if (!found) {
      throw new AppError("Invalid or expired token", 400);
    }

    res.status(200).json({ message: "Token is valid", data: found });
  });

  markTokenUsed = handleAsync(async (req: Request, res: Response) => {
    const { token } = req.params;

    const updated = await tokenRepo.markAsUsed(token);
    if (!updated) {
      throw new AppError("Token not found", 404);
    }

    res.status(200).json({ message: "Token marked as used" });
  });

  deleteUserTokens = handleAsync(async (req: Request, res: Response) => {
    const { email } = req.params;

    if (!email) {
      throw new AppError("Email is required", 400);
    }

    await tokenRepo.deleteByEmail(email);
    res.status(200).json({ message: "All reset tokens deleted for email" });
  });
}
