// src/repositories/rolePermission.repository.ts
import { RolePermissionModel } from '../models/rolePermission.model';
import { IRolePermission } from '../types/security/permission.types';
import { Types } from 'mongoose';

export class RolePermissionRepository {
  async create(data: Partial<IRolePermission>): Promise<IRolePermission> {
    const rolePermission = new RolePermissionModel(data);
    return rolePermission.save();
  }

  async findById(id: string): Promise<IRolePermission | null> {
    return RolePermissionModel.findById(id)
      .populate('school')
      .populate('roleId')
      .populate('permissionId')
      .exec();
  }

  async findAll(filter: Partial<IRolePermission> = {}): Promise<IRolePermission[]> {
    return RolePermissionModel.find(filter)
      .populate('school')
      .populate('roleId')
      .populate('permissionId')
      .exec();
  }

  async updateById(id: string, updateData: Partial<IRolePermission>): Promise<IRolePermission | null> {
    return RolePermissionModel.findByIdAndUpdate(id, updateData, { new: true }).exec();
  }

  async deleteById(id: string): Promise<IRolePermission | null> {
    return RolePermissionModel.findByIdAndDelete(id).exec();
  }

  async findByRoleId(roleId: Types.ObjectId): Promise<IRolePermission[]> {
    return RolePermissionModel.find({ roleId }).exec();
  }

  async findByPermissionId(permissionId: Types.ObjectId): Promise<IRolePermission[]> {
    return RolePermissionModel.find({ permissionId }).exec();
  }

  async findBySchool(schoolId: Types.ObjectId): Promise<IRolePermission[]> {
    return RolePermissionModel.find({ school: schoolId }).exec();
  }
}
