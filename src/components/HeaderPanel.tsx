import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import GitHubIcon from '@mui/icons-material/GitHub';
import MenuIcon from '@mui/icons-material/Menu';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import {
  AppBar,
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
  Toolbar,
  Tooltip,
  Typography,
} from '@mui/material';
import React, { MouseEvent, MouseEventHandler } from 'react';
import { Link } from 'react-router-dom';
import { getLinkReference } from '../shared/Element';

export interface HeaderPanelOwnProps {
  isLoggedIn: boolean;
  isOpen: boolean;
  onMenuOpen: MouseEventHandler<HTMLButtonElement>;
  isDarkMode: boolean;
  onDarkModeToggle: MouseEventHandler<HTMLButtonElement>;
}

type HeaderPanelProps = HeaderPanelOwnProps;

type HeaderPanelState = {
  menuAnchor: HTMLElement | null;
};

class HeaderPanel extends React.Component<HeaderPanelProps, HeaderPanelState> {
  constructor(props: HeaderPanelProps) {
    super(props);

    this.state = {
      menuAnchor: null,
    };
  }

  handleMenuClick = (event: MouseEvent<HTMLButtonElement>) => {
    this.setState({ menuAnchor: event.currentTarget });
  };

  handleMenuClose = () => {
    this.setState({ menuAnchor: null });
  };

  renderAccount = () => {
    if (this.props.isLoggedIn) {
      return (
        <IconButton
          aria-label="account"
          aria-controls="account-menu"
          aria-haspopup="true"
          color="inherit"
          onClick={this.handleMenuClick}
        >
          <AccountCircleIcon />
        </IconButton>
      );
    } else {
      return (
        <IconButton
          aria-label="account"
          aria-controls="account-menu"
          aria-haspopup="true"
          color="inherit"
          component={getLinkReference('/login')}
        >
          <AccountCircleIcon />
        </IconButton>
      );
    }
  };

  renderMenu = () => {
    if (this.props.isLoggedIn) {
      return (
        <Menu
          id="account-menu"
          keepMounted
          anchorEl={this.state.menuAnchor}
          open={Boolean(this.state.menuAnchor)}
          onClose={this.handleMenuClose}
        >
          <MenuItem component={getLinkReference('/account')}>
            <ListItemIcon
              sx={(theme) => ({
                minWidth: 20 + theme.spacing(2),
              })}
            >
              <SettingsOutlinedIcon fontSize="small" />
            </ListItemIcon>
            <Typography variant="inherit">Settings</Typography>
          </MenuItem>
          <MenuItem component={getLinkReference('/logout')}>
            <ListItemIcon
              sx={(theme) => ({
                minWidth: 20 + theme.spacing(2),
              })}
            >
              <ExitToAppIcon fontSize="small" />
            </ListItemIcon>
            <Typography variant="inherit">Logout</Typography>
          </MenuItem>
        </Menu>
      );
    }
  };

  render = () => (
    <AppBar
      position="absolute"
      sx={(theme) => ({
        backgroundColor: theme.palette.mode === 'dark' ? theme.palette.primary.dark : undefined,
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(['width', 'margin'], {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
        ...(this.props.isOpen
          ? {
              marginLeft: 240,
              width: `calc(100% - 240px)`,
              transition: theme.transitions.create(['width', 'margin'], {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen,
              }),
            }
          : undefined),
      })}
    >
      <Toolbar
        sx={{
          paddingRight: 24, // keep right padding when drawer closed
        }}
      >
        <Tooltip title="Expand/collapse shelf">
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={this.props.onMenuOpen}
            sx={(theme) => ({
              color: theme.palette.common.white,
              marginRight: theme.spacing(2),
              ...(this.props.isOpen
                ? {
                    visibility: 'hidden',
                    marginRight: '0',
                    width: '0',
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
        {
          // this.renderAccount()}
        }
        {
          //this.renderMenu()}
        }
        <Tooltip title="GitHub Repository">
          <IconButton
            aria-label="GitHub Repository"
            href="https://github.com/LinkedMink/road-wave-fm-web"
            sx={(theme) => ({
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
            sx={(theme) => ({
              color: theme.palette.common.white,
            })}
          >
            {this.props.isDarkMode ? <Brightness7Icon /> : <Brightness4Icon />}
          </IconButton>
        </Tooltip>
        {this.props.isLoggedIn && (
          <Tooltip title="Close the current session">
            <Link to="/logout">
              <IconButton
                aria-label="Close the current session"
                sx={(theme) => ({
                  color: theme.palette.common.white,
                })}
              >
                <ExitToAppIcon />
              </IconButton>
            </Link>
          </Tooltip>
        )}
      </Toolbar>
    </AppBar>
  );
}

export default HeaderPanel;
