import { Stack, Container, Box, Paper, Link } from "@mui/material";
import { FC } from "react";
import Logo from "../../logo";
import Nav from "../sidebar/nav";
import FullScreen from "./fullScreen";
import Notifications from "./notifications";
import ThemeModeSwitcher from "./themeMode";
import UserDropDown from "./userDropDown";

const Header: FC = () => (
  <Paper
    elevation={1}
    sx={{
      width: "100%",
      py: 0.5,
      mb: 4,
    }}
  >
    <Container maxWidth={"xxl"}>
      <Stack justifyContent="space-between" direction="row">
        <Stack direction="row" spacing={4} alignItems="center">
          <Link href="/">
            <Logo sx={{ maxWidth: 260 }} />
          </Link>
          <Box>
            <Nav />
          </Box>
        </Stack>
        <Stack direction="row" spacing={2} alignItems="center">
          <FullScreen />
          <ThemeModeSwitcher />
          <Notifications />
          <UserDropDown />
        </Stack>
      </Stack>
    </Container>
  </Paper>
);

export default Header;
