import mongoose from "mongoose";
import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.resolve(__dirname, "../../.env") });

const MONGO_URI = process.env.MONGO_URI as string;

async function migrateGuardianStudents() {
  await mongoose.connect(MONGO_URI);
  console.log("Connected to DB");

  const db = mongoose.connection.db;
  if (!db) throw new Error("No database connection");

  // Step 1: Migrate GuardianModel — convert student (single ObjectId) to students (array)
  const guardianResult = await db.collection("guardianusers").updateMany(
    { students: { $exists: false } },
    [{ $set: { students: { $ifNull: ["$student", []] } } }, { $unset: "student" }]
  );
  console.log(`Guardian migration: ${JSON.stringify(guardianResult)}`);

  // Step 2: Migrate StudentModel — convert guardian (single ObjectId) to guardians (array)
  const studentResult = await db.collection("students").updateMany(
    { guardians: { $exists: false } },
    [{ $set: { guardians: { $cond: { if: "$guardian", then: ["$guardian"], else: [] } } } }, { $unset: "guardian" }]
  );
  console.log(`Student migration: ${JSON.stringify(studentResult)}`);

  // Step 3: Verify by checking counts
  const guardiansWithStudent = await db.collection("guardianusers").countDocuments({ students: { $exists: true } });
  const studentsWithGuardians = await db.collection("students").countDocuments({ guardians: { $exists: true } });
  console.log(`Guardians with students[]: ${guardiansWithStudent}`);
  console.log(`Students with guardians[]: ${studentsWithGuardians}`);

  await mongoose.disconnect();
  console.log("Migration complete");
}

migrateGuardianStudents().catch((err) => {
  console.error("Migration failed:", err);
  process.exit(1);
});
