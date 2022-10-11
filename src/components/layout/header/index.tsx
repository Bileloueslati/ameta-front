import { Stack, Container, Box, Paper, Link } from "@mui/material";
import useThemeMode from "../../../hooks/useThemeMode";
import Logo from "../../logo";
import Nav from "../sidebar/nav";
import NavExpander from "./navExpander";
import Notifications from "./notifications";
import Search from "./search";
import ThemeModeSwitcher from "./themeMode";
import UserDropDown from "./userDropDown";

export default function Header() {
  const { mode } = useThemeMode();

  return (
    <Paper
      elevation={1}
      sx={({ palette }) => ({
        width: "100%",
        py: 0.5,
        mb: 4,
      })}
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

          <Stack direction="row" spacing={3} alignItems="center">
            <ThemeModeSwitcher />
            <Notifications />
            <UserDropDown />
          </Stack>
        </Stack>
      </Container>
    </Paper>
  );
}
