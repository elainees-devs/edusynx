// server/src/models/security/session.model.ts
import { Schema, model} from "mongoose";
import { ISession } from "../../types";

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
