// server/src/controllers/security/password-reset.controller.ts
import { Request, Response } from "express";
import crypto from "crypto";
import bcrypt from "bcrypt"
import { passwordResetTokenSchema } from "../../validation/password-reset.schema";
import { AppError, handleAsync } from "../../utils";
import { sendResetTokenEmail } from "../../services/email.service";
import { SuperAdminModel, UserModel } from "../../models";
import {  ISchool } from "../../types";
import { PasswordResetTokenRepository } from "../../repositories";

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

  const email = found.email;

  // Check both user and admin
  const user = await UserModel.findOne({ email }).populate("school", "slug");
  const admin = await SuperAdminModel.findOne({ email });

  if (!user && !admin) {
    throw new AppError("No user found for this token", 404);
  }

  // Determine role
  const role = user ? user.role : admin?.role;

  // Determine slug if not super-admin
  const slug = role !== "super-admin" && user?.school && typeof user.school === "object" && "slug" in user.school
    ? (user.school as ISchool).slug
    : undefined;

  return res.status(200).json({
    message: "Token is valid",
    data: {
      email,
      role,
      slug, // only included if role is not super-admin
    },
  });
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

  resetPassword = handleAsync(async (req: Request, res: Response) => {
  const { token, newPassword } = req.body;

  // 1. Validate token
  const resetToken = await tokenRepo.findValidToken(token);
  if (!resetToken) {
    throw new AppError("Invalid or expired token", 400);
  }

  const email = resetToken.email;

  // 2. Find user or admin
  const user = await UserModel.findOne({ email }).populate("school", "slug");
  const admin = await SuperAdminModel.findOne({ email });

  if (!user && !admin) {
    throw new AppError("No account found for this email", 404);
  }

  // 3. Validate password
  if (!newPassword || newPassword.length < 8) {
    throw new AppError("Password must be at least 8 characters long", 400);
  }

  // 4. Hash and update password
  const hashedPassword = await bcrypt.hash(newPassword, 10);
  if (user) {
    user.password = hashedPassword;
    await user.save();
  } else if (admin) {
    admin.password = hashedPassword;
    await admin.save();
  }

  // 5. Mark token as used
  await tokenRepo.markAsUsed(token);

  // 6. Get role and slug
  const role = admin ? "super-admin" : user?.role || "unknown";
  const slug = user && typeof user.school === "object" && "slug" in user.school
    ? (user.school as ISchool).slug
    : undefined;

  return res.status(200).json({
    message: "Password has been reset",
    data: {
      role,
      slug,
    },
  });
});
}
