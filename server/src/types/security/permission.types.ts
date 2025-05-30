//src/types/security/permission.ts
import { Types } from "mongoose";
import { ISchool } from "../school/school.types";
import { UserRole } from "../enum/enum";
import { BaseDocument } from "../common/base.types";

export interface IPermission extends BaseDocument {
  permissionName: string; // Name of the permission
  permissionDescription?: string; // Optional description of the permission
  isActive: boolean; // Indicates if the permission is currently active
  school: Types.ObjectId | ISchool; // Reference to the school this permission belongs to
  roles?: UserRole[]; // Optional array of roles that this permission applies to
}