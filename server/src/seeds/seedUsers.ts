// client/src/seeds/seedUsers.ts
import bcrypt from "bcryptjs";
import { sampleUsers } from "./users.data";
import { UserModel } from "../models";

async function seedUsers() {
  try {
    const hashedPassword = await bcrypt.hash("Test@123", 10);

    const usersWithPasswords = sampleUsers.map(user => ({
      ...user,
      password: hashedPassword,
    }));

 console.log("Deleting all users...");
await UserModel.deleteMany({});

console.log("Seeding users...");
await UserModel.insertMany(usersWithPasswords);

console.log("Seeding complete.");


    console.log("Sample users seeded.");
  } catch (err) {
    console.error("Seeding error:", err);
  }
}

export default seedUsers;
