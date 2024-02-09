import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import { useTheme } from "@mui/material/styles";
// import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import GitHubIcon from "@mui/icons-material/GitHub";
import MenuIcon from "@mui/icons-material/Menu";
import { AppBar, IconButton, Toolbar, Tooltip, Typography } from "@mui/material";
import React, { FunctionComponent, MouseEventHandler } from "react";
// import { Link } from 'react-router-dom';

export interface HeaderPanelProps {
  isOpen: boolean;
  onMenuOpen: MouseEventHandler<HTMLButtonElement>;
  onDarkModeToggle: MouseEventHandler<HTMLButtonElement>;
}

export const HeaderPanel: FunctionComponent<HeaderPanelProps> = props => {
  const theme = useTheme();

  return (
    <AppBar
      position="absolute"
      sx={theme => ({
        // backgroundColor: theme.palette.mode === 'dark' ? theme.palette.primary.dark : undefined,
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(["width", "margin"], {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
        ...(props.isOpen
          ? {
              marginLeft: 240,
              width: `calc(100% - 240px)`,
              transition: theme.transitions.create(["width", "margin"], {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen,
              }),
            }
          : undefined),
      })}
    >
      <Toolbar>
        <Tooltip title="Expand/collapse shelf">
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={props.onMenuOpen}
            sx={theme => ({
              color: theme.palette.common.white,
              marginRight: theme.spacing(2),
              ...(props.isOpen
                ? {
                    visibility: "hidden",
                    marginRight: "0",
                    width: "0",
                  }
                : undefined),
            })}
          >
            <MenuIcon />
          </IconButton>
        </Tooltip>

        <Typography
          variant="h6"
          color="inherit"
          sx={{
            flexGrow: 1,
          }}
        >
          Road Wave FM
        </Typography>
        <Tooltip title="GitHub Repository">
          <IconButton
            aria-label="GitHub Repository"
            href="https://github.com/LinkedMink/road-wave-fm-web"
            sx={theme => ({
              color: theme.palette.common.white,
            })}
          >
            <GitHubIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Toggle light/dark mode">
          <IconButton
            aria-label="Toggle light/dark mode"
            onClick={props.onDarkModeToggle}
            sx={theme => ({
              color: theme.palette.common.white,
            })}
          >
            {theme.palette.mode === "dark" ? <Brightness7Icon /> : <Brightness4Icon />}
          </IconButton>
        </Tooltip>
        {/* TODO
      props.isLoggedIn && (
        <Tooltip title="Logout of your session">
          <Link to="/logout">
            <IconButton
              aria-label="Logout of your session"
              sx={(theme) => ({
                color: theme.palette.common.white,
              })}
            >
              <ExitToAppIcon />
            </IconButton>
          </Link>
        </Tooltip>
            )*/}
      </Toolbar>
    </AppBar>
  );
};
