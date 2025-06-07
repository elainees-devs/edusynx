// src/models/loginHistory.model.ts
import { Schema, model, Types } from "mongoose";
import { ILogin } from "../types/security/login.types";

const LoginHistorySchema = new Schema<ILogin>({
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  sessionId: { type: Schema.Types.ObjectId, ref: "Session" },
  isSuccessful: { type: Boolean, required: true },
  failureReason: { type: String },

  // from ILoginBase
  loginTime: { type: Date, required: true },
  ipAddress: { type: String },
  deviceInfo: { type: String },
}, { timestamps: true });

export const LoginHistoryModel = model<ILogin>("LoginHistory", LoginHistorySchema);
