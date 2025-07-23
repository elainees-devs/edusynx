// server/src/models/stream.ts
import  { Schema, model, Types, Document } from "mongoose";
import { IStream } from "../types";


const StreamSchemaFields = new Schema<IStream>(
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
    {
    timestamps: true,
  }

);


export const StreamModel = model<IStream>('Stream', StreamSchemaFields);
