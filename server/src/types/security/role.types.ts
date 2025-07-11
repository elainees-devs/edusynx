//src/types/security/role.types.ts
import { Types } from "mongoose";
import { UserRole } from "../enum/enum";
import { BaseDocument } from "../common/base.types";
import { IBaseUser } from "../people/user.types";
import { ISchool } from "../school/school-core.types";

export interface IRole extends BaseDocument {
  role: UserRole;
  permissions: string[]; // Array of permission identifiers
  createdBy: string; // User ID of the creator
  updatedBy: string; // User ID of the last updater
  isActive: boolean; // Indicates if the role is currently active
  school: Types.ObjectId | ISchool;
  isSystemRole?: boolean; // Indicates if this is a system-defined role
  customAttributes?: Record<string, any>; // For any additional custom attributes
  // e.g., { "color": "blue", "level": 1 }
}

export interface IUserRole extends BaseDocument {
  userId: Types.ObjectId | IBaseUser; 
  roleId: Types.ObjectId | IRole;
}
