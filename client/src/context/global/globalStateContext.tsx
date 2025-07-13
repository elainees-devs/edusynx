// client/src/context/global/globalStateContext.tsx
import React, { createContext } from "react";
import type { Action, GlobalState } from "../../types/global/globalState.types";


export const GlobalStateContext = createContext<
  | {
      state: GlobalState;
      dispatch: React.Dispatch<Action>;
    }
  | undefined
>(undefined);

