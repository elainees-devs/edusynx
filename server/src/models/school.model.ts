//src/models/school.models.ts
import { model, Schema, Types } from "mongoose";
import { ISchool } from "../types/school/school-core.types";

// Create the Mongoose Schema
const SchoolSchema: Schema = new Schema<ISchool>(
  {
    name: { type: String, required: true },
    address: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    email: { type: String, required: true },
    website: { type: String },
    establishedYear: { type: Number, required: true },
    logoUrl: { type: String, required: true },
    isActive: { type: Boolean, default: true },
    schoolCode: { type: String, required: true, unique: true },
  },
  {
    timestamps: true, // adds createdAt and updatedAt fields
  }
);

// Create the model
const SchoolModel = model<ISchool>('School', SchoolSchema);

export default SchoolModel;