//src/types/security/role.types.ts
import { Types } from "mongoose";
import { UserRole } from "../enum/enum";
import { ISchool } from "../school/school.types";
import { BaseDocument } from "../common/base.types";

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
