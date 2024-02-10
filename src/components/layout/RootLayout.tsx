import { Box, CssBaseline, PaletteMode, ThemeProvider, useMediaQuery } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { FunctionComponent, useMemo, useState } from "react";
import { Outlet } from "react-router-dom";
import { AlertProvider } from "../../providers/AlertProvider";
import { AlertSnackbar } from "./AlertSnackbar";
import { FooterPanel } from "./FooterPanel";
import { HeaderPanel } from "./HeaderPanel";
import { NavigationMenu } from "./NavigationMenu";

export const RootLayout: FunctionComponent = () => {
  const isDarkModePreferred = useMediaQuery("(prefers-color-scheme: dark)");
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [paletteType, setPaletteType] = useState<PaletteMode>(
    isDarkModePreferred ? "dark" : "light"
  );

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: paletteType,
        },
      }),
    [paletteType]
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AlertProvider>
        <AlertSnackbar />
        <HeaderPanel
          isOpen={isMenuOpen}
          onMenuOpen={() => setIsMenuOpen(true)}
          onDarkModeToggle={() => setPaletteType(paletteType === "dark" ? "light" : "dark")}
        />
        <NavigationMenu
          isOpen={isMenuOpen}
          onMenuClose={() => setIsMenuOpen(false)}
        />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            flex: "1 1 auto",
            height: "100vh",
            overflow: "hidden",
          }}
        >
          <Box sx={theme.mixins.toolbar} />
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              overflow: "auto",
              flex: "1 1 auto",
            }}
          >
            <Box
              component={"main"}
              sx={{
                flex: "1 1 auto",
              }}
            >
              <Outlet />
            </Box>
            <FooterPanel />
          </Box>
        </Box>
      </AlertProvider>
    </ThemeProvider>
  );
};
