// server/src/models/school.model.ts
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
    logoUrl: { type: String },
    isActive: { type: Boolean, default: false },
    schoolCode: { type: String, required: true, unique: true },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    role: { type: String, required: true },
    accessUrl: { type: String, required: true, lowercase: true },
  },

  {
    timestamps: true,
  }
);

// Create the model
const SchoolModel = model<ISchool>("School", SchoolSchema);

export default SchoolModel;
