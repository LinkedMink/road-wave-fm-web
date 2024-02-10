import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";
import {
  Box,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Tooltip,
} from "@mui/material";
import { ComponentType, FunctionComponent, MouseEventHandler, useContext, useMemo } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { SessionContext } from "../../providers/SessionProvider";
import { NAV_DRAWER_WIDTH_PX } from "./layoutConstants";

interface NavigationMenuLink {
  path: string;
  name: string;
  isActive: boolean;
  icon: ComponentType;
  tooltip?: string;
}

const getGuestLinks = (): NavigationMenuLink[] => {
  return [
    //{},
    {
      path: "/about",
      name: "About",
      isActive: false,
      icon: InfoOutlinedIcon,
      tooltip: "Find out more about this app",
    },
    {
      path: "/login",
      name: "Login",
      isActive: false,
      icon: LoginIcon,
      tooltip: "Login to your account",
    },
  ];
};

const getAuthenticatedLinks = (): NavigationMenuLink[] => {
  return [
    {
      path: "/about",
      name: "About",
      isActive: false,
      icon: InfoOutlinedIcon,
      tooltip: "Find out more about this app",
    },
    {
      path: "/logout",
      name: "Logout",
      isActive: false,
      icon: LogoutIcon,
      tooltip: "Logout of your account",
    },
  ];
};

export interface NavigationMenuProps {
  isOpen: boolean;
  onMenuClose: MouseEventHandler<HTMLButtonElement>;
}

export const NavigationMenu: FunctionComponent<NavigationMenuProps> = props => {
  const location = useLocation();
  const [session] = useContext(SessionContext);

  const links = useMemo(() => {
    const linksBySession = session.jwtToken ? getAuthenticatedLinks() : getGuestLinks();

    /**
     * @todo Use router provided state to set `selected`
     * @see https://reactrouter.com/en/main/start/overview#active-links
     */
    const activeLink = linksBySession.find(l => l.path && location.pathname.startsWith(l.path));
    if (activeLink) {
      activeLink.isActive = true;
    }

    return linksBySession;
  }, [location, session]);

  const getLinkItem = (link: NavigationMenuLink, index: number) => {
    const listItem = (
      <ListItem
        key={index}
        disablePadding
      >
        <ListItemButton
          component={NavLink}
          to={link.path}
          selected={link.isActive}
        >
          <ListItemIcon>{link.icon && <link.icon />}</ListItemIcon>
          <ListItemText primary={link.name} />
        </ListItemButton>
      </ListItem>
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
            padding: "0 8px",
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
      <Divider />
      <List>{links.map(getLinkItem)}</List>
    </Drawer>
  );
};

export default NavigationMenu;
