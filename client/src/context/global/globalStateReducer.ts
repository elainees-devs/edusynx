// client/src/context/global/globalStateReducer.ts
import type { Action, GlobalState } from "../../types/global/globalState.types";


export const reducer = (state: GlobalState, action: Action): GlobalState => {
  switch (action.type) {
    case "UPDATE_USERS":
      return { ...state, users: action.payload };
    case "UPDATE_USER":
      return { ...state, loggedInUser: action.payload };
    default:
      return state;
  }
};
