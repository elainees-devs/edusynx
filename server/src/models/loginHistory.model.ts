// src/models/loginHistory.model.ts
import { Schema, model, Types } from "mongoose";
import { ILoginBase } from "../types/common/auth-context.types";

const LoginHistorySchema = new Schema<ILoginBase & { userId: Types.ObjectId }>({
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  loginTime: { type: Date, required: true },
  ipAddress: { type: String },
  deviceInfo: { type: String },
}, { timestamps: true });

export const LoginHistoryModel = model("LoginHistory", LoginHistorySchema);
