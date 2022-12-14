import { Stack, Box, Link } from "@mui/material";
import intersection from "lodash/intersection";
import { useLocation } from "react-router-dom";
import useUser from "../../../hooks/useUser";
import { UserRoles } from "../../../__typescript/api";

export default function Nav() {
  const items = [
    {
      title: "Dashboard",
      path: "/",
    },
    {
      title: "Sheets",
      path: "/sheets",
    },

    {
      title: "Accounts",
      path: "/accounts",
      permissions: ["ROLE_ADMIN", "ROLE_SUPERADMIN"],
    },
    {
      title: "Companies",
      path: "/companies",
      permissions: ["ROLE_SUPERADMIN"],
    },
  ];

  const { roles } = useUser();

  const isAllowed = (permissions: UserRoles) =>
    !!intersection(roles, permissions).length;

  const { pathname: currentPath } = useLocation();

  return (
    <Box component="nav">
      <Stack
        direction="row"
        component="ul"
        spacing={4}
        sx={{ listStyle: "none", p: 0 }}
      >
        {items
          .filter(
            ({ permissions }) =>
              !permissions || isAllowed(permissions as UserRoles)
          )
          .map(({ title, path }, i) => (
            <Box key={i} component="li">
              {/* @ts-ignore */}
              <Link
                to={path}
                sx={({ palette }) => ({
                  color:
                    currentPath === path
                      ? palette.primary.main
                      : palette.text.primary,
                })}
              >
                <Box
                  component="span"
                  sx={{
                    fontWeight: 500,
                    fontSize: "1.1rem",
                  }}
                >
                  {title}
                </Box>
              </Link>
            </Box>
          ))}
      </Stack>
    </Box>
  );
}
