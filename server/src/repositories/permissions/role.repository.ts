// server/src/repositories/permissions/role.repository.ts
import { Role } from '../../models';
import { Types } from 'mongoose';
import { IRole } from '../../types';

export class RoleRepository {
  async create(roleData: Partial<IRole>): Promise<IRole> {
    const role = new Role(roleData);
    return role.save();
  }

  async findById(id: string): Promise<IRole | null> {
    return Role.findById(id).populate('school').exec();
  }

  async findAll(filter: Partial<IRole> = {}): Promise<IRole[]> {
    return Role.find(filter).populate('school').exec();
  }

  async updateById(id: string, updateData: Partial<IRole>): Promise<IRole | null> {
    return Role.findByIdAndUpdate(id, updateData, { new: true }).exec();
  }

  async deleteById(id: string): Promise<IRole | null> {
    return Role.findByIdAndDelete(id).exec();
  }

  async findByRole(roleName: string): Promise<IRole[]> {
    return Role.find({ role: roleName }).exec();
  }

  async findBySchool(schoolId: Types.ObjectId): Promise<IRole[]> {
    return Role.find({ school: schoolId }).exec();
  }
}

