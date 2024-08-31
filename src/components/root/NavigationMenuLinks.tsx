import DashboardIcon from "@mui/icons-material/Dashboard";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";
import {
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Tooltip,
} from "@mui/material";
import { Fragment, FunctionComponent, useContext } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { SessionContext } from "../shared/SessionProvider";

export const NavigationMenuLinks: FunctionComponent = () => {
  const location = useLocation();
  const [session] = useContext(SessionContext);

  return (
    <Fragment>
      {session.jwtToken && (
        <List>
          <Tooltip title="Find radio stations by geographic location">
            <ListItem disablePadding>
              <ListItemButton
                component={NavLink}
                to="/"
                selected={location.pathname.toLowerCase() === "/"}
              >
                <ListItemIcon>
                  <DashboardIcon />
                </ListItemIcon>
                <ListItemText primary="Dashboard" />
              </ListItemButton>
            </ListItem>
          </Tooltip>
        </List>
      )}
      <Divider />
      <List>
        <Tooltip title="Find out more about this app">
          <ListItem disablePadding>
            <ListItemButton
              component={NavLink}
              to="/about"
              selected={location.pathname.toLowerCase() === "/about"}
            >
              <ListItemIcon>
                <InfoOutlinedIcon />
              </ListItemIcon>
              <ListItemText primary="About" />
            </ListItemButton>
          </ListItem>
        </Tooltip>
        {!session.jwtToken && (
          <Tooltip title="Login to your account">
            <ListItem disablePadding>
              <ListItemButton
                component={NavLink}
                to="/login"
                selected={location.pathname.toLowerCase() === "/login"}
              >
                <ListItemIcon>
                  <LoginIcon />
                </ListItemIcon>
                <ListItemText primary="Login" />
              </ListItemButton>
            </ListItem>
          </Tooltip>
        )}
        {session.jwtToken && (
          <Tooltip title="Logout of your account">
            <ListItem disablePadding>
              <ListItemButton
                component={NavLink}
                to="/logout"
                selected={location.pathname.toLowerCase() === "/logout"}
              >
                <ListItemIcon>
                  <LogoutIcon />
                </ListItemIcon>
                <ListItemText primary="Logout" />
              </ListItemButton>
            </ListItem>
          </Tooltip>
        )}
      </List>
    </Fragment>
  );
};
