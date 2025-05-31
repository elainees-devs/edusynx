//src/types/security/permission.types.ts
import { Types } from "mongoose";
import { UserRole } from "../enum/enum";
import { BaseDocument } from "../common/base.types";
import { IRole } from "./role.types";
import { ISchool } from "../school/school-core.types";

export interface IPermission extends BaseDocument {
  permissionName: string; // Name of the permission
  permissionDescription?: string; // Optional description of the permission
  isActive: boolean; // Indicates if the permission is currently active
  school: Types.ObjectId | ISchool; // Reference to the school this permission belongs to
  roles?: UserRole[]; // Optional array of roles that this permission applies to
}

export interface IRolePermission extends BaseDocument {
  school: Types.ObjectId | ISchool;
  roleId: Types.ObjectId | IRole; // Reference to the role this permission is associated with
  permissionId: Types.ObjectId | IPermission; // Reference to the permission being granted
}
