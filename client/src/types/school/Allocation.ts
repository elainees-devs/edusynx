// client/src/types/school/Allocation.ts

import type { IBaseUser } from "../people/UserTypes";

export type Teacher = Pick<
  IBaseUser,
  | "firstName"
  | "middleName"
  | "lastName"
  | "primaryPhoneNumber"
  | "secondaryPhoneNumber"
  | "email"
> & {
  _id: string;
  isActive: boolean;
  employmentNo: string;
};

export type ClassAllocation = {
  id: number;
  className: string;
  stream: string;
  teacher: Teacher;
};
