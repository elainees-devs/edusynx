// server/src/controllers/password-reset.controller.ts
import { Request, Response } from "express";
import { PasswordResetTokenRepository } from "../repositories/password-reset.repository";
import { handleAsync } from "../utils/handleAsync";
import { AppError } from "../utils/AppError";
import { passwordResetTokenSchema } from "../validation/password-reset.schema";

const tokenRepo = new PasswordResetTokenRepository();

export class PasswordResetTokenController {
  createToken = handleAsync(async (req: Request, res: Response) => {
    const parsed = passwordResetTokenSchema.safeParse(req.body);
    if (!parsed.success) {
      const issues = parsed.error.issues.map((e) => e.message).join(", ");
      throw new AppError(issues, 400);
    }

    const newToken = await tokenRepo.create(parsed.data);
    res.status(201).json({ message: "Reset token created", data: newToken });
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
    const { userId } = req.params;

    await tokenRepo.deleteByUserId(userId);
    res.status(200).json({ message: "All reset tokens deleted for user" });
  });
}
