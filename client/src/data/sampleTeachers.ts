// client/src/data/sampleTeachers.ts
import type { ITeacherPersonalDetails } from "../types";

export const sampleTeachers: ITeacherPersonalDetails[] = [
  {
    id: "1",
    firstName: "Grace",
    middleName: "Wanjiru",
    lastName: "Mwangi",
    email: "grace.mwangi@example.com",
    primaryPhoneNumber: "+254712345678",
    secondaryPhoneNumber: "+254798765432",
    isActive: true,
  },
  {
    id: "2",
    firstName: "Elijah",
    middleName: "Kipkemboi",
    lastName: "Koech",
    email: "elijah.koech@example.com",
    primaryPhoneNumber: "+254700123456",
    isActive: false,
  },
  {
    id: "3",
    firstName: "Amina",
    middleName: "Ali",
    lastName: "Mohamed",
    email: "amina.mohamed@example.com",
    primaryPhoneNumber: "+254711223344",
    secondaryPhoneNumber: "+254799887766",
    isActive: true,
  },
  {
    id: "4",
    firstName: "Brian",
    middleName: "Otieno",
    lastName: "Ouma",
    email: "brian.ouma@example.com",
    primaryPhoneNumber: "+254733445566",
    isActive: false,
  },
];
