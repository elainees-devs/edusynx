// client/src/hooks/useGlobalContext.tsx
import React, {
  createContext,
  useContext,
  useReducer,
  useEffect,
} from "react";
import type { ReactNode } from "react";
import type { ISchool } from "../types";
import { UserRole } from "../constants";
import useUserAuth from "./useAuth";

type User = ISchool;

export interface GlobalState {
  userRole: UserRole;
  users: User[];
  loggedInUser: User | null;
  API_URL: string;
}

const initialState: GlobalState = {
  userRole: UserRole.SUPER_ADMIN,
  users: [],
  loggedInUser: null,
  API_URL: "https://mern-edusynx-school-management-system.onrender.com",
};

type Action =
  | { type: "UPDATE_USERS"; payload: User[] }
  | { type: "UPDATE_USER"; payload: User | null };

const GlobalStateContext = createContext<
  | {
      state: GlobalState;
      dispatch: React.Dispatch<Action>;
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

const GlobalStateProvider: React.FC<GlobalStateProviderProps> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const userAuth = useUserAuth();

  useEffect(() => {
    if (userAuth.isLoggedIn) {
      dispatch({
        type: "UPDATE_USER",
        payload: userAuth.savedUser,
      });
    }
  }, [userAuth.isLoggedIn, userAuth.savedUser]);

  return (
    <GlobalStateContext.Provider value={{ state, dispatch }}>
      {children}
    </GlobalStateContext.Provider>
  );
};

export default GlobalStateProvider;
