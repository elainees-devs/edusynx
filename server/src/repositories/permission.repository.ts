//src/repositories/permission.repository.ts
import { Permission } from '../models/permission.model';
import { IPermission } from '../types/security/permission.types';
import { Types } from 'mongoose';

export class PermissionRepository {
  static async create(permissionData: Partial<IPermission>): Promise<IPermission> {
    const permission = new Permission(permissionData);
    return permission.save();
  }

  static async findById(id: string): Promise<IPermission | null> {
    return Permission.findById(id).populate('school').exec();
  }

  static async findAll(filter: Partial<IPermission> = {}): Promise<IPermission[]> {
    return Permission.find(filter).populate('school').exec();
  }

  static async updateById(id: string, updateData: Partial<IPermission>): Promise<IPermission | null> {
    return Permission.findByIdAndUpdate(id, updateData, { new: true }).exec();
  }

  static async deleteById(id: string): Promise<IPermission | null> {
    return Permission.findByIdAndDelete(id).exec();
  }

  static async findByRole(role: string): Promise<IPermission[]> {
    return Permission.find({ roles: role }).exec();
  }

  static async findBySchool(schoolId: Types.ObjectId): Promise<IPermission[]> {
    return Permission.find({ school: schoolId }).exec();
  }
}
