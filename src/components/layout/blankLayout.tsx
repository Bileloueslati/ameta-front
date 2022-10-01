import { Stack } from "@mui/material";
import { FunctionComponent, PropsWithChildren } from "react";
import { Outlet } from "react-router-dom";

const BlankLayout = () => {
  return (
    <Stack
      sx={{
        display: "flex",
        minHeight: "100vh",
        width: "100%",
        overflow: "hidden",
        backgroundColor: "rgba(238, 238, 238, 0.5)",
      }}
    >
      <Outlet />
    </Stack>
  );
};

export default BlankLayout;
