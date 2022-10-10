import Routes from "./components/routes";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import Swr from "./libs/swr";
import { ToastContainer } from "react-toastify";
import useThemeMode from "./hooks/useThemeMode";
import { useMemo } from "react";
import { getTheme } from "./libs/mui/theme";

function App() {
  const { mode } = useThemeMode();

  const theme = useMemo(() => createTheme(getTheme(mode)), [mode]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Swr>
        <Routes />
      </Swr>

      <ToastContainer position="bottom-right" autoClose={2000} />
    </ThemeProvider>
  );
}

export default App;
