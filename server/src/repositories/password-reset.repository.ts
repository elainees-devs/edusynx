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

  // Delete all tokens by email 
  async deleteByEmail(email: string) {
    return await PasswordResetToken.deleteMany({ email });
  }

  // Optional: delete by userId or superAdminId fallback (if both stored)
  async deleteByOwnerId(userId?: string, superAdminId?: string) {
    const filter: any = {};
    if (userId) filter.userId = userId;
    if (superAdminId) filter.superAdminId = superAdminId;
    return await PasswordResetToken.deleteMany(filter);
  }
}
