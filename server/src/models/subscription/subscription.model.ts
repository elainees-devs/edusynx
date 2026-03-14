// server/src/models/subscription/subscription.model.ts
import { Schema, model, Types } from "mongoose";
import { ISubscription } from "../../types";
import { duration } from "moment-timezone";

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
    },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    isActive: { type: Boolean, required: true, default: true },
    duration: { type: Number, required: true },
  },

  {
    timestamps: true,
  },
);

export const SubscriptionModel = model<ISubscription>(
  "Subscription",
  SubscriptionSchema,
);
