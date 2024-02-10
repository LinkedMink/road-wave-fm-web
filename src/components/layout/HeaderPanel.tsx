import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import GitHubIcon from "@mui/icons-material/GitHub";
import MenuIcon from "@mui/icons-material/Menu";
import { AppBar, IconButton, Toolbar, Tooltip, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { FunctionComponent, MouseEventHandler } from "react";
import { AccountIconButton } from "./AccountIconButton";
import { NAV_DRAWER_WIDTH_PX } from "./layoutConstants";

export interface HeaderPanelProps {
  isOpen: boolean;
  onMenuOpen: MouseEventHandler<HTMLButtonElement>;
  onDarkModeToggle: MouseEventHandler<HTMLButtonElement>;
}

export const HeaderPanel: FunctionComponent<HeaderPanelProps> = props => {
  const theme = useTheme();

  return (
    <AppBar
      position="fixed"
      sx={theme => ({
        // backgroundColor: theme.palette.mode === 'dark' ? theme.palette.primary.dark : undefined,
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(["width", "margin"], {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
        ...(props.isOpen
          ? {
              marginLeft: NAV_DRAWER_WIDTH_PX,
              width: `calc(100% - ${NAV_DRAWER_WIDTH_PX}px)`,
              transition: theme.transitions.create(["width", "margin"], {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen,
              }),
            }
          : undefined),
      })}
    >
      <Toolbar>
        <Tooltip title="Expand navigation drawer">
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
        <AccountIconButton />
      </Toolbar>
    </AppBar>
  );
};
