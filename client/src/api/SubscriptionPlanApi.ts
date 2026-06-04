// client/src/api/SubscriptionPlanApi.ts
import apiClient from "./client";
import type { SubscriptionPlan } from "../types";

export const SubscriptionPlanApi = {
  getAll: async (): Promise<SubscriptionPlan[]> => {
    try {
      const response = await apiClient.get<SubscriptionPlan[]>(
        "/subscription-plans/all",
      );
      return response.data;
    } catch (error) {
      console.error("Failed to fetch subscription plans:", error);
      return [];
    }
  },
};
