// server/src/utils/uploadStudentData.ts
import XLSX from "xlsx";
import { parse } from "csv-parse/sync"; // synchronous parsing from buffer
import { Types } from "mongoose";
import { StudentModel } from "../models";
import type { IStudent } from "../types";

// Parse Excel buffer
export const parseExcel = (buffer: Buffer): any[] => {
  const workbook = XLSX.read(buffer, { type: "buffer" });
  const sheetName = workbook.SheetNames[0];
  const sheet = workbook.Sheets[sheetName];
  return XLSX.utils.sheet_to_json(sheet);
};

// Parse CSV buffer
export const parseCSV = (buffer: Buffer): any[] => {
  const csvString = buffer.toString("utf-8");
  return parse(csvString, {
    columns: true,
    skip_empty_lines: true,
  });
};

// Convert raw rows to IStudent documents
export const mapRowsToStudents = (rows: any[]): Partial<IStudent>[] => {
  return rows.map((row) => ({
    school: row.school,
    studentFirstName: row.studentFirstName,
    studentMiddleName: row.studentMiddleName,
    studentLastName: row.studentLastName,
    studentGender: row.studentGender,
    dateOfBirth: new Date(row.dateOfBirth),
    adm: Number(row.adm),
    admissionDate: new Date(row.admissionDate),
    previousSchool: row.previousSchool,
    guardian: new Types.ObjectId(row.guardian),
    classId: new Types.ObjectId(row.classId),
    stream: new Types.ObjectId(row.stream),
    status: row.status,
    studentId: row.studentId,
    familyNumber: row.familyNumber ? Number(row.familyNumber) : undefined,
    studentPhotoUrl: row.studentPhotoUrl,
  }));
};

// Upload students from buffer (CSV or Excel)
export const uploadStudentsFromBuffer = async (
  buffer: Buffer,
  fileName: string
) => {
  const ext = fileName.split(".").pop()?.toLowerCase();
  let rows: any[] = [];

  if (ext === "csv") {
    rows = parseCSV(buffer);
  } else if (ext === "xlsx" || ext === "xls") {
    rows = parseExcel(buffer);
  } else {
    throw new Error("Unsupported file type");
  }

  const students = mapRowsToStudents(rows);
  return await StudentModel.insertMany(students);
};
