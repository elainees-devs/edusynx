// client/src/context/useGlobalState.tsx
import React, { createContext, useContext, useReducer } from "react";
import type { ReactNode } from "react";
import { UserRole } from "../constants";

export type Role = (typeof UserRole)[keyof typeof UserRole];

// Define types
export interface User {
  name: string;
  email: string;
  password?: string;
  role: Role;
}

// Define GlobalState type
export interface GlobalState {
  users: User[];
  loggedInUser: User | null;
}

const initialState: GlobalState = {
  users: [],
  loggedInUser: null,
};

type Action = { type: "UPDATE_USERS" | "UPDATE_USER"; payload: any };

// Create context
const GlobalStateContext = createContext<
  | {
      state: GlobalState;
      dispatch: React.Dispatch<Action>;
      getUserRole: (state: GlobalState) => Role;
    }
  | undefined
>(undefined);

// Custom hook to access state and update it
export const useGlobalState = () => {
  const context = useContext(GlobalStateContext);
  if (!context) {
    throw new Error("useGlobalState must be used within a GlobalStateProvider");
  }
  return context;
};

// Reducer function to update state
const reducer = (state: GlobalState, action: Action): GlobalState => {
  switch (action.type) {
    case "UPDATE_USERS":
      return { ...state, users: action.payload };
    case "UPDATE_USER":
      return { ...state, loggedInUser: action.payload };
    default:
      return state;
  }
};

// GlobalStateProvider component
interface GlobalStateProviderProps {
  children: ReactNode;
}

export const GlobalStateProvider: React.FC<GlobalStateProviderProps> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  // Function to get the user role
  const getUserRole = (state: GlobalState) => {
    // Assuming the first user in the state represents the current user
    const currentUser = state.users[0];
    return currentUser ? currentUser.role : UserRole.SUPER_ADMIN; // Default to SUPER ADMIN role if no user is available
  };

  return (
    <GlobalStateContext.Provider value={{ state, dispatch, getUserRole }}>
      {children}
    </GlobalStateContext.Provider>
  );
};
