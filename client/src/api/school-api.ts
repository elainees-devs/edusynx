// client/src/api/school-api.ts
import axios, { AxiosError } from 'axios';
import type { ISchool } from '../types';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000/api/v1';

export const registerSchool = async (data: ISchool) => {
  console.log("Sending school data:", data); // Log the request payload

  try {
    const response = await axios.post(`${API_BASE}/school/register`, data);
    console.log("Server response:", response.data); // Log the successful response
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Axios error response:", error.response?.data);

      // Log validation issues specifically
      if (error.response?.data?.issues) {
        console.table(error.response.data.issues);
      }

      throw error.response?.data || { message: 'A network error occurred' };
    }

    // Fallback for non-Axios errors
    console.error("Unknown error occurred:", error);
    throw { message: 'An unknown error occurred' };
  }
};

export const fetchSchools = async (): Promise<ISchool[]> => {
  try {
    const response = await axios.get(`${API_BASE}/school`);
    return response.data; 
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Axios error fetching schools:", error.response?.data);
      throw error.response?.data || { message: 'A network error occurred' };
    }

    console.error("Unknown error fetching schools:", error);
    throw { message: 'An unknown error occurred' };
  }
};

export const updateSchool = async (id: string, updatedData: Partial<ISchool>): Promise<ISchool> => {
  try {
    const response = await axios.put(`${API_BASE}/school/${id}`, updatedData);
    return response.data;
  } catch (error) {
    console.error("Failed to update school:", error);
    throw error;
  }
};

export const deleteSchool = async (id: string): Promise<ISchool> => {
  try {
    const response = await axios.delete(`${API_BASE}/school/${id}`);
    return response.data;
  } catch (error) {
    console.error("Failed to delete school:", error);
    throw error;
  }
};

