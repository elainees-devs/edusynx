// server/src/models/subscriptionPlan.model.ts
import { Schema, model, Types } from "mongoose";
import { ISubscriptionPlan } from "../../types";
import { FEATURE_KEYS } from "../../constants";


const SubscriptionPlanSchema = new Schema<ISubscriptionPlan>(
  {
    name: { type: String, required: true, unique: true },
    price: { type: Number, required: true },
    durationInMonths: { type: Number, required: true },
    features: [{ 
  type: String, 
  enum: Object.values(FEATURE_KEYS), 
  required: true 
}],
  },
  {
    timestamps: true, 
  }
);

export const SubscriptionPlanModel = model<ISubscriptionPlan>(
  "SubscriptionPlan",
  SubscriptionPlanSchema
);
