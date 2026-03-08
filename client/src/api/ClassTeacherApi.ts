// client/src/api/class.teacher.api.ts
import axios from 'axios';
import type { ClassTeacher} from '../types';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000/api/v1';

export const getAllClassTeachers = async (): Promise<ClassTeacher[]> => {
  const response = await axios.get(`${API_BASE}/class-overview/`);

  const data = response.data;
  console.log("Fetched class teachers:", data);

  if (!Array.isArray(data)) {
    throw new Error("Expected an array of class teachers from the API.");
  }

  return data as ClassTeacher[];
};