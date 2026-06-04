// client/src/constants/SearchConfig.ts
import type { Guardian, IClass, ICompetency, IStrand, IStream, ISubject, Student } from "../types";
import type { Teacher } from "../types/school/Allocation";
import type { IStaff } from "../types/people/StaffTypes";

// Generic config type
interface SearchConfig<T> {
  placeholder: string;
  keys: (keyof T)[];
}

export const searchConfig = {
  teacher: {
    placeholder: "Search by Employment No. or First Name...",
    keys: [
      "employmentNumber",
      "firstName",
      "middleName",
      "lastName",
    ] as (keyof Teacher)[],
  } satisfies SearchConfig<Teacher>,

  student: {
    placeholder: "Search by Adm No. or First Name...",
    keys: ["adm", "firstName"] as (keyof Student)[],
  } satisfies SearchConfig<Student>,

  guardian: {
    placeholder: "Search by Adm No., Family No., or Phone...",
    keys: ["admissionNumber", "familyNumber", "phone"] as (keyof Guardian)[],
  } satisfies SearchConfig<Guardian>,

  class: {
    placeholder: "Search by Class Name...",
    keys: ["clasName"] as (keyof IClass)[],
  } satisfies SearchConfig<IClass>,

  stream: {
    placeholder: "Search by Stream Name...",
    keys: ["streamName"] as (keyof IStream)[],
  } satisfies SearchConfig<IStream>,

  subject: {
    placeholder: "Search by Subject Name ...",
    keys: ["subjectName"] as (keyof ISubject)[],
  } satisfies SearchConfig<ISubject>,

  competency: {
    placeholder: "Search by Code or Title...",
    keys: ["code", "title"] as (keyof ICompetency)[],
  } satisfies SearchConfig<ICompetency>,

  strand:{
    placeholder: "Search by Code or Title...",
    keys: ["code", "title"] as (keyof IStrand)[],
  } satisfies SearchConfig<IStrand>,

  staff: {
    placeholder: "Search by Employee No., Name, or Email...",
    keys: ["employeeNumber", "firstName", "middleName", "lastName", "email"] as (keyof IStaff)[],
  } satisfies SearchConfig<IStaff>,
};
