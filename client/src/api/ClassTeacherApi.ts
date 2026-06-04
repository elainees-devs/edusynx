// client/src/api/class.teacher.api.ts
import apiClient from './client';
import type { ClassTeacher} from '../types';

export const getAllClassTeachers = async (): Promise<ClassTeacher[]> => {
  const response = await apiClient.get("/class-overview/");

  const data = response.data;

  if (!Array.isArray(data)) {
    throw new Error("Expected an array of class teachers from the API.");
  }

  return data as ClassTeacher[];
};