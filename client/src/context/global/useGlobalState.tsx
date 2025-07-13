// client/src/context/useGlobalState.tsx
import React, { useReducer, useEffect } from "react";
import useUserAuth from "../../hooks/useUserAuth";
import { GlobalStateContext } from "./globalStateContext";
import { reducer } from "./globalStateReducer";
import { initialState } from "../../types/global/globalState.types";


interface Props {
  children: React.ReactNode;
}

const GlobalStateProvider: React.FC<Props> = ({ children }) => {
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
