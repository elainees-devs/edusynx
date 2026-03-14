// client/src/api/SubscriptionPlanApi.ts
import axios from "axios";
import type { SubscriptionPlan } from "../types";

const API_BASE_URL = "http://localhost:5000/api/v1";

export const SubscriptionPlanApi = {
  getAll: async (): Promise<SubscriptionPlan[]> => {
    try {
      const response = await axios.get<SubscriptionPlan[]>(
        `${API_BASE_URL}/subscription-plans/all`,
      );
      return response.data;
    } catch (error) {
      console.error("Failed to fetch subscription plans:", error);
      return [];
    }
  },
};
