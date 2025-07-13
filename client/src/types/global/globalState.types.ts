// client/src/types/global/globalState.types.ts
import { UserRole } from "../../constants";
import type { IUser } from "../people/user.types";


export type User = IUser;

export interface GlobalState {
  userRole: UserRole;
  users: User[];
  loggedInUser: User | null;
  API_URL: string;
}

export type Action =
  | { type: "UPDATE_USERS"; payload: User[] }
  | { type: "UPDATE_USER"; payload: User | null };

export const initialState: GlobalState = {
  userRole: UserRole.SUPER_ADMIN,
  users: [],
  loggedInUser: null,
  API_URL: "https://mern-edusynx-school-management-system.onrender.com",
};
