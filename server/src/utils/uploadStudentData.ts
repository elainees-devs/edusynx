// server/src/utils/uploadStudentData.ts
import crypto from "crypto"; // <-- needed for UUID
import XLSX from "xlsx";
import { parse } from "csv-parse/sync";
import { StudentModel, ClassModel, StreamModel } from "../models";
import { Gender, IStudent, StudentStatus } from "../types";

/* ----------------------------------------
   Parsers
----------------------------------------- */
export const parseExcel = (buffer: Buffer): any[] => {
  const workbook = XLSX.read(buffer, { type: "buffer" });
  const sheet = workbook.Sheets[workbook.SheetNames[0]];
  return XLSX.utils.sheet_to_json(sheet);
};

export const parseCSV = (buffer: Buffer): any[] => {
  return parse(buffer.toString("utf-8"), {
    columns: true,
    skip_empty_lines: true,
  });
};

/* ----------------------------------------
   Helpers
----------------------------------------- */
const toTrimmedString = (value: any): string | undefined =>
  value == null ? undefined : String(value).trim();

const toNumber = (value: any): number | undefined => {
  if (value == null || value === "") return undefined;
  const num = Number(value);
  return Number.isNaN(num) ? undefined : num;
};

const parseGender = (value: any): Gender | undefined => {
  const v = String(value ?? "")
    .toLowerCase()
    .trim();
  if (["male", "m"].includes(v)) return Gender.MALE;
  if (["female", "f"].includes(v)) return Gender.FEMALE;
  return undefined;
};

const parseStatus = (value: any): StudentStatus | undefined => {
  const v = String(value ?? "")
    .toLowerCase()
    .trim();
  if (["active", "a"].includes(v)) return StudentStatus.ACTIVE;
  if (["graduated", "g"].includes(v)) return StudentStatus.GRADUATED;
  if (["suspended", "s"].includes(v)) return StudentStatus.TRANSFERRED;
  return undefined;
};

/* ----------------------------------------
   Normalizer
----------------------------------------- */
export const normalizeRow = (row: any) => ({
  admissionNumber: toNumber(row["Adm No"]),
  firstName: toTrimmedString(row["First Name"]),
  middleName: toTrimmedString(row["Middle Name"]) || undefined,
  lastName: toTrimmedString(row["Last Name"]),
  gender: parseGender(row["Gender"]),
  dateOfBirth: row["Date of Birth"]
    ? new Date(row["Date of Birth"])
    : undefined,
  admissionDate: row["Admission Date"]
    ? new Date(row["Admission Date"])
    : new Date(),
  status: parseStatus(row["Status"]),
  previousSchool: toTrimmedString(row["Previous School"]),
  grade: toTrimmedString(row["Grade"]),
  stream: toTrimmedString(row["Stream"])?.toLowerCase(),
});

/* ----------------------------------------
   Upload students
----------------------------------------- */
export const uploadStudentsFromBuffer = async (
  buffer: Buffer,
  fileName: string,
  schoolId: string
) => {
  const ext = fileName.split(".").pop()?.toLowerCase();
  let rows: any[] = [];

  if (ext === "csv") rows = parseCSV(buffer);
  else if (ext === "xlsx" || ext === "xls") rows = parseExcel(buffer);
  else throw new Error("Unsupported file type");

  const students: Partial<IStudent>[] = [];
  const errors: any[] = [];

  for (let i = 0; i < rows.length; i++) {
    try {
      const row = normalizeRow(rows[i]);

      if (!row.admissionNumber || !row.firstName || !row.lastName) {
        throw new Error(
          "Missing required student fields (Adm No, First Name, Last Name)"
        );
      }
      if (!row.gender) throw new Error(`Invalid gender value: ${row.gender}`);
      if (!row.grade || !row.stream)
        throw new Error("Grade and Stream are required");

      /* Resolve Class */

      const classDoc = await ClassModel.findOne({
        clasName: row.grade,
        school: schoolId,
      });
      const streamDoc = await StreamModel.findOne({
        streamName: row.stream,
        school: schoolId,
      });
      if (!classDoc)
        throw new Error(`Class not found for Grade ${row.grade}`);

      if (!streamDoc)
        throw new Error(`Stream not found for Stream ${row.stream}`);

      /* Push student */
      students.push({
        school: schoolId,
        adm: row.admissionNumber,
        studentFirstName: row.firstName,
        studentMiddleName: row.middleName,
        studentLastName: row.lastName,
        studentGender: row.gender,
        dateOfBirth: row.dateOfBirth,
        admissionDate: row.admissionDate,
        status: row.status,
        previousSchool: row.previousSchool,
        classId: classDoc._id,
        stream: streamDoc._id,  
        studentId: crypto.randomUUID(),
      });
    } catch (err: any) {
      errors.push({
        row: i + 2,
        error: err.message,
      });
    }
  }

  /* Save all students in bulk */
  const saved = await StudentModel.insertMany(students, { ordered: false });

  return {
    saved: saved.length,
    failed: errors.length,
    errors,
  };
};
