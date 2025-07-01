// server/src/seeds/users.data.ts
import { UserRole } from "../types";

// Simulated single school ID

export const sampleUsers = [
  {
    school: "685ada1a962d3d91036d277f",
    firstName: "Alice",
    middleName: "Wanjiku",
    lastName: "Kamau",
    email: "alice.kamau@gmail.com",
    primaryPhoneNumber: "+254701111111",
    password: "", // will be hashed in seedUsers.ts
    nationality: "Kenyan",
    isActive: true,
    isLocked: false,
    isTwoFactorEnabled: false,
    role: UserRole.SCHOOL_ADMIN,
  },
  {
    school: "685ada1a962d3d91036d277f",
    firstName: "Brian",
    middleName: "Otieno",
    lastName: "Okoth",
    email: "brian.okoth@yahoo.com",
    primaryPhoneNumber: "+254702222222",
    password: "",
    nationality: "Kenyan",
    isActive: true,
    isLocked: false,
    isTwoFactorEnabled: true,
    role: UserRole.SCHOOL_ADMIN,
  },
  {
    school: "685ada1a962d3d91036d277f",
    firstName: "Caroline",
    middleName: "Njeri",
    lastName: "Mwangi",
    email: "caroline.mwangi@gmail.com",
    primaryPhoneNumber: "+254703333333",
    password: "",
    nationality: "Kenyan",
    isActive: true,
    isLocked: false,
    isTwoFactorEnabled: true,
    role: UserRole.TEACHER,
  },
  {
    school: "685ada1a962d3d91036d277f",
    firstName: "David",
    middleName: "Kiptoo",
    lastName: "Chebet",
    email: "david.chebet@yahoo.com",
    primaryPhoneNumber: "+254704444444",
    password: "",
    nationality: "Kenyan",
    isActive: true,
    isLocked: false,
    isTwoFactorEnabled: false,
    role: UserRole.ACCOUNTANT,
  },
];
