// server/src/models/security/login.model.ts
import mongoose, { Schema, Types } from "mongoose";
import { ILogin } from "../../types";

const LoginSchema: Schema = new Schema(
  {
    userId: {
      type: Types.ObjectId,
      ref: "User",
    },
    sessionId: {
      type: String,
      ref: "Session", // If sessionId is string ID for session model
    },
    isSuccessful: {
      type: Boolean,
      required: true,
    },
    failureReason: {
      type: String,
    },
  },
  { timestamps: true }
);

export const Login = mongoose.model<ILogin>("Login", LoginSchema);
