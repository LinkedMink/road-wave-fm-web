import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
// import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import GitHubIcon from "@mui/icons-material/GitHub";
import MenuIcon from "@mui/icons-material/Menu";
import { AppBar, IconButton, Toolbar, Tooltip, Typography } from "@mui/material";
import React, { MouseEventHandler } from "react";
// import { Link } from 'react-router-dom';

export interface HeaderPanelOwnProps {
  isLoggedIn: boolean;
  isOpen: boolean;
  onMenuOpen: MouseEventHandler<HTMLButtonElement>;
  isDarkMode: boolean;
  onDarkModeToggle: MouseEventHandler<HTMLButtonElement>;
}

type HeaderPanelProps = HeaderPanelOwnProps;

class HeaderPanel extends React.Component<HeaderPanelProps> {
  constructor(props: HeaderPanelProps) {
    super(props);
  }

  render = () => (
    <AppBar
      position="absolute"
      sx={theme => ({
        // backgroundColor: theme.palette.mode === 'dark' ? theme.palette.primary.dark : undefined,
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(["width", "margin"], {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
        ...(this.props.isOpen
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
            onClick={this.props.onMenuOpen}
            sx={theme => ({
              color: theme.palette.common.white,
              marginRight: theme.spacing(2),
              ...(this.props.isOpen
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
            onClick={this.props.onDarkModeToggle}
            sx={theme => ({
              color: theme.palette.common.white,
            })}
          >
            {this.props.isDarkMode ? <Brightness7Icon /> : <Brightness4Icon />}
          </IconButton>
        </Tooltip>
        {/* TODO
        this.props.isLoggedIn && (
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
}

export default HeaderPanel;
