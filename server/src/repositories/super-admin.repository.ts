// server/src/repositories/super-admin.repository.ts
import { SuperAdminModel } from "../models/super-admin.model";
import { ISuperAdmin } from "../types";

export class SuperAdminRepository {
  // Create ONLY if no super admin exists
  async create(adminData: Partial<ISuperAdmin>): Promise<ISuperAdmin> {
    const existing = await SuperAdminModel.findOne({});
    if (existing) {
      throw new Error("Only one Super Admin is allowed in the system");
    }
    return await SuperAdminModel.create(adminData);
  }

  async findByEmail(email: string): Promise<ISuperAdmin | null> {
    return await SuperAdminModel.findOne({ email });
  }


  // Get the single super admin (find all, realistically returns one or none)
  async findAll(): Promise<ISuperAdmin[]> {
    return await SuperAdminModel.find({});
  }

  async update(id: string, update: Partial<ISuperAdmin>): Promise<ISuperAdmin | null> {
    return await SuperAdminModel.findByIdAndUpdate(id, update, { new: true });
  }

  async deleteById(id: string): Promise<ISuperAdmin | null> {
    return await SuperAdminModel.findByIdAndDelete(id);
  }
}