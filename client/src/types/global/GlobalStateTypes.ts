// client/src/types/global/globalState.types.ts
import { UserRole } from "../../constants";
import type { ISuperAdmin, IUser } from "../people/user.types";


export type User = IUser | ISuperAdmin

export interface GlobalState {
  userRole: UserRole;
  users: User[];
  loggedInUser: User | null;
  API_URL: string;
}

export type Action =
  | { type: "UPDATE_USERS"; payload: User[] }
  | { type: "UPDATE_USER"; payload: User | null }
  | { type: "LOGIN"; payload: User | null };


export const initialState: GlobalState = {
  userRole: UserRole.SCHOOL_ADMIN,
  users: [],
  loggedInUser: null,
  API_URL: "https://mern-edusynx-school-management-system.onrender.com",
};