import { Stack, Box, Link } from "@mui/material";
import intersection from "lodash/intersection";
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
      path: "/",
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
              <Link to={path} sx={{ color: "#222" }}>
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
