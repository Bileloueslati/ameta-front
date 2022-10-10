import create from "zustand";
import { persist } from "zustand/middleware";
import { PaletteMode } from "@mui/material";

const isDefaultDarkMode = window.matchMedia(
  "(prefers-color-scheme: dark)"
).matches;

const initialState = {
  mode: isDefaultDarkMode ? "dark" : ("light" as PaletteMode),
};

type ThemeMode = {
  mode: PaletteMode;
  toggle: () => void;
};

const useThemeMode = create(
  persist<ThemeMode>(
    (set, get) => ({
      ...initialState,
      toggle: () => {
        const currentMode = get().mode;

        const mode = currentMode === "dark" ? "light" : "dark";

        set({ mode });
      },
    }),
    {
      name: "themeMode",
    }
  )
);

export default useThemeMode;
