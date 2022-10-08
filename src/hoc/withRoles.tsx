import { ComponentType } from "react";
import useUser from "../hooks/useUser";
import { UserRoles } from "../__typescript/api";
import intersection from "lodash/intersection";
import RestrictedRoute from "../components/routes/restrictedRoute";

const WithRoles =
  <T extends Object>(Component: ComponentType<T>, roles: UserRoles) =>
  (props: T) => {
    const { roles: userRoles } = useUser();

    const isAllowed = !!intersection(roles, userRoles).length;

    if (!isAllowed) return <RestrictedRoute />;

    return <Component {...props} />;
  };

export default WithRoles;
