import { FunctionComponent, PropsWithChildren, useEffect } from "react";
import { UserRoles } from "../../__typescript/api";
import intersection from "lodash/intersection";
import useUser from "../../hooks/useUser";
import { Stack, Typography, Box } from "@mui/material";
import HttpsOutlinedIcon from "@mui/icons-material/HttpsOutlined";
import { useNavigate } from "react-router-dom";

type Props = PropsWithChildren & {
  permissions: UserRoles;
};

const RestrictedRoute: FunctionComponent<Props> = ({
  children,
  permissions,
}) => {
  const { roles } = useUser();

  const isAllowed = !!intersection(roles, permissions).length;

  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!isAllowed) {
        navigate("/");
      }
    }, 2000);

    return () => clearTimeout(timer);
  }, [roles]);

  if (!isAllowed)
    return (
      <Stack justifyContent="center" alignItems="center" mt={12} spacing={1.5}>
        <Box>
          <HttpsOutlinedIcon sx={{ height: 50, width: 50 }} color="primary" />
        </Box>
        <Typography variant="h5" color="primary">
          You are not allowed to access this page
        </Typography>
      </Stack>
    );

  return <>{children}</>;
};

export default RestrictedRoute;
