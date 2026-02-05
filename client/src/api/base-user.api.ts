// client/src/api/base-user.api.ts
import axios from "axios";
import type { GetPageParams, IBaseUser, PaginatedTeachers } from "../types";
import type { Teacher } from "../types/school/allocation";

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000/api/v1";

export const registerUser = async (data: IBaseUser) => {
  try {
    const response = await axios.post(`${API_BASE}/users`, data);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Axios error response:", error.response?.data);

      // Log validation issues specifically
      if (error.response?.data?.issues) {
        console.table(error.response.data.issues);
      }

      throw error.response?.data || { message: "A network error occurred" };
    }

    // Fallback for non-Axios errors
    console.error("Unknown error occurred:", error);
    throw { message: "An unknown error occurred" };
  }
};

// ================================
// GET USER BY ID
// ================================
export const getUserById = async (id: string) => {
  const res = await axios.get(`${API_BASE}/users/${id}`);
  return res.data;
};

// ================================
// GET ALL USERS
// ================================
export const getUsers = async () => {
  const res = await axios.get(`${API_BASE}/users`);
  return res.data;
};

// ================================
// GET ALL TEACHERS (no pagination)
// ================================
export const getAllTeachers = async (): Promise<Teacher[]> => {
  const res = await axios.get(`${API_BASE}/users/teachers`);
  return res.data;
};

// ================================
// GET ALL TEACHERS (paginated)
// ================================

export const getTeachers = async (
  params: GetPageParams,
): Promise<PaginatedTeachers> => {
  const res = await axios.get(`${API_BASE}/users/teachers`, { params });

  // Map directly to Teacher type (no _id -> id conversion)
  const teachers: Teacher[] = (res.data.data as Teacher[]).map((t) => ({
    _id: t._id,
    employmentNo: t.employmentNo ?? "",
    firstName: t.firstName ?? "",
    middleName: t.middleName ?? "",
    lastName: t.lastName ?? "",
    primaryPhoneNumber: t.primaryPhoneNumber ?? "",
    secondaryPhoneNumber: t.secondaryPhoneNumber ?? "",
    email: t.email ?? "",
    isActive: t.isActive ?? false,
  }));

  return {
    data: teachers,
    page: res.data.page,
    limit: res.data.limit,
    totalPages: res.data.totalPages,
    total: res.data.total,
  };
};

// ================================
// UPDATE USER
// ================================
export const updateUser = async (id: string, data: Partial<IBaseUser>) => {
  const res = await axios.patch(`/users/${id}`, data);
  return res.data;
};

// ================================
// COUNT TEACHERS
// ================================

export const countTeachers = async () => {
  try {
    const response = await axios.get(`${API_BASE}/users/teachers/count`);
    return response.data; // { count: number }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Axios error response:", error.response?.data);
      throw error.response?.data || { message: "A network error occurred" };
    }

    console.error("Unknown error occurred:", error);
    throw { message: "An unknown error occurred" };
  }
};

// ================================
// DELETE USER
// ================================
export const deleteUser = async (id: string) => {
  const res = await axios.delete(`/users/${id}`);
  return res.data;
};

// ================================
// DELETE ALL USERS
// ================================
export const deleteAllUsers = async () => {
  const res = await axios.delete(`/users`);
  return res.data;
};
