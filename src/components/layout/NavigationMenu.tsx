// import LockOpenIcon from '@mui/icons-material/LockOpen';
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
// import PersonAddOutlinedIcon from '@mui/icons-material/PersonAddOutlined';
// import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
// import SettingsIcon from '@mui/icons-material/Settings';
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import {
  Box,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Tooltip,
} from "@mui/material";
import { ComponentType, FunctionComponent, MouseEventHandler } from "react";
import { NavLink, useLocation } from "react-router-dom";

interface NavigationMenuLink {
  path?: string;
  name?: string;
  active?: boolean;
  tooltip?: string;
  icon?: ComponentType;
}

const GUEST_LINKS: NavigationMenuLink[] = [
  {
    path: "/about",
    name: "About",
    icon: InfoOutlinedIcon,
    active: false,
    tooltip: "Find out more about this app",
  },
];

// const getAuthenticatedLinks = () => {
//   return [
//     {
//       path: "/home",
//       name: "Home",
//       icon: HomeOutlinedIcon,
//       active: false,
//       tooltip: "Discover the dangers of traveling by auto",
//     },
//     {},
//     {
//       path: "/about",
//       name: "About",
//       icon: InfoOutlinedIcon,
//       active: false,
//       tooltip: "Find out more about this app",
//     },
//   ] as NavigationMenuLink[];
// };

export interface NavigationMenuProps {
  isOpen: boolean;
  onMenuClose: MouseEventHandler<HTMLButtonElement>;
}

export const NavigationMenu: FunctionComponent<NavigationMenuProps> = props => {
  const location = useLocation();

  const links = GUEST_LINKS;

  links.forEach(link => {
    if (link.path && location.pathname.startsWith(link.path)) {
      link.active = true;
    } else {
      link.active = false;
    }
  });

  const getLinkItem = (link: NavigationMenuLink, index: number) => {
    if (!link.path) {
      return <Divider key={index} />;
    }

    const listItem = (
      <ListItemButton
        key={index}
        component={NavLink}
        to={link.path}
        selected={link.active}
      >
        <ListItemIcon>{link.icon && <link.icon />}</ListItemIcon>
        <ListItemText primary={link.name} />
      </ListItemButton>
    );

    if (link.tooltip) {
      return (
        <Tooltip
          key={index}
          title={link.tooltip}
          placement="right"
        >
          {listItem}
        </Tooltip>
      );
    } else {
      return listItem;
    }
  };

  return (
    <Drawer
      variant="permanent"
      open={props.isOpen}
      PaperProps={{
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
            width: 240,
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
            padding: "0 8px",
            minHeight: theme.mixins.toolbar.minHeight,
            [smRule]: theme.mixins.toolbar[smRule],
          };
        }}
      >
        <IconButton onClick={props.onMenuClose}>
          <ChevronLeftIcon />
        </IconButton>
      </Box>
      <Divider />
      <List>{links.map(getLinkItem)}</List>
    </Drawer>
  );
};

export default NavigationMenu;
