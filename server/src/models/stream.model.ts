// server/src/models/stream.ts
import mongoose, { Schema, model, Types, Document } from "mongoose";
import { ISchool } from "../types";

interface IStream extends Document {
  school: Types.ObjectId | ISchool;
  stream: string;
}

const streamSchema = new Schema<IStream>(
  {
    school: {
      type: Types.ObjectId,
      ref: "School",
      required: true,
    },
    stream: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },
  },
  { timestamps: true }
);

const StreamModel = model<IStream>("Stream", streamSchema);
export default StreamModel;
