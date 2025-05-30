// src/types/users/user.ts
import { Types } from "mongoose";
import { ISchool, ISubject } from "../school/school";

export interface IBaseUser {
  _id: Types.ObjectId;
  school: Types.ObjectId | ISchool;
  first_name: string;
  middle_name: string;
  last_name: string;
  primary_email: string;
  secondary_email?: string;
  primary_phone_number: string;
  secondary_phone_number?: string;
  hashed_password: string;
  nationality: string;
  avatar_url?: string;
  isActive: boolean;
  last_login?: Date;
  is_locked: boolean;
  password_changed_at?: Date;
  is_two_factor_enabled: boolean;
  role: "headteacher" | "teacher" | "admin" | "guardian" | "accountant";
  createdAt: Date;
  updatedAt: Date;
}

export interface ITeacherUser extends IBaseUser {
  role: "teacher";
  teacher_id?: string;
  isClassTeacher?: boolean;
  subject_name?: string | ISubject;
  teachingSubjects?: string[];
}

export interface IGuardianUser extends IBaseUser {
  role: "guardian";
  familyNumber: number;
}


