import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import { Box, Drawer, IconButton, Tooltip } from "@mui/material";
import { FunctionComponent, MouseEventHandler } from "react";
import { NavigationMenuLinks } from "./NavigationMenuLinks";
import { NAV_DRAWER_WIDTH_PX } from "./layoutConstants";

export interface NavigationMenuProps {
  isOpen: boolean;
  onMenuClose: MouseEventHandler<HTMLButtonElement>;
}

export const NavigationMenu: FunctionComponent<NavigationMenuProps> = props => {
  return (
    <Drawer
      variant="permanent"
      open={props.isOpen}
      PaperProps={{
        component: "nav",
        sx: theme => {
          const closedStyles = !props.isOpen
            ? {
                overflowX: "hidden",
                transition: theme.transitions.create("width", {
                  easing: theme.transitions.easing.sharp,
                  duration: theme.transitions.duration.leavingScreen,
                }),
                // width: theme.spacing(7),
                width: 0,
                [theme.breakpoints.up("sm")]: {
                  width: theme.spacing(7),
                },
                [theme.breakpoints.up("md")]: {
                  width: theme.spacing(8),
                },
              }
            : undefined;
          return {
            position: "relative",
            whiteSpace: "nowrap",
            width: NAV_DRAWER_WIDTH_PX,
            transition: theme.transitions.create("width", {
              easing: theme.transitions.easing.sharp,
              duration: theme.transitions.duration.enteringScreen,
            }),
            ...closedStyles,
          };
        },
      }}
    >
      <Box
        sx={theme => {
          const smRule = theme.breakpoints.up("sm");
          return {
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
            padding: theme.spacing(0, 1),
            minHeight: theme.mixins.toolbar.minHeight,
            [smRule]: theme.mixins.toolbar[smRule],
          };
        }}
      >
        <Tooltip title={"Collapse navigation drawer"}>
          <IconButton onClick={props.onMenuClose}>
            <ChevronLeftIcon />
          </IconButton>
        </Tooltip>
      </Box>
      <NavigationMenuLinks />
    </Drawer>
  );
};
