import type { Teacher } from "../types/school/allocation";

export const sampleTeachers: Teacher[] = [
  { id: "1", firstName: "Alice", middleName: "Wanjiru", lastName: "Kamau",email: "alice@school.edu", primaryPhoneNumber: "0736281165", secondaryPhoneNumber: "0722281765", isActive: true },
  { id: "2", firstName: "John",middleName: "Odhiambo",lastName: "Odhiambo", email: "john@school.edu", primaryPhoneNumber: "0739280162", secondaryPhoneNumber:"", isActive:true },
  { id: "3", firstName: "Grace", middleName: "Kelly",lastName: "Kamau",email: "grace@school.edu", primaryPhoneNumber: "0723271465", secondaryPhoneNumber: "0725881265", isActive: false },
];