import { PaletteMode, ThemeProvider, useMediaQuery } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { FunctionComponent, createContext, useCallback, useMemo, useState } from "react";
import { HasChildrenProps } from "../types/reactUtilityTypes";

export interface PaletteModeState {
  paletteMode: PaletteMode;
  togglePaletteMode: () => void;
}

export const PaletteModeContext = createContext<PaletteModeState>({
  paletteMode: "light",
  togglePaletteMode: () => {},
});

export const PaletteModeProvider: FunctionComponent<HasChildrenProps> = props => {
  const isDarkModePreferred = useMediaQuery("(prefers-color-scheme: dark)");
  const [paletteMode, setPaletteMode] = useState<PaletteMode>(
    isDarkModePreferred ? "dark" : "light"
  );

  const togglePaletteMode = useCallback(
    () => setPaletteMode(mode => (mode === "dark" ? "light" : "dark")),
    [setPaletteMode]
  );

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: paletteMode,
        },
      }),
    [paletteMode]
  );

  return (
    <ThemeProvider theme={theme}>
      <PaletteModeContext.Provider value={{ paletteMode, togglePaletteMode }}>
        {props.children}
      </PaletteModeContext.Provider>
    </ThemeProvider>
  );
};
