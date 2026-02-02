// server/src/dto/subscription.dto.ts
import { ISubscription, ISubscriptionPlan } from "../types";

export type {
  ISubscription,
  ISubscriptionPlan,
} from "../types/subscription/subscription.types";
export type CreateSubscriptionDTO = Omit<
  ISubscription,
  "id" | "createdAt" | "updatedAt"
>;
export type CreateSubscriptionPlanDTO = Omit<
  ISubscriptionPlan,
  "id" | "createdAt" | "updatedAt"
>;
