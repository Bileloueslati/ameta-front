import { Stack } from "@mui/material";
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
        backgroundColor: "background.default",
      }}
    >
      <Outlet />
    </Stack>
  );
};

export default BlankLayout;
