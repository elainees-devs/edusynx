// server/src/models/passwordResetToken.model.ts
import mongoose, { Schema, Types } from "mongoose";
import { IPasswordResetToken } from "../types";

const PasswordResetTokenSchema: Schema = new Schema(
  {
    email:{
      type: String,
    },
    userId: {
      type: Types.ObjectId,
      ref: "User",
    },
    superAdminId:{
      type: Types.ObjectId,
      ref: "SuperAdmin",
    },
    token: {
      type: String,
      required: true,
      unique: true,
    },
    expiresAt: {
      type: Date,
      required: true,
    },
    used: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export const PasswordResetToken = mongoose.model<IPasswordResetToken>(
  "PasswordResetToken",
  PasswordResetTokenSchema
);
