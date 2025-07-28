// server/src/models/school-core/stream.ts
import  { Schema, model, Types} from "mongoose";
import { IStream } from "../../types";


const StreamSchemaFields = new Schema<IStream>(
  {
    school: {
      type: Types.ObjectId,
      ref: "School",
      required: true,
    },
    streamName: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },
      academicYear: {
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

// Add indexes
StreamSchemaFields.index({ school: 1 });
StreamSchemaFields.index({ streamName: 1 });
StreamSchemaFields.index({ academicYear: 1 });

// Optional: compound index for filtering by school and academic year
StreamSchemaFields.index({ school: 1, academicYear: 1 });

export const StreamModel = model<IStream>('Stream', StreamSchemaFields);


