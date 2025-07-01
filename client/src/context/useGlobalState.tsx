// client/src/context/useGlobalState.tsx
import React, { createContext, useContext, useReducer, useEffect } from "react";
import type { ReactNode } from "react";

import { dummyUsers, UserRole } from "../constants";
import type { IUser } from "../types/people/user.types";

// Define role type from UserRole constant
export type Role = (typeof UserRole)[keyof typeof UserRole];


// Define User and GlobalState types


export interface GlobalState {
  users: IUser[];
  loggedInUser: IUser | null;
}

const initialState: GlobalState = {
  users: [],
  loggedInUser: null,
};

// Define possible actions
type Action =
  | { type: "UPDATE_USERS"; payload: IUser[] }
  | { type: "UPDATE_USER"; payload: IUser };

// Create context
const GlobalStateContext = createContext<
  | {
      state: GlobalState;
      dispatch: React.Dispatch<Action>;
      getUserRole: (state: GlobalState) => Role;
    }
  | undefined
>(undefined);

// Custom hook to access global state
export const useGlobalState = () => {
  const context = useContext(GlobalStateContext);
  if (!context) {
    throw new Error("useGlobalState must be used within a GlobalStateProvider");
  }
  return context;
};

// Reducer function
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

// Provider component
interface GlobalStateProviderProps {
  children: ReactNode;
}

export const GlobalStateProvider: React.FC<GlobalStateProviderProps> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  // Load dummy users into state on mount
  useEffect(() => {
    dispatch({ type: "UPDATE_USERS", payload: dummyUsers  });
  }, []);

  // Function to get user role
  const getUserRole = (state: GlobalState) => {
    const currentUser = state.loggedInUser || state.users[0];
    return currentUser ? currentUser.role : UserRole.SUPER_ADMIN;
  };

  return (
    <GlobalStateContext.Provider value={{ state, dispatch, getUserRole }}>
      {children}
    </GlobalStateContext.Provider>
  );
};
