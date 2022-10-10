import { Box, Stack, Container } from "@mui/material";
import { FunctionComponent, PropsWithChildren } from "react";
import useThemeMode from "../../hooks/useThemeMode";
import Header from "./header";

const Layout: FunctionComponent<PropsWithChildren> = ({ children }) => {
  const { mode } = useThemeMode();

  return (
    <Stack
      sx={({ palette }) => ({
        minHeight: "100vh",
        width: "100%",
        overflow: "hidden",
        backgroundColor:
          mode == "dark" ? palette.background.default : "#dfe6e9",
      })}
    >
      <Header />

      <Container maxWidth="xxl">{children}</Container>
    </Stack>
  );
};

export default Layout;
