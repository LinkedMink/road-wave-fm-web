import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import {
  Box,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Tooltip,
} from '@mui/material';
import React, { JSXElementConstructor, MouseEventHandler } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { getLinkReference } from '../shared/Element';

export interface NavigationMenuLink {
  path?: string;
  name?: string;
  active?: boolean;
  tooltip?: string;
  icon?: JSXElementConstructor<unknown>;
}

export interface NavigationMenuStateProps {
  links: NavigationMenuLink[];
}

export interface NavigationMenuOwnProps extends RouteComponentProps {
  isOpen: boolean;
  onMenuClose: MouseEventHandler<HTMLButtonElement>;
}

type NavigationMenuProps = NavigationMenuStateProps & NavigationMenuOwnProps;

class NavigationMenu extends React.Component<NavigationMenuProps> {
  getLinkItem = (link: NavigationMenuLink, index: number) => {
    if (!link.path) {
      return <Divider key={index} />;
    }

    const listItem = (
      <ListItem button key={index} component={getLinkReference(link.path)} selected={link.active}>
        <ListItemIcon>{link.icon && <link.icon />}</ListItemIcon>
        <ListItemText primary={link.name} />
      </ListItem>
    );

    if (link.tooltip) {
      return (
        <Tooltip key={index} title={link.tooltip} placement="right">
          {listItem}
        </Tooltip>
      );
    } else {
      return listItem;
    }
  };

  render = () => {
    return (
      <Drawer
        variant="permanent"
        open={this.props.isOpen}
        PaperProps={{
          sx: (theme) => {
            const closedStyles = !this.props.isOpen
              ? {
                  overflowX: 'hidden',
                  transition: theme.transitions.create('width', {
                    easing: theme.transitions.easing.sharp,
                    duration: theme.transitions.duration.leavingScreen,
                  }),
                  // width: theme.spacing(7),
                  width: 0,
                  [theme.breakpoints.up('sm')]: {
                    width: theme.spacing(7),
                  },
                  [theme.breakpoints.up('md')]: {
                    width: theme.spacing(8),
                  },
                }
              : undefined;
            return {
              position: 'relative',
              whiteSpace: 'nowrap',
              width: 240,
              transition: theme.transitions.create('width', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen,
              }),
              ...closedStyles,
            };
          },
        }}
      >
        <Box
          sx={(theme) => {
            const smRule = theme.breakpoints.up('sm');
            return {
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
              padding: '0 8px',
              minHeight: theme.mixins.toolbar.minHeight,
              [smRule]: theme.mixins.toolbar[smRule],
            };
          }}
        >
          <IconButton onClick={this.props.onMenuClose}>
            <ChevronLeftIcon />
          </IconButton>
        </Box>
        <Divider />
        <List>{this.props.links.map(this.getLinkItem)}</List>
      </Drawer>
    );
  };
}

export default NavigationMenu;
