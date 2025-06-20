// src/hooks/useAuth.ts
import { useState, useEffect } from "react";
import type { ISchool } from "../types";


interface UseLoggedInStatus {
  isLoggedIn: boolean;
  savedUser: ISchool | null;
  loginUser: (user: ISchool) => void;
  logoutUser: () => void;
}

const useUserAuth = (): UseLoggedInStatus => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [savedUser, setUserDetails] = useState<ISchool | null>(null);

  useEffect(() => {
    const checkLoggedInStatus = () => {
      const savedUser = localStorage.getItem("savedUser");
      if (savedUser) {
        setIsLoggedIn(true);
        const storedUserDetails = JSON.parse(savedUser || "{}");
        setUserDetails(storedUserDetails);
      } else {
        setIsLoggedIn(false);
        setUserDetails(null);
      }
    };

    checkLoggedInStatus();

    const interval = setInterval(() => {
      checkLoggedInStatus();
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  const loginUser = (user: ISchool): void => {
    localStorage.setItem("savedUser", JSON.stringify(user));
    setIsLoggedIn(true);
    setUserDetails(user);

    // Log the saved user to the console after login
    console.log("Saved user after login:", user);
  };

  const logoutUser = (): void => {
    localStorage.removeItem("savedUser");
    setIsLoggedIn(false);
    setUserDetails(null);
  };

  return { isLoggedIn, savedUser, loginUser, logoutUser };
};

export default useUserAuth;