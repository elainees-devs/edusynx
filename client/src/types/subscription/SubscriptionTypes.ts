// client/src/types/subscription/SubscriptionTypes.ts

export interface SubscriptionPlan {
  _id: string;
  name: string;
  price: number;
  durationInMonths: number;
  features: string[];
}

export interface CreateSubscriptionPayload {
school: string; // school ID
planId: string;
duration: number; // in months
 }


// Optional: response type
export interface SubscriptionResponse {
  _id: string;
  school: string;
  planId: string;
  durationInMonths: number;
  startDate: string;
  endDate: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

