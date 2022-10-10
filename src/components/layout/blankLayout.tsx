import { Stack } from "@mui/material";
import { FunctionComponent, PropsWithChildren } from "react";
import { Outlet } from "react-router-dom";
import useThemeMode from "../../hooks/useThemeMode";

const BlankLayout = () => {
  const { mode } = useThemeMode();

  return (
    <Stack
      sx={{
        display: "flex",
        minHeight: "100vh",
        width: "100%",
        overflow: "hidden",
        backgroundColor:
          mode == "light" ? "rgba(238, 238, 238, 0.5)" : "background.default",
      }}
    >
      <Outlet />
    </Stack>
  );
};

export default BlankLayout;
