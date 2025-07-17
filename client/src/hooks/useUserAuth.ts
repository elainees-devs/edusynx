import { useState, useEffect } from "react";
import type { ISuperAdmin, IUser } from "../types/people/user.types";

interface UseLoggedInStatus {
  isLoggedIn: boolean;
  savedUser: IUser | null;
  savedAdmin: ISuperAdmin | null;
  loginUser: (user: IUser) => void;
  loginSuperAdmin: (admin: ISuperAdmin) => void;
  logoutUser: () => void;
}

const useUserAuth = (): UseLoggedInStatus => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [savedUser, setUserDetails] = useState<IUser | null>(null);
  const [savedAdmin, setAdmin] = useState<ISuperAdmin | null>(null);

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

    checkLoggedInStatus();

    const interval = setInterval(() => {
      checkLoggedInStatus();
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  const loginUser = (user: IUser): void => {
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

export default useUserAuth;
