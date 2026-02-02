// server/src/models/subscriptionPlan.model.ts
import { Schema, model, Types } from "mongoose";
import { ISubscriptionPlan } from "../../types";


const SubscriptionPlanSchema = new Schema<ISubscriptionPlan>(
  {
    name: { type: String, required: true, unique: true },
    price: { type: Number, required: true },
    durationInMonths: { type: Number, required: true },
    features: [{ type: String, required: true }], // e.g., ["view-students", "send-messages"]
  },
  {
    timestamps: true, 
  }
);

export const SubscriptionPlanModel = model<ISubscriptionPlan>(
  "SubscriptionPlan",
  SubscriptionPlanSchema
);
