// client/src/api/SubscriptionApi.ts

import apiClient from "./client";
import axios from "axios";
import type { CreateSubscriptionPayload, SubscriptionResponse } from "../types";

export const createSubscription = async (
  payload: CreateSubscriptionPayload
): Promise<SubscriptionResponse> => {
  try {
    const response = await apiClient.post<SubscriptionResponse>(
      "/subscriptions",
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

