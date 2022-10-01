import Routes from "./components/routes";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { theme } from "./libs/mui/theme";
import Swr from "./libs/swr";
import { ToastContainer } from "react-toastify";

function App() {
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
