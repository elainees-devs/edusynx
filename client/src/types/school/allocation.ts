// client/src/types/school/allocation.ts
import type { IBaseUser } from "../people/user.types";


export type Teacher = Pick<
  IBaseUser,
  "firstName"|"middleName"| "lastName"|"primaryPhoneNumber" | "secondaryPhoneNumber" | "email"
> & {
  id: string
  isActive: boolean
  employmentNo: string
};


export type ClassAllocation = {
  id: number
  className: string
  stream: string
  teacher: Teacher
};


