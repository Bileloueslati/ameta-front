import { useAuth } from "./useAuth";
import jwtDecode from "jwt-decode";
import { User } from "../__typescript/api";

const useUser = () => {
  const { firstName, lastName, token, update } = useAuth();

  if (!token || !firstName || !lastName) {
    throw new Error("User is not authenticated");
  }

  const { id, roles } = jwtDecode<User>(token);

  const isAdmin = roles.includes("ROLE_ADMIN");

  return { firstName, lastName, id, roles, isAdmin, update };
};

export default useUser;
