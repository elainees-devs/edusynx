// client/src/api/SubscriptionApi.ts

import axios from "axios";
import type { CreateSubscriptionPayload, SubscriptionResponse } from "../types";

// Base URL for all subscription-related API requests
const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000/api/v1";



/* ==============================
   Create a new subscription
================================ */
export const createSubscription = async (
  payload: CreateSubscriptionPayload
): Promise<SubscriptionResponse> => {
  try {
    const response = await axios.post<SubscriptionResponse>(
      `${API_BASE}/subscriptions`,
      payload
    );

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Axios error response:", error.response?.data);
      if (error.response?.data?.issues) {
        console.table(error.response.data.issues);
      }
      throw error.response?.data || { message: "A network error occurred" };
    }
    console.error("Unknown error occurred:", error);
    throw { message: "An unknown error occurred" };
  }
};

