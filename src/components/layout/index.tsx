import { Box, Stack, Container } from "@mui/material";
import { FunctionComponent, PropsWithChildren } from "react";
import Header from "./header";

const Layout: FunctionComponent<PropsWithChildren> = ({ children }) => {
  return (
    <Stack
      sx={{
        minHeight: "100vh",
        width: "100%",
        overflow: "hidden",
        backgroundColor: "rgb(241 245 249)",
      }}
    >
      <Header />

      <Container maxWidth="xxl">{children}</Container>
    </Stack>
  );
};

export default Layout;
