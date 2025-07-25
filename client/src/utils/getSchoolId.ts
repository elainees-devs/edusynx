// client/src/utils/getSchoolId.ts
import { isPopulatedSchool } from "./type-guard";

type UserWithSchool = {
  role: string;
  school?: string | { _id: string; isActive: boolean };
} | undefined;

export function getSchoolId(user: UserWithSchool): string | null {
  if (!user || user.role === "super-admin") {
    return null;
  }

  const school = user.school;

  if (typeof school === "string") {
    return school;
  } else if (isPopulatedSchool(school)) {
    return school._id;
  }

  return null;
}
