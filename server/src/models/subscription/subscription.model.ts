// server/src/models/subscription/subscription.model.ts
import { Schema, model, Types } from "mongoose";
import { ISubscription } from "../../types";

const SubscriptionSchema = new Schema<ISubscription>(
  {
    school: {
      type: Types.ObjectId,
      ref: "School",
      required: true,
      unique: true,
    },
    planId: {
      type: Types.ObjectId,
      ref: "SubscriptionPlan",
      required: true,
      unique: true,
    },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    isActive: { type: Boolean, required: true, default: true },
  },
  {
    timestamps: true, 
  },
);

export const SubscriptionModel = model<ISubscription>(
  "Subscription",
  SubscriptionSchema,
);
