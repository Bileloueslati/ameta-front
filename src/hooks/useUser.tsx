import { useAuth } from "./useAuth";
import jwtDecode from "jwt-decode";
import { User } from "../__typescript/api";
import { useMemo } from "react";

const useUser = () => {
  const { firstName, lastName, token, update } = useAuth();

  if (!token || !firstName || !lastName) {
    throw new Error(
      "User is not authenticated, Make sure you use this hook inside <PrivateRoute />"
    );
  }

  const { id, roles } = useMemo(() => jwtDecode<User>(token), [token]);

  const isAdmin = roles.includes("ROLE_ADMIN");

  return { firstName, lastName, id, roles, isAdmin, update };
};

export default useUser;
