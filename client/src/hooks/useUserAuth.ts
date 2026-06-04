// client/src/hooks/useUserAuth.ts
import { useState, useEffect } from "react";
import type { IBaseUser, ISuperAdmin } from "../types";


interface UseLoggedInStatus {
  isLoggedIn: boolean;
  savedUser: IBaseUser | null;
  savedAdmin: ISuperAdmin | null;
  loginUser: (user: IBaseUser) => void;
  loginSuperAdmin: (admin: ISuperAdmin) => void;
  logoutUser: () => void;
}

export const useUserAuth = (): UseLoggedInStatus => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(() => {
    return !!(localStorage.getItem("savedUser") || localStorage.getItem("savedSuperAdmin"));
  });
  const [savedUser, setUserDetails] = useState<IBaseUser | null>(() => {
    const data = localStorage.getItem("savedUser");
    return data ? JSON.parse(data) : null;
  });
  const [savedAdmin, setAdmin] = useState<ISuperAdmin | null>(() => {
    const data = localStorage.getItem("savedSuperAdmin");
    return data ? JSON.parse(data) : null;
  });

  useEffect(() => {
    const checkLoggedInStatus = () => {
      const userData = localStorage.getItem("savedUser");
      const adminData = localStorage.getItem("savedSuperAdmin");

      if (userData) {
        setIsLoggedIn(true);
        setUserDetails(JSON.parse(userData));
      } else if (adminData) {
        setIsLoggedIn(true);
        setAdmin(JSON.parse(adminData));
      } else {
        setIsLoggedIn(false);
        setUserDetails(null);
        setAdmin(null);
      }
    };
 

    const interval = setInterval(() => {
      checkLoggedInStatus();
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  const loginUser = (user: IBaseUser): void => {
    localStorage.setItem("savedUser", JSON.stringify(user));
    setIsLoggedIn(true);
    setUserDetails(user);
    setAdmin(null); // Clear admin just in case
  };

  const loginSuperAdmin = (admin: ISuperAdmin): void => {
    localStorage.setItem("savedSuperAdmin", JSON.stringify(admin));
    setIsLoggedIn(true);
    setAdmin(admin);
    setUserDetails(null); // Clear user just in case
  };

  const logoutUser = (): void => {
    localStorage.removeItem("savedUser");
    localStorage.removeItem("savedSuperAdmin");
    setIsLoggedIn(false);
    setUserDetails(null);
    setAdmin(null);
  };

  return {
    isLoggedIn,
    savedUser,
    savedAdmin,
    loginUser,
    loginSuperAdmin,
    logoutUser,
  };
};


