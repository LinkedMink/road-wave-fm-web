import React from 'react';
import {
  StyledComponentProps,
  StyleRulesCallback,
  Theme,
  withStyles,
} from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';

type StyleClass = 'footerBox' | 'footerText';

const styles: StyleRulesCallback<Theme, Record<string, never>, StyleClass> = (theme: Theme) => ({
  footerBox: {
    marginLeft: theme.spacing(4),
    display: 'flex',
    flexDirection: 'row',
    padding: 0,
  },
  footerText: {
    padding: theme.spacing(0, 4),
    borderLeft: `1px solid ${theme.palette.divider}`,
    borderRight: `1px solid ${theme.palette.divider}`,
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
          className={this.props.classes?.footerText}
        >
          {'Copyright © '}
          <Link color="inherit" href="#">
            Harlan Sang
          </Link>{' '}
          {new Date().getFullYear()}
          {'.'}
        </Typography>
        <Typography
          variant="body1"
          color="textSecondary"
          className={this.props.classes?.footerText}
        >
          <Link href="docs/privacy_policy.md">Privacy Policy</Link>
        </Typography>
      </Box>
    );
  }
}

export default withStyles(styles)(FooterPanel);
