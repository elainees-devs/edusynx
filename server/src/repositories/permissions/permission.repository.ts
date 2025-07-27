// server/src/repositories/permissions/permission.repository.ts

import { Types } from 'mongoose';
import { IPermission } from '../../types';
import { Permission } from '../../models';

export class PermissionRepository {
  async create(permissionData: Partial<IPermission>): Promise<IPermission> {
    const permission = new Permission(permissionData);
    return permission.save();
  }

  async findById(id: string): Promise<IPermission | null> {
    return Permission.findById(id).populate('school').exec();
  }

  async findAll(filter: Partial<IPermission> = {}): Promise<IPermission[]> {
    return Permission.find(filter).populate('school').exec();
  }

  async updateById(id: string, updateData: Partial<IPermission>): Promise<IPermission | null> {
    return Permission.findByIdAndUpdate(id, updateData, { new: true }).exec();
  }

  async deleteById(id: string): Promise<IPermission | null> {
    return Permission.findByIdAndDelete(id).exec();
  }

  async findByRole(role: string): Promise<IPermission[]> {
    return Permission.find({ roles: role }).exec();
  }

  async findBySchool(schoolId: Types.ObjectId): Promise<IPermission[]> {
    return Permission.find({ school: schoolId }).exec();
  }
}
