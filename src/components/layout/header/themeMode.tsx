import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import LightModeIcon from "@mui/icons-material/LightMode";
import IconButton from "@mui/material/IconButton";
import useThemeMode from "../../../hooks/useThemeMode";

export default function ThemeModeSwitcher() {
  const { toggle, mode } = useThemeMode();

  return (
    <IconButton onClick={toggle}>
      {mode === "dark" ? <LightModeIcon /> : <DarkModeOutlinedIcon />}
    </IconButton>
  );
}
