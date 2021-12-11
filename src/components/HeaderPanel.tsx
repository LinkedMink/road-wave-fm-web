import { Tooltip } from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import IconButton from '@material-ui/core/IconButton';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import {
  StyledComponentProps,
  StyleRulesCallback,
  Theme,
  withStyles,
} from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import Brightness4Icon from '@material-ui/icons/Brightness4';
import Brightness7Icon from '@material-ui/icons/Brightness7';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import GitHubIcon from '@material-ui/icons/GitHub';
import MenuIcon from '@material-ui/icons/Menu';
import SettingsOutlinedIcon from '@material-ui/icons/SettingsOutlined';
import clsx from 'clsx';
import React, { MouseEvent, MouseEventHandler } from 'react';
import { getLinkReference } from '../shared/Element';

type StyleClass =
  | 'toolbar'
  | 'appBar'
  | 'appBarShift'
  | 'menuButton'
  | 'menuButtonHidden'
  | 'title'
  | 'menuIcon';

const styles: StyleRulesCallback<Theme, HeaderPanelOwnProps, StyleClass> = (theme: Theme) => ({
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  appBar: {
    backgroundColor: theme.palette.type === 'dark' ? theme.palette.primary.dark : undefined,
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: 240,
    width: `calc(100% - 240px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: 'none',
  },
  title: {
    flexGrow: 1,
  },
  menuIcon: {
    minWidth: 20 + theme.spacing(2),
  },
});

export interface HeaderPanelOwnProps {
  isLoggedIn: boolean;
  isOpen: boolean;
  onMenuOpen: MouseEventHandler<HTMLButtonElement>;
  isDarkMode: boolean;
  onDarkModeToggle: MouseEventHandler<HTMLButtonElement>;
}

type HeaderPanelProps = HeaderPanelOwnProps & StyledComponentProps<StyleClass>;

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
            <ListItemIcon className={this.props.classes?.menuIcon}>
              <SettingsOutlinedIcon fontSize="small" />
            </ListItemIcon>
            <Typography variant="inherit">Settings</Typography>
          </MenuItem>
          <MenuItem component={getLinkReference('/logout')}>
            <ListItemIcon className={this.props.classes?.menuIcon}>
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
      className={clsx(
        this.props.classes?.appBar,
        this.props.isOpen && this.props.classes?.appBarShift,
      )}
    >
      <Toolbar className={this.props.classes?.toolbar}>
        <Tooltip title="Expand/collapse shelf">
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={this.props.onMenuOpen}
            className={clsx(
              this.props.classes?.menuButton,
              this.props.isOpen && this.props.classes?.menuButtonHidden,
            )}
          >
            <MenuIcon />
          </IconButton>
        </Tooltip>

        <Typography variant="h6" color="inherit" className={this.props.classes?.title}>
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
            color="inherit"
            href="https://github.com/LinkedMink/road-wave-fm-web"
          >
            <GitHubIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Toggle light/dark mode">
          <IconButton
            aria-label="Toggle light/dark mode"
            color="inherit"
            onClick={this.props.onDarkModeToggle}
          >
            {this.props.isDarkMode ? <Brightness7Icon /> : <Brightness4Icon />}
          </IconButton>
        </Tooltip>
      </Toolbar>
    </AppBar>
  );
}

export default withStyles(styles)(HeaderPanel);
