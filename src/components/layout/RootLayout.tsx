import { Box, CssBaseline, PaletteMode, ThemeProvider, useMediaQuery } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { FunctionComponent, useMemo, useState } from "react";
import { Outlet } from "react-router-dom";
import { FooterPanel } from "./FooterPanel";
import { HeaderPanel } from "./HeaderPanel";
import { NavigationMenu } from "./NavigationMenu";
import { AlertSnackbar } from "./AlertSnackbar";
import { AlertProvider } from "../../providers/AlertProvider";

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
        <Box
          sx={{
            display: "flex",
            overflow: "auto",
          }}
        >
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
              flex: `1 1`,
              minHeight: `100vh`,
              alignItems: "stretch",
              overflow: "hidden",
            }}
          >
            <Box sx={theme.mixins.toolbar} />
            <Box
              sx={{
                display: "flex",
                flex: "1 1 auto",
                alignItems: "stretch",
                paddingTop: theme.spacing(2),
                paddingBottom: theme.spacing(2),
                [theme.breakpoints.up("md")]: {
                  paddingTop: theme.spacing(4),
                  paddingBottom: theme.spacing(4),
                },
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
