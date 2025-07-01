// client/src/context/useGlobalState.tsx
import React, { createContext, useContext, useReducer } from "react";
import type { ReactNode } from "react";
import type { IUser } from "../types/people/user.types";
import { UserRole} from "../constants";


export type Role = typeof UserRole[keyof typeof UserRole];


export interface GlobalState {
  users: IUser[];
  loggedInUser: IUser | null;
}

const initialState: GlobalState = {
  users: [],
  loggedInUser: null,
};

type Action =
  | { type: "UPDATE_USERS"; payload: IUser[] }
  | { type: "UPDATE_USER"; payload: IUser };

const GlobalStateContext = createContext<
  | {
      state: GlobalState;
      dispatch: React.Dispatch<Action>;
      getUserRole: (state: GlobalState) => Role;
    }
  | undefined
>(undefined);

export const useGlobalState = () => {
  const context = useContext(GlobalStateContext);
  if (!context) {
    throw new Error("useGlobalState must be used within a GlobalStateProvider");
  }
  return context;
};

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

interface GlobalStateProviderProps {
  children: ReactNode;
}

export const GlobalStateProvider: React.FC<GlobalStateProviderProps> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const getUserRole = (state: GlobalState) => {
    const currentUser = state.loggedInUser || state.users[0];
    return currentUser ? currentUser.role : UserRole.SUPER_ADMIN
  };

  return (
    <GlobalStateContext.Provider value={{ state, dispatch, getUserRole }}>
      {children}
    </GlobalStateContext.Provider>
  );
};
