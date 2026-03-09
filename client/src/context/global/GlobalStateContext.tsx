// client/src/context/global/GlobalStateContext.tsx
import React, { createContext } from "react";
import type { Action, GlobalState } from "../../types/global/GlobalStateTypes";

export const GlobalStateContext = createContext<
  | {
      state: GlobalState;
      dispatch: React.Dispatch<Action>;
    }
  | undefined
>(undefined);
