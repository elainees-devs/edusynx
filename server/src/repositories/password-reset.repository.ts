// server/src/repositories/password-reset.repository.ts
import { PasswordResetToken } from "../models";
import { IPasswordResetToken } from "../types";

export class PasswordResetTokenRepository {
  async create(data: Partial<IPasswordResetToken>) {
    return await PasswordResetToken.create(data);
  }

  async findByToken(token: string) {
    return await PasswordResetToken.findOne({ token });
  }

  async findValidToken(token: string) {
    return await PasswordResetToken.findOne({
      token,
      used: false,
      expiresAt: { $gt: new Date() },
    });
  }

  async markAsUsed(token: string) {
    return await PasswordResetToken.findOneAndUpdate(
      { token },
      { used: true },
      { new: true }
    );
  }

  async deleteByUserId(userId: string) {
    return await PasswordResetToken.deleteMany({ userId });
  }
}
