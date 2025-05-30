//src/types/security/role.ts
import { Types } from "mongoose";
import { UserRole } from "../enum/enum";
import { ISchool } from "../school/school";

export interface IRole {
  _id: string;
  role: UserRole;
  permissions: string[]; // Array of permission identifiers
  createdAt: Date;
  updatedAt: Date;
  createdBy: string; // User ID of the creator
  updatedBy: string; // User ID of the last updater
  isActive: boolean; // Indicates if the role is currently active
  school: Types.ObjectId | ISchool;
  isSystemRole?: boolean; // Indicates if this is a system-defined role
  // Additional fields can be added as needed
  // e.g., for auditing or custom attributes
  customAttributes?: Record<string, any>; // For any additional custom attributes
  // e.g., { "color": "blue", "level": 1 }
}
