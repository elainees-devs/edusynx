import mongoose from "mongoose";
import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.resolve(__dirname, "../../.env") });

const MONGO_URI = process.env.MONGO_URI as string;

async function backfillEnrollments() {
  await mongoose.connect(MONGO_URI);
  console.log("Connected to DB");

  const db = mongoose.connection.db;
  if (!db) throw new Error("No database connection");

  const students = await db.collection("students").find({}).toArray();
  console.log(`Found ${students.length} students`);

  // Find the active academic year for each school, or use any academic year
  const academicYears = await db.collection("academicyears").find({}).toArray();
  const schoolYearMap = new Map<string, any>();
  for (const year of academicYears) {
    const schoolId = year.school.toString();
    // Prefer active year, fall back to any year
    if (!schoolYearMap.has(schoolId) || year.isActive) {
      schoolYearMap.set(schoolId, year);
    }
  }

  let created = 0;
  let skipped = 0;

  for (const student of students) {
    const existing = await db.collection("enrollments").findOne({
      student: student._id,
    });

    if (existing) {
      skipped++;
      continue;
    }

    const schoolId = student.school;
    const academicYear = schoolYearMap.get(schoolId?.toString() ?? "");
    if (!academicYear) {
      console.log(`  Skipping student ${student._id}: no academic year found for school ${schoolId}`);
      skipped++;
      continue;
    }

    await db.collection("enrollments").insertOne({
      school: student.school,
      student: student._id,
      clas: student.classId,
      stream: student.stream,
      academicYear: academicYear._id,
      enrollmentDate: student.admissionDate || new Date(),
      status: student.status === "graduated" ? "graduated" : student.status === "transferred" ? "transferred" : "active",
      enrollmentType: "new",
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    created++;
  }

  console.log(`Created ${created} enrollment records, skipped ${skipped} existing`);
  await mongoose.disconnect();
  console.log("Backfill complete");
}

backfillEnrollments().catch((err) => {
  console.error("Backfill failed:", err);
  process.exit(1);
});
