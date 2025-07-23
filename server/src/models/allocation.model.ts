// server/src/models/allocation.model.ts
import { Schema, model } from "mongoose";
import { ISchoolAllocation } from "../types";


// Nested schema: SubjectAllocation
const SubjectAllocationSchema = new Schema({
  subjectName: { type: String, required: true },
  teachers: [{ type: Schema.Types.ObjectId, ref: "Teacher", required: true }],
  headOfSubject: { type: Schema.Types.ObjectId, ref: "Teacher" }
}, { _id: false });

// Nested schema: ClassAllocation
const ClassAllocationSchema = new Schema({
  className: { type: String, required: true },
  classTeacher: { type: Schema.Types.ObjectId, ref: "Teacher" },
  subjects: { type: [SubjectAllocationSchema], required: true }
}, { _id: false });

// Main schema: SchoolAllocation
const SchoolAllocationSchema = new Schema({
  school: { type: Schema.Types.ObjectId, ref: "School", required: true },
  classes: { type: [ClassAllocationSchema], required: true },
  headsOfSubjects: {
    type: Map,
    of: { type: Schema.Types.ObjectId, ref: "Teacher" },
    required: true
  }
}, {
  timestamps: true 
});

export const SchoolAllocationModel = model<ISchoolAllocation>(
  "SchoolAllocation",
  SchoolAllocationSchema
);
