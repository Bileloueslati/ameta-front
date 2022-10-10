import { Stack, Container, Box, Paper } from "@mui/material";
import useThemeMode from "../../../hooks/useThemeMode";
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
      elevation={0}
      sx={({ palette }) => ({
        width: "100%",
        py: 0.5,
        mb: 4,
      })}
    >
      <Container maxWidth={"xxl"}>
        <Stack justifyContent="space-between" direction="row">
          <Stack direction="row" spacing={4} alignItems="center">
            <Box
              component="img"
              src={`/img/${mode == "dark" ? "white" : "dark"}-logo.png`}
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
    </Paper>
  );
}
