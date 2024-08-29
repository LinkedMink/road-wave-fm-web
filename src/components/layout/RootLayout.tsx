import { Box } from "@mui/material";
import { Fragment, FunctionComponent, useState } from "react";
import { Outlet } from "react-router-dom";
import { HasChildrenProps } from "../../types/reactUtilityTypes";
import { FooterPanel } from "./FooterPanel";
import { HeaderPanel } from "./HeaderPanel";
import { NavigationMenu } from "./NavigationMenu";
import { AlertProvider } from "../../providers/AlertProvider";

export const RootLayout: FunctionComponent<Partial<HasChildrenProps>> = props => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  return (
    <Fragment>
      <HeaderPanel
        isOpen={isMenuOpen}
        onMenuOpen={() => setIsMenuOpen(true)}
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
        <Box sx={theme => theme.mixins.toolbar} />
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
            sx={{ flex: "1 1 auto" }}
          >
            <AlertProvider>
              {props.children}
              <Outlet />
            </AlertProvider>
          </Box>
          <FooterPanel />
        </Box>
      </Box>
    </Fragment>
  );
};
