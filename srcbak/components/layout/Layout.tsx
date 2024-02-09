import { Box, CssBaseline, PaletteMode, ThemeProvider, useMediaQuery } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import React, { FunctionComponent, useState } from "react";
import { Outlet } from "react-router-dom";
import GoogleOAuthContainer from "../../containers/GoogleOAuthContainer";
import AlertDialogContainer from "../../containers/layout/AlertDialogContainer";
import AlertSnackbarContainer from "../../containers/layout/AlertSnackbarContainer";
import ConfirmDialogContainer from "../../containers/layout/ConfirmDialogContainer";
import LoadingOverlayContainer from "../../containers/layout/LoadingOverlayContainer";
import NavigationMenuContainer from "../../containers/layout/NavigationMenuContainer";
import FooterPanel from "./FooterPanel";
import HeaderPanel from "./HeaderPanel";

export interface LayoutStateProps {
  isLoggedIn: boolean;
}

export type LayoutProps = LayoutStateProps;

const Layout: FunctionComponent<LayoutProps> = props => {
  const isDarkModePrefered = useMediaQuery("(prefers-color-scheme: dark)");

  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [paletteType, setPaletteType] = React.useState<PaletteMode>(
    isDarkModePrefered ? "dark" : "light"
  );

  const theme = React.useMemo(
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
      <LoadingOverlayContainer />
      <AlertDialogContainer />
      <AlertSnackbarContainer />
      <ConfirmDialogContainer />
      <GoogleOAuthContainer />
      <Box
        sx={{
          display: "flex",
          overflow: "auto",
        }}
      >
        <HeaderPanel
          isLoggedIn={props.isLoggedIn}
          isOpen={isMenuOpen}
          onMenuOpen={() => setIsMenuOpen(true)}
          isDarkMode={paletteType === "dark"}
          onDarkModeToggle={() => setPaletteType(paletteType === "dark" ? "light" : "dark")}
        />
        <NavigationMenuContainer
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
    </ThemeProvider>
  );
};

export default Layout;
