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
StreamSchemaFields.index({ streamName: 1 });


export const StreamModel = model<IStream>('Stream', StreamSchemaFields);


