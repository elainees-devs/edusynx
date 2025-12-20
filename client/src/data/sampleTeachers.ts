import type { Teacher } from "../types/school/allocation";

export const sampleTeachers: Teacher[] = [
  {
    id: "1",
    firstName: "Alice",
    middleName: "Wanjiru",
    lastName: "Kamau",
    employmentNo: "EMP001",
    email: "alice@school.edu",
    primaryPhoneNumber: "0736281165",
    secondaryPhoneNumber: "0722281765",
    isActive: true,
  },
  {
    id: "2",
    firstName: "John",
    middleName: "Odhiambo",
    lastName: "Odhiambo",
    employmentNo: "EMP002",
    email: "john@school.edu",
    primaryPhoneNumber: "0739280162",
    secondaryPhoneNumber: "",
    isActive: true,
  },
  {
    id: "3",
    firstName: "Grace",
    middleName: "Kelly",
    lastName: "Kamau",
    employmentNo: "EMP003",
    email: "grace@school.edu",
    primaryPhoneNumber: "0723271465",
    secondaryPhoneNumber: "0725881265",
    isActive: false,
  },
];
