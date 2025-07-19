// server/src/utils/getUserEmail.ts
import { UserModel } from "../models";
import { SuperAdminModel } from "../models/super-admin.model";

export async function getUserEmail(userId?: string, superAdminId?: string): Promise<string | null> {
  if (userId) {
    const user = await UserModel.findById(userId).select("email");
    return user?.email || null;
  }

  if (superAdminId) {
    const admin = await SuperAdminModel.findById(superAdminId).select("email");
    return admin?.email || null;
  }

  return null;
}
