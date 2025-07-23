// server/src/validation/allocation.schema.ts
import { z } from "zod";

// validate ObjectId as 24 hex characters
const objectId = z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid ObjectId");

export const SubjectAllocationSchema = z.object({
  subjectName: z.string(),
  teachers: z.array(objectId).min(1, "At least one teacher must be assigned"),
  headOfSubject: objectId.optional(),
});

export const ClassAllocationSchema = z.object({
  className: z.string(),
  classTeacher: objectId.optional(),
  subjects: z.array(SubjectAllocationSchema).min(1, "Each class must have subjects"),
});

export const SchoolAllocationSchemaBase = z.object({
  school: objectId,
  classes: z.array(ClassAllocationSchema).min(1, "Must have at least one class"),
  headsOfSubjects: z.record(objectId),  // e.g., { Mathematics: teacherId }
});

export const SchoolAllocationSchema = SchoolAllocationSchemaBase.refine(
  (allocation) =>
    allocation.classes.every((cls) =>
      !cls.classTeacher || cls.subjects.some((subject) =>
        subject.teachers.includes(cls.classTeacher!)
      )
    ),
  {
    message: "Each class teacher must teach at least one subject in their class.",
    path: ["classes"], // optional: tells where error applies
  }
);


// Optionally export the inferred type for type safety
export type SchoolAllocationInput = z.infer<typeof SchoolAllocationSchema>;
