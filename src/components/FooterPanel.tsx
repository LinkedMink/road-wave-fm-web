import Box from '@material-ui/core/Box';
import Link from '@material-ui/core/Link';
import {
  StyledComponentProps,
  StyleRulesCallback,
  Theme,
  withStyles,
} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import clsx from 'clsx';
import React from 'react';
import { getLinkReference } from '../shared/Element';

type StyleClass = 'footerBox' | 'footerText' | 'footerLink';

const styles: StyleRulesCallback<Theme, Record<string, never>, StyleClass> = (theme: Theme) => ({
  footerBox: {
    marginLeft: theme.spacing(4),
    display: 'flex',
    flexDirection: 'column',
    padding: theme.spacing(2, 0),
    [theme.breakpoints.up('sm')]: {
      flexDirection: 'row',
    },
  },
  footerText: {
    padding: theme.spacing(0, 2),
    borderLeft: `1px solid ${theme.palette.divider}`,
    borderRight: `1px solid ${theme.palette.divider}`,
    [theme.breakpoints.up('md')]: {
      padding: theme.spacing(0, 4),
    },
    '&:last-child': {
      borderRight: 'none',
    },
  },
  footerLink: {
    '&:hover, &:focus': {
      backgroundColor: theme.palette.action.hover,
    },
  },
});

type FooterPanelProps = StyledComponentProps<StyleClass>;

class FooterPanel extends React.Component<FooterPanelProps> {
  render() {
    return (
      <Box pt={4} className={this.props.classes?.footerBox}>
        <Typography
          variant="body1"
          color="textSecondary"
          className={clsx(this.props.classes?.footerText, this.props.classes?.footerLink)}
        >
          <Link component={getLinkReference('/document/privacy_policy')}>Privacy Policy</Link>
        </Typography>
        <Typography
          variant="body1"
          color="textSecondary"
          className={clsx(this.props.classes?.footerText, this.props.classes?.footerLink)}
        >
          <Link component={getLinkReference('/document/LICENSE')}>License</Link>
        </Typography>
        <Typography
          variant="body1"
          color="textSecondary"
          className={this.props.classes?.footerText}
        >
          {'Copyright © '}
          {new Date().getFullYear()}
          {' Harlan Sang.'}
        </Typography>
      </Box>
    );
  }
}

export default withStyles(styles)(FooterPanel);
