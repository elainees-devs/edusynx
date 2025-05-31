//src/models/session.model.ts
import { Schema, model, Document } from "mongoose";
import { ISession } from "../types/security/session.types";

const SessionSchema = new Schema<ISession>(
  {
    userId: { type: String, required: true },
    logoutTime: { type: Date },
    lastAccessedAt: { type: Date },
    expiryTime: { type: Number, required: true },
    permissions: [{ type: String }],
    roles: [{ type: String }],
  },
  { timestamps: true }
);

export const SessionModel = model<ISession>("Session", SessionSchema);
