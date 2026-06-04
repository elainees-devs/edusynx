import mongoose from "mongoose";
import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.resolve(__dirname, "../../.env") });

async function migrateExistingStaff() {
  const mongoUri = process.env.MONGO_URI || process.env.MONGODB_URI;
  if (!mongoUri) {
    console.error("MONGO_URI not set");
    process.exit(1);
  }

  await mongoose.connect(mongoUri);
  console.log("Connected to MongoDB");

  const db = mongoose.connection.db!;

  // Find existing school-specific counter or reuse InvoiceCounter collection
  // We use a simple approach: read from UserModel and TeacherModel

  const users = await db.collection("users").find({
    role: { $in: ["principal", "accountant", "school-admin"] },
  }).toArray();

  const teachers = await db.collection("teachers").find({}).toArray();

  console.log(`Found ${users.length} staff users and ${teachers.length} teachers to migrate`);

  const staffCollection = db.collection("staff");
  let migrated = 0;
  let skipped = 0;

  for (const user of users) {
    const exists = await staffCollection.findOne({ email: user.email });
    if (exists) {
      skipped++;
      continue;
    }

    const schoolId = user.school?.toString();
    const counter = await db.collection("invoicecounters").findOneAndUpdate(
      { school: user.school },
      { $inc: { seq: 1 } },
      { upsert: true, returnDocument: "after" }
    );

    const year = new Date().getFullYear();
    const schoolCode = schoolId ? schoolId.slice(-4).toUpperCase() : "XXXX";
    const seq = counter?.seq || 1;
    const employeeNumber = `EMP-${year}-${schoolCode}-${String(seq).padStart(4, "0")}`;

    await staffCollection.insertOne({
      school: user.school,
      firstName: user.firstName,
      middleName: user.middleName || "",
      lastName: user.lastName,
      email: user.email,
      secondaryEmail: user.secondaryEmail,
      primaryPhoneNumber: user.primaryPhoneNumber,
      secondaryPhoneNumber: user.secondaryPhoneNumber,
      password: user.password,
      nationality: user.nationality,
      avatarUrl: user.avatarUrl,
      isActive: user.isActive ?? true,
      lastLogin: user.lastLogin,
      isLocked: user.isLocked ?? false,
      passwordChangedAt: user.passwordChangedAt,
      isTwoFactorEnabled: user.isTwoFactorEnabled ?? false,
      role: user.role,
      employeeNumber,
      isHeadOfDepartment: false,
      isClassTeacher: false,
      createdAt: user.createdAt || new Date(),
      updatedAt: user.updatedAt || new Date(),
    });
    migrated++;
  }

  for (const teacher of teachers) {
    const exists = await staffCollection.findOne({ email: teacher.email });
    if (exists) {
      skipped++;
      continue;
    }

    const schoolId = teacher.school?.toString();
    const counter = await db.collection("invoicecounters").findOneAndUpdate(
      { school: teacher.school },
      { $inc: { seq: 1 } },
      { upsert: true, returnDocument: "after" }
    );

    const year = new Date().getFullYear();
    const schoolCode = schoolId ? schoolId.slice(-4).toUpperCase() : "XXXX";
    const seq = counter?.seq || 1;
    const employeeNumber = `EMP-${year}-${schoolCode}-${String(seq).padStart(4, "0")}`;

    await staffCollection.insertOne({
      school: teacher.school,
      firstName: teacher.firstName,
      middleName: teacher.middleName || "",
      lastName: teacher.lastName,
      email: teacher.email,
      secondaryEmail: teacher.secondaryEmail,
      primaryPhoneNumber: teacher.primaryPhoneNumber,
      secondaryPhoneNumber: teacher.secondaryPhoneNumber,
      password: teacher.password,
      nationality: teacher.nationality,
      avatarUrl: teacher.avatarUrl,
      isActive: teacher.isActive ?? true,
      lastLogin: teacher.lastLogin,
      isLocked: teacher.isLocked ?? false,
      passwordChangedAt: teacher.passwordChangedAt,
      isTwoFactorEnabled: teacher.isTwoFactorEnabled ?? false,
      role: "teacher",
      employeeNumber,
      department: teacher.department,
      isHeadOfDepartment: teacher.isHeadOfDepartment ?? false,
      isClassTeacher: teacher.isClassTeacher ?? false,
      assignedClass: teacher.assignedClass,
      createdAt: teacher.createdAt || new Date(),
      updatedAt: teacher.updatedAt || new Date(),
    });
    migrated++;
  }

  console.log(`Migration complete: ${migrated} migrated, ${skipped} skipped (already exist)`);
  await mongoose.disconnect();
}

migrateExistingStaff().catch((err) => {
  console.error("Migration failed:", err);
  process.exit(1);
});
