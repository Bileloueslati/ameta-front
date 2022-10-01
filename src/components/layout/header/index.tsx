import { Stack, Container, Box } from "@mui/material";
import Nav from "../sidebar/nav";
import NavExpander from "./navExpander";
import Notifications from "./notifications";
import Search from "./search";
import ThemeModeSwitcher from "./themeMode";
import UserDropDown from "./userDropDown";

export default function Header() {
  return (
    <Box sx={{ width: "100%", backgroundColor: "#fff", py: 0.5, mb: 4 }}>
      <Container maxWidth={"xl"}>
        <Stack justifyContent="space-between" direction="row">
          <Stack direction="row" spacing={4} alignItems="center">
            <Box
              component="img"
              src="/img/dark-logo.png"
              sx={{ maxWidth: 260 }}
            />

            <Box>
              <Nav />
            </Box>
          </Stack>

          <Stack direction="row" spacing={3} alignItems="center">
            <ThemeModeSwitcher />
            <Notifications />
            <UserDropDown />
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
}
