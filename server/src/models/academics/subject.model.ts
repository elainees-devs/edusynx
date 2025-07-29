// server/src/models/subject.model.ts
import { Schema, Types, model } from "mongoose";
import { ISubject } from "../../types";

const SubjectSchema = new Schema<ISubject>(
  {
    school: { type: Types.ObjectId, ref: 'School', required: true },
    subjectName: { type: String, required: true },
    classRef: { type: Types.ObjectId, ref: 'Class', required: true },
  },
  {
    timestamps: true,
  }
);

// Indexes
SubjectSchema.index({subjectName: 1 });

export const SubjectModel = model<ISubject>('Subject', SubjectSchema);
